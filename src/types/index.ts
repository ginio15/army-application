export type RegistrationCategory = 
  | 'common-incoming'
  | 'common-outgoing'
  | 'signals-incoming'
  | 'signals-outgoing'
  | 'confidential-incoming'
  | 'confidential-outgoing';

export interface FormData {
  issuer: string;
  refNumber: string;
  docDate: string;
  subject: string;
  entryDate: string;
  recipient?: string;
  sic?: string;
}

export type Office = 
  | '1ο ΓΡΑΦΕΙΟ'
  | '2ο ΓΡΑΦΕΙΟ' 
  | '3ο ΓΡΑΦΕΙΟ'
  | '4ο ΓΡΑΦΕΙΟ'
  | 'ΓΔΥ'
  | 'ΓΡΑΦΕΙΟ ΔΟΣΟΛΗΨΕΩΝ'
  | 'ΣΥΝΔΕΣΜΟΣ ΤΘ'
  | 'ΤΜΗΜΑ ΠΟΛΙΤΙΚΟΥ ΠΡΟΣ.';

export interface Registration {
  id: string;
  category: RegistrationCategory;
  protocolNumber: string;
  draftNumber?: string;
  data: FormData;
  offices: Office[];
  createdAt: string;
  createdBy: string;
  isDeleted: boolean;
  deletedAt?: string;
}

export interface RegistrationFilters {
  month?: string; // YYYY-MM format
  category?: RegistrationCategory;
  page?: number;
}

export interface RegistrationResult {
  protocolNumber: string;
  draftNumber?: string;
  id: string;
}