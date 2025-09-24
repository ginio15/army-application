type Language = 'el' | 'en';

type TranslationKey = 
  | 'app.title'
  | 'common.loading'
  | 'common.backToHome'
  | 'common.cancel'
  | 'common.submit'
  | 'common.next'
  | 'common.save'
  | 'common.delete'
  | 'common.confirm'
  | 'common.yes'
  | 'common.no'
  | 'common.required'
  | 'common.maxLength'
  | 'home.commonIncoming'
  | 'home.commonOutgoing'
  | 'home.signalsIncoming'
  | 'home.signalsOutgoing'
  | 'home.confidentialIncoming'
  | 'home.confidentialOutgoing'
  | 'home.viewTotals'
  | 'form.documentIssuer'
  | 'form.confidentialIssuer'
  | 'form.signalIssuer'
  | 'form.refNumber'
  | 'form.docDate'
  | 'form.signalDate'
  | 'form.subject'
  | 'form.signalSubject'
  | 'form.entryDate'
  | 'form.recipient'
  | 'form.sic'
  | 'offices.title'
  | 'offices.instruction'
  | 'offices.selectAll'
  | 'offices.clearAll'
  | 'offices.selected'
  | 'confirmation.title'
  | 'confirmation.protocolNumber'
  | 'confirmation.draftNumber'
  | 'confirmation.savedSuccessfully'
  | 'confirmation.newRegistration'
  | 'totals.title'
  | 'totals.filter'
  | 'totals.month'
  | 'totals.category'
  | 'totals.apply'
  | 'totals.clear'
  | 'totals.category.all'
  | 'totals.noResults'
  | 'totals.columns.category'
  | 'totals.columns.protocol'
  | 'totals.columns.draft'
  | 'totals.columns.entryDate'
  | 'totals.columns.offices'
  | 'totals.columns.status'
  | 'totals.status.active'
  | 'totals.status.deleted'
  | 'totals.pagination.page'
  | 'totals.pagination.of'
  | 'error.saveRegistration'
  | 'error.loadRegistrations';

