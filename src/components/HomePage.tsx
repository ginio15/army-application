import React from 'react';
import { TranslationService } from '../services/TranslationService';
import { RegistrationCategory } from '../types';

interface HomePageProps {
  onCategorySelect: (category: RegistrationCategory) => void;
  onViewTotals: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCategorySelect, onViewTotals }) => {
  const t = TranslationService.getInstance();

  const categories: { key: RegistrationCategory; greek: string; english: string }[] = [
    { key: 'common-incoming', greek: 'ΚΟΙΝΑ ΕΙΣΕΡΧΟΜΕΝΑ', english: 'Common Incoming' },
    { key: 'common-outgoing', greek: 'ΚΟΙΝΑ ΕΞΕΡΧΟΜΕΝΑ', english: 'Common Outgoing' },
    { key: 'signals-incoming', greek: 'ΣΗΜΑΤΑ ΕΙΣΕΡΧΟΜΕΝΑ', english: 'Signals Incoming' },
    { key: 'signals-outgoing', greek: 'ΣΗΜΑΤΑ ΕΞΕΡΧΟΜΕΝΑ', english: 'Signals Outgoing' },
    { key: 'confidential-incoming', greek: 'ΑΠΟΡΡΗΤΑ ΕΙΣΕΡΧΟΜΕΝΑ', english: 'Confidential Incoming' },
    { key: 'confidential-outgoing', greek: 'ΑΠΟΡΡΗΤΑ ΕΞΕΡΧΟΜΕΝΑ', english: 'Confidential Outgoing' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          {t.getLanguage() === 'el' ? 'Σύστημα Πρωτοκόλλου' : 'Registry System'}
        </h2>
        <p className="text-slate-600">
          {t.getLanguage() === 'el' 
            ? 'Επιλέξτε τον τύπο εγγραφής που θέλετε να δημιουργήσετε'
            : 'Select the type of registration you want to create'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategorySelect(category.key)}
            className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 
                     rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-all duration-200
                     transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <div className="text-lg font-bold text-slate-800 mb-2">
              {category.greek}
            </div>
            <div className="text-sm text-slate-600">
              {category.english}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onViewTotals}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-8 
                   rounded-lg shadow-md hover:shadow-lg transition-all duration-200
                   transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          <div className="text-lg">ΣΥΝΟΛΟ ΕΓΓΡΑΦΩΝ</div>
          <div className="text-sm opacity-90">VIEW TOTALS</div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;