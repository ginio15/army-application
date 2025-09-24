import React, { useState, useEffect } from 'react';
import { TranslationService } from '../services/TranslationService';
import { RegistrationCategory, FormData } from '../types';

interface RegistrationFormProps {
  category: RegistrationCategory;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ category, onSubmit, onCancel }) => {
  const t = TranslationService.getInstance();
  const [formData, setFormData] = useState<FormData>({
    issuer: '',
    refNumber: '',
    docDate: '',
    subject: '',
    entryDate: new Date().toISOString().split('T')[0],
    recipient: '',
    sic: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const getRequiredFields = (): string[] => {
    const baseFields = ['issuer', 'refNumber', 'docDate', 'subject', 'entryDate'];
    
    if (category.includes('outgoing')) {
      baseFields.push('recipient');
    }
    
    if (category.includes('signals')) {
      baseFields.push('sic');
    }
    
    return baseFields;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredFields = getRequiredFields();
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof FormData];
      if (!value || value.trim() === '') {
        newErrors[field] = t.translate('common.required');
      } else if (value.length > 255) {
        newErrors[field] = t.translate('common.maxLength');
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderInput = (field: keyof FormData, type: string = 'text') => {
    const isRequired = getRequiredFields().includes(field);
    
    if (!isRequired && 
        ((field === 'recipient' && !category.includes('outgoing')) ||
         (field === 'sic' && !category.includes('signals')))) {
      return null;
    }

    return (
      <div key={field} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {getFieldLabel(field)}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${errors[field] ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
          maxLength={255}
          required={isRequired}
        />
        {errors[field] && (
          <p className="text-red-500 text-sm">{errors[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {t.getCategoryName(category)}
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput('issuer')}
          {renderInput('refNumber')}
          {category.includes('signals') && renderInput('sic')}
          {renderInput('docDate', 'date')}
          {renderInput('subject')}
          {renderInput('entryDate', 'date')}
          {renderInput('recipient')}

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg
                       hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {t.translate('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.translate('common.next')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;