const translations: Record<Language, Record<TranslationKey, string>> = {
  el: {
    'app.title': 'Σύστημα Πρωτοκόλλου',
    'common.loading': 'Φόρτωση...',
    'common.backToHome': 'Αρχική',
    'common.cancel': 'Ακύρωση',
    'common.submit': 'Υποβολή',
    'common.next': 'Επόμενο',
    'common.save': 'Αποθήκευση',
    'common.delete': 'Διαγραφή',
    'common.confirm': 'Επιβεβαίωση',
    'common.yes': 'Ναι',
    'common.no': 'Όχι',
    'common.required': 'Υποχρεωτικό πεδίο',
    'common.maxLength': 'Μέγιστο 255 χαρακτήρες',
    'home.commonIncoming': 'ΚΟΙΝΑ ΕΙΣΕΡΧΟΜΕΝΑ',
    'home.commonOutgoing': 'ΚΟΙΝΑ ΕΞΕΡΧΟΜΕΝΑ',
    'home.signalsIncoming': 'ΣΗΜΑΤΑ ΕΙΣΕΡΧΟΜΕΝΑ',
    'home.signalsOutgoing': 'ΣΗΜΑΤΑ ΕΞΕΡΧΟΜΕΝΑ',
    'home.confidentialIncoming': 'ΑΠΟΡΡΗΤΑ ΕΙΣΕΡΧΟΜΕΝΑ',
    'home.confidentialOutgoing': 'ΑΠΟΡΡΗΤΑ ΕΞΕΡΧΟΜΕΝΑ',
    'home.viewTotals': 'ΣΥΝΟΛΟ ΕΓΓΡΑΦΩΝ',
    'form.documentIssuer': 'ΕΚΔΟΤΗΣ ΕΓΓΡΑΦΟΥ',
    'form.confidentialIssuer': 'ΕΚΔΟΤΗΣ ΑΠΟΡΡΗΤΟΥ',
    'form.signalIssuer': 'ΕΚΔΟΤΗΣ ΣΗΜΑΤΟΣ',
    'form.refNumber': 'φ',
    'form.docDate': 'ΗΜΕΡ. Φ',
    'form.signalDate': 'ΗΜΕΡ. ΣΗΜΑΤΟΣ',
    'form.subject': 'ΘΕΜΑ Φ',
    'form.signalSubject': 'ΘΕΜΑ ΣΗΜΑΤΟΣ',
    'form.entryDate': 'ΗΜΕΡ. ΕΙΣΟΔΟΥ',
    'form.recipient': 'ΠΑΡΑΛΗΠΤΗΣ',
    'form.sic': 'SIC',
    'offices.title': 'Επιλογή Γραφείων',
    'offices.instruction': 'Επιλέξτε ένα ή περισσότερα γραφεία:',
    'offices.selectAll': 'Επιλογή Όλων',
    'offices.clearAll': 'Καθαρισμός',
    'offices.selected': 'επιλεγμένα',
    'confirmation.title': 'Επιβεβαίωση Εγγραφής',
    'confirmation.protocolNumber': 'ΑΡΙΘΜ. ΠΡΩΤΟΚ',
    'confirmation.draftNumber': 'ΑΡΙΘΜ. ΣΧΕΔΙΟΥ',
    'confirmation.savedSuccessfully': 'Η εγγραφή αποθηκεύτηκε επιτυχώς!',
    'confirmation.newRegistration': 'Νέα Εγγραφή',
    'totals.title': 'Συνολικές Εγγραφές',
    'totals.filter': 'Φίλτρα',
    'totals.month': 'Μήνας (YYYY-MM)',
    'totals.category': 'Κατηγορία',
    'totals.apply': 'Εφαρμογή',
    'totals.clear': 'Καθαρισμός',
    'totals.category.all': 'Όλες οι κατηγορίες',
    'totals.noResults': 'Δεν βρέθηκαν εγγραφές',
    'totals.columns.category': 'Κατηγορία',
    'totals.columns.protocol': 'Αρ. Πρωτοκ.',
    'totals.columns.draft': 'Αρ. Σχεδίου',
    'totals.columns.entryDate': 'Ημερ. Εισόδου',
    'totals.columns.offices': 'Γραφεία',
    'totals.columns.status': 'Κατάσταση',
    'totals.status.active': 'Ενεργό',
    'totals.status.deleted': 'Διαγραμμένο',
    'totals.pagination.page': 'Σελίδα',
    'totals.pagination.of': 'από',
    'error.saveRegistration': 'Σφάλμα κατά την αποθήκευση της εγγραφής',
    'error.loadRegistrations': 'Σφάλμα κατά τη φόρτωση των εγγραφών'
  },
  en: {
    'app.title': 'Registry System',
    'common.loading': 'Loading...',
    'common.backToHome': 'Home',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.next': 'Next',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.required': 'Required field',
    'common.maxLength': 'Maximum 255 characters',
    'home.commonIncoming': 'Common Incoming',
    'home.commonOutgoing': 'Common Outgoing',
    'home.signalsIncoming': 'Signals Incoming',
    'home.signalsOutgoing': 'Signals Outgoing',
    'home.confidentialIncoming': 'Confidential Incoming',
    'home.confidentialOutgoing': 'Confidential Outgoing',
    'home.viewTotals': 'VIEW TOTALS',
    'form.documentIssuer': 'Document Issuer',
    'form.confidentialIssuer': 'Confidential Issuer',
    'form.signalIssuer': 'Signal Issuer',
    'form.refNumber': 'Ref No',
    'form.docDate': 'Doc Date',
    'form.signalDate': 'Signal Date',
    'form.subject': 'Subject',
    'form.signalSubject': 'Signal Subject',
    'form.entryDate': 'Entry Date',
    'form.recipient': 'Recipient',
    'form.sic': 'SIC',
    'offices.title': 'Office Selection',
    'offices.instruction': 'Select one or more offices:',
    'offices.selectAll': 'Select All',
    'offices.clearAll': 'Clear All',
    'offices.selected': 'selected',
    'confirmation.title': 'Registration Confirmation',
    'confirmation.protocolNumber': 'Protocol Number',
    'confirmation.draftNumber': 'Draft Number',
    'confirmation.savedSuccessfully': 'Registration saved successfully!',
    'confirmation.newRegistration': 'New Registration',
    'totals.title': 'Total Registrations',
    'totals.filter': 'Filters',
    'totals.month': 'Month (YYYY-MM)',
    'totals.category': 'Category',
    'totals.apply': 'Apply',
    'totals.clear': 'Clear',
    'totals.category.all': 'All categories',
    'totals.noResults': 'No registrations found',
    'totals.columns.category': 'Category',
    'totals.columns.protocol': 'Protocol No.',
    'totals.columns.draft': 'Draft No.',
    'totals.columns.entryDate': 'Entry Date',
    'totals.columns.offices': 'Offices',
    'totals.columns.status': 'Status',
    'totals.status.active': 'Active',
    'totals.status.deleted': 'Deleted',
    'totals.pagination.page': 'Page',
    'totals.pagination.of': 'of',
    'error.saveRegistration': 'Error saving registration',
    'error.loadRegistrations': 'Error loading registrations'
  }
};

export class TranslationService {
  private static instance: TranslationService;
  private currentLanguage: Language = 'el';

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  public setLanguage(language: Language): void {
    this.currentLanguage = language;
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public translate(key: TranslationKey): string {
    return translations[this.currentLanguage][key] || key;
  }

  public getCategoryName(category: string): string {
    switch (category) {
      case 'common-incoming':
        return this.translate('home.commonIncoming');
      case 'common-outgoing':
        return this.translate('home.commonOutgoing');
      case 'signals-incoming':
        return this.translate('home.signalsIncoming');
      case 'signals-outgoing':
        return this.translate('home.signalsOutgoing');
      case 'confidential-incoming':
        return this.translate('home.confidentialIncoming');
      case 'confidential-outgoing':
        return this.translate('home.confidentialOutgoing');
      default:
        return category;
    }
  }
}