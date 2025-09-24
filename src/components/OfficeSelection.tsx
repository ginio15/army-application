import React, { useState } from 'react';
import { TranslationService } from '../services/TranslationService';
import { Office } from '../types';

interface OfficeSelectionProps {
  onSubmit: (offices: Office[]) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const OfficeSelection: React.FC<OfficeSelectionProps> = ({ onSubmit, onCancel, isLoading }) => {
  const t = TranslationService.getInstance();
  const [selectedOffices, setSelectedOffices] = useState<Office[]>([]);

  const availableOffices: Office[] = [
    '1ο ΓΡΑΦΕΙΟ',
    '2ο ΓΡΑΦΕΙΟ',
    '3ο ΓΡΑΦΕΙΟ',
    '4ο ΓΡΑΦΕΙΟ',
    'ΓΔΥ',
    'ΓΡΑΦΕΙΟ ΔΟΣΟΛΗΨΕΩΝ',
    'ΣΥΝΔΕΣΜΟΣ ΤΘ',
    'ΤΜΗΜΑ ΠΟΛΙΤΙΚΟΥ ΠΡΟΣ.'
  ];

  const handleOfficeToggle = (office: Office) => {
    setSelectedOffices(prev => 
      prev.includes(office) 
        ? prev.filter(o => o !== office)
        : [...prev, office]
    );
  };

  const handleSelectAll = () => {
    setSelectedOffices([...availableOffices]);
  };

  const handleClearAll = () => {
    setSelectedOffices([]);
  };

  const handleSubmit = () => {
    if (selectedOffices.length > 0) {
      onSubmit(selectedOffices);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {t.translate('offices.title')}
          </h2>
          <p className="text-slate-600">
            {t.translate('offices.instruction')}
          </p>
          <div className="h-1 w-20 bg-blue-600 rounded mt-3"></div>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {t.translate('offices.selectAll')}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {t.translate('offices.clearAll')}
          </button>
          <div className="text-sm text-slate-600 flex items-center ml-auto">
            {selectedOffices.length} {t.translate('offices.selected')}
          </div>
        </div>

        <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
          {availableOffices.map((office) => (
            <label
              key={office}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                ${selectedOffices.includes(office)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <input
                type="checkbox"
                checked={selectedOffices.includes(office)}
                onChange={() => handleOfficeToggle(office)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-slate-800 font-medium">{office}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg
                     hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {t.translate('common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedOffices.length === 0 || isLoading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              t.translate('common.save')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeSelection;