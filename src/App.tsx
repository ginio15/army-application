import React, { useState, useEffect } from 'react';
import { DatabaseService } from './services/DatabaseService';
import { TranslationService } from './services/TranslationService';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import OfficeSelection from './components/OfficeSelection';
import TotalRegistrations from './components/TotalRegistrations';
import ConfirmationScreen from './components/ConfirmationScreen';
import { RegistrationCategory, FormData, Office } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'offices' | 'totals' | 'confirmation'>('home');
  const [selectedCategory, setSelectedCategory] = useState<RegistrationCategory | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedOffices, setSelectedOffices] = useState<Office[]>([]);
  const [protocolNumber, setProtocolNumber] = useState<string>('');
  const [draftNumber, setDraftNumber] = useState<string>('');
  const [language, setLanguage] = useState<'el' | 'en'>('el');
  const [isLoading, setIsLoading] = useState(true);

  const t = TranslationService.getInstance();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await DatabaseService.getInstance().initialize();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  const handleCategorySelect = (category: RegistrationCategory) => {
    setSelectedCategory(category);
    setCurrentView('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentView('offices');
  };

  const handleOfficesSubmit = async (offices: Office[]) => {
    if (!selectedCategory || !formData) return;

    try {
      setIsLoading(true);
      const dbService = DatabaseService.getInstance();
      
      const result = await dbService.createRegistration({
        category: selectedCategory,
        data: formData,
        offices
      });

      setProtocolNumber(result.protocolNumber);
      setDraftNumber(result.draftNumber || '');
      setSelectedOffices(offices);
      setCurrentView('confirmation');
    } catch (error) {
      console.error('Failed to save registration:', error);
      alert(t.translate('error.saveRegistration'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setFormData(null);
    setSelectedOffices([]);
    setProtocolNumber('');
    setDraftNumber('');
  };

  const handleViewTotals = () => {
    setCurrentView('totals');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'el' ? 'en' : 'el';
    setLanguage(newLanguage);
    t.setLanguage(newLanguage);
  };

  if (isLoading && currentView === 'home') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{t.translate('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-800 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {t.translate('app.title')}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
            >
              {language === 'el' ? 'EN' : 'ΕΛ'}
            </button>
            {currentView !== 'home' && (
              <button
                onClick={handleBackToHome}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md text-sm font-medium transition-colors"
              >
                {t.translate('common.backToHome')}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {currentView === 'home' && (
          <HomePage 
            onCategorySelect={handleCategorySelect}
            onViewTotals={handleViewTotals}
          />
        )}

        {currentView === 'form' && selectedCategory && (
          <RegistrationForm
            category={selectedCategory}
            onSubmit={handleFormSubmit}
            onCancel={handleBackToHome}
          />
        )}

        {currentView === 'offices' && (
          <OfficeSelection
            onSubmit={handleOfficesSubmit}
            onCancel={() => setCurrentView('form')}
            isLoading={isLoading}
          />
        )}

        {currentView === 'confirmation' && (
          <ConfirmationScreen
            category={selectedCategory!}
            formData={formData!}
            offices={selectedOffices}
            protocolNumber={protocolNumber}
            draftNumber={draftNumber}
            onNewRegistration={handleBackToHome}
          />
        )}

        {currentView === 'totals' && (
          <TotalRegistrations onBack={handleBackToHome} />
        )}
      </main>
    </div>
  );
}

export default App;