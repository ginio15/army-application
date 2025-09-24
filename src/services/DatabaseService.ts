import { Registration, RegistrationCategory, FormData, Office, RegistrationFilters, RegistrationResult } from '../types';

interface CreateRegistrationRequest {
  category: RegistrationCategory;
  data: FormData;
  offices: Office[];
}

export class DatabaseService {
  private static instance: DatabaseService;
  private db: IDBDatabase | null = null;
  private readonly dbName = 'RegistryApp';
  private readonly version = 1;

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.seedTestData().then(() => resolve());
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Registrations store
        if (!db.objectStoreNames.contains('registrations')) {
          const registrationsStore = db.createObjectStore('registrations', { keyPath: 'id' });
          registrationsStore.createIndex('category', 'category', { unique: false });
          registrationsStore.createIndex('protocolNumber', 'protocolNumber', { unique: false });
          registrationsStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Counters store for protocol and draft numbers
        if (!db.objectStoreNames.contains('counters')) {
          const countersStore = db.createObjectStore('counters', { keyPath: 'id' });
        }
      };
    });
  }

  private async seedTestData(): Promise<void> {
    try {
      const existingRegistrations = await this.getRegistrations({ page: 1 });
      if (existingRegistrations.length > 0) return; // Already seeded

      const categories: RegistrationCategory[] = [
        'common-incoming', 'common-outgoing', 'signals-incoming', 
        'signals-outgoing', 'confidential-incoming', 'confidential-outgoing'
      ];

      const offices: Office[] = [
        '1ο ΓΡΑΦΕΙΟ', '2ο ΓΡΑΦΕΙΟ', '3ο ΓΡΑΦΕΙΟ', '4ο ΓΡΑΦΕΙΟ',
        'ΓΔΥ', 'ΓΡΑΦΕΙΟ ΔΟΣΟΛΗΨΕΩΝ', 'ΣΥΝΔΕΣΜΟΣ ΤΘ', 'ΤΜΗΜΑ ΠΟΛΙΤΙΚΟΥ ΠΡΟΣ.'
      ];

      const sampleIssuers = [
        'ΥΠΟΥΡΓΕΙΟ ΕΘΝΙΚΗΣ ΑΜΥΝΑΣ', 'ΓΕΝΙΚΟ ΕΠΙΤΕΛΕΙΟ ΣΤΡΑΤΟΥ', 
        'ΔΙΟΙΚΗΣΗ ΜΕΤΑΦΟΡΩΝ', 'ΣΤΡΑΤΙΩΤΙΚΗ ΣΧΟΛΗ', 'ΚΕΝΤΡΟ ΕΚΠΑΙΔΕΥΣΗΣ'
      ];

      const sampleSubjects = [
        'Διαταγή μετάθεσης', 'Αίτημα υλικού', 'Αναφορά προόδου', 
        'Εκπαιδευτικό πρόγραμμα', 'Επιθεώρηση μονάδας'
      ];

      // Generate ~500 test entries
      for (let i = 0; i < 500; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const randomDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        
        const formData: FormData = {
          issuer: sampleIssuers[Math.floor(Math.random() * sampleIssuers.length)],
          refNumber: `${Math.floor(Math.random() * 9999) + 1000}`,
          docDate: randomDate.toISOString().split('T')[0],
          subject: sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)],
          entryDate: randomDate.toISOString().split('T')[0]
        };

        if (category.includes('outgoing')) {
          formData.recipient = `ΠΑΡΑΛΗΠΤΗΣ ${Math.floor(Math.random() * 100) + 1}`;
        }

        if (category.includes('signals')) {
          formData.sic = `SIC${Math.floor(Math.random() * 1000) + 100}`;
        }

        const selectedOffices = offices
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1);

        await this.createRegistration({
          category,
          data: formData,
          offices: selectedOffices
        });
      }
    } catch (error) {
      console.warn('Failed to seed test data:', error);
    }
  }

  private async getNextProtocolNumber(category: RegistrationCategory): Promise<string> {
    const currentYear = new Date().getFullYear();
    let counterKey: string;
    let startNumber: number;

    if (category.includes('signals')) {
      counterKey = `signals-protocol-${currentYear}`;
      startNumber = 1;
    } else {
      counterKey = `common-confidential-protocol-${currentYear}`;
      startNumber = 40001;
    }

    const transaction = this.db!.transaction(['counters'], 'readwrite');
    const store = transaction.objectStore('counters');
    
    const counter = await new Promise<any>((resolve) => {
      const request = store.get(counterKey);
      request.onsuccess = () => resolve(request.result);
    });

    const nextNumber = counter ? counter.value + 1 : startNumber;
    
    await new Promise<void>((resolve, reject) => {
      const updateRequest = store.put({ id: counterKey, value: nextNumber });
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    });

    return nextNumber.toString();
  }

  private async getNextDraftNumber(): Promise<string> {
    const counterKey = 'draft-number';
    const transaction = this.db!.transaction(['counters'], 'readwrite');
    const store = transaction.objectStore('counters');
    
    const counter = await new Promise<any>((resolve) => {
      const request = store.get(counterKey);
      request.onsuccess = () => resolve(request.result);
    });

    const nextNumber = counter ? counter.value + 1 : 1;
    
    await new Promise<void>((resolve, reject) => {
      const updateRequest = store.put({ id: counterKey, value: nextNumber });
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    });

    return nextNumber.toString();
  }

  async createRegistration(request: CreateRegistrationRequest): Promise<RegistrationResult> {
    const protocolNumber = await this.getNextProtocolNumber(request.category);
    const draftNumber = request.category.includes('outgoing') 
      ? await this.getNextDraftNumber() 
      : undefined;

    const registration: Registration = {
      id: crypto.randomUUID(),
      category: request.category,
      protocolNumber,
      draftNumber,
      data: request.data,
      offices: request.offices,
      createdAt: new Date().toISOString(),
      createdBy: this.getCurrentUser(),
      isDeleted: false
    };

    const transaction = this.db!.transaction(['registrations'], 'readwrite');
    const store = transaction.objectStore('registrations');
    
    await new Promise<void>((resolve, reject) => {
      const request = store.add(registration);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    return {
      id: registration.id,
      protocolNumber,
      draftNumber
    };
  }

  async getRegistrations(filters: RegistrationFilters = {}): Promise<Registration[]> {
    const transaction = this.db!.transaction(['registrations'], 'readonly');
    const store = transaction.objectStore('registrations');
    const pageSize = 100;
    const page = filters.page || 1;
    const offset = (page - 1) * pageSize;

    const registrations = await new Promise<Registration[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    let filtered = registrations;

    // Apply filters
    if (filters.month) {
      filtered = filtered.filter(reg => reg.createdAt.startsWith(filters.month!));
    }

    if (filters.category) {
      filtered = filtered.filter(reg => reg.category === filters.category);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    return filtered.slice(offset, offset + pageSize);
  }

  async softDeleteRegistration(id: string): Promise<void> {
    const transaction = this.db!.transaction(['registrations'], 'readwrite');
    const store = transaction.objectStore('registrations');
    
    const registration = await new Promise<Registration>((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    registration.isDeleted = true;
    registration.deletedAt = new Date().toISOString();

    await new Promise<void>((resolve, reject) => {
      const request = store.put(registration);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private getCurrentUser(): string {
    // In a real Windows application, this would get the Windows username
    return 'system_user';
  }
}