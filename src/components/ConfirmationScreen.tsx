import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TranslationService } from '../services/TranslationService';
import { RegistrationCategory, FormData, Office } from '../types';

interface ConfirmationScreenProps {
  category: RegistrationCategory;
  formData: FormData;
  offices: Office[];
  protocolNumber: string;
  draftNumber: string;
  onNewRegistration: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  category,
  formData,
  offices,
  protocolNumber,
  draftNumber,
  onNewRegistration
}) => {
  const t = TranslationService.getInstance();

  const getFieldLabel = (field: string): string => {
    if (category.includes('signals')) {
      switch (field) {
        case 'issuer': return t.translate('form.signalIssuer');
        case 'docDate': return t.translate('form.signalDate');
        case 'subject': return t.translate('form.signalSubject');
        default: return t.translate(`form.${field}` as any);
      }
    } else if (category.includes('confidential')) {
      if (field === 'issuer') return t.translate('form.confidentialIssuer');
      return t.translate(`form.${field}` as any);
    } else {
      return t.translate(`form.${field}` as any);
    }
  };

  const renderField = (field: keyof FormData, value: string) => {
    if (!value) return null;
    
    return (
      <div key={field} className="flex justify-between py-2 border-b border-slate-100">
        <span className="font-medium text-slate-600">{getFieldLabel(field)}:</span>
        <span className="text-slate-800">{value}</span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {t.translate('confirmation.title')}
          </h2>
          <p className="text-green-600 font-medium">
            {t.translate('confirmation.savedSuccessfully')}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{protocolNumber}</div>
              <div className="text-sm text-blue-800">{t.translate('confirmation.protocolNumber')}</div>
            </div>
            {draftNumber && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{draftNumber}</div>
                <div className="text-sm text-blue-800">{t.translate('confirmation.draftNumber')}</div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-slate-800 mb-4">
            {t.getCategoryName(category)}
          </h3>
          <div className="space-y-1">
            {renderField('issuer', formData.issuer)}
            {renderField('refNumber', formData.refNumber)}
            {formData.sic && renderField('sic', formData.sic)}
            {renderField('docDate', formData.docDate)}
            {renderField('subject', formData.subject)}
            {renderField('entryDate', formData.entryDate)}
            {formData.recipient && renderField('recipient', formData.recipient)}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-slate-800 mb-3">
            {t.getLanguage() === 'el' ? 'Επιλεγμένα Γραφεία' : 'Selected Offices'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {offices.map((office) => (
              <span
                key={office}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {office}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNewRegistration}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t.translate('confirmation.newRegistration')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;