import React, { useState, useEffect } from 'react';
import { DatabaseService } from '../services/DatabaseService';
import { TranslationService } from '../services/TranslationService';
import { Registration, RegistrationCategory, RegistrationFilters } from '../types';
import { Trash2, Search, Filter } from 'lucide-react';

interface TotalRegistrationsProps {
  onBack: () => void;
}

const TotalRegistrations: React.FC<TotalRegistrationsProps> = ({ onBack }) => {
  const t = TranslationService.getInstance();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RegistrationFilters>({ page: 1 });
  const [showFilters, setShowFilters] = useState(false);

  const categories: RegistrationCategory[] = [
    'common-incoming', 'common-outgoing', 'signals-incoming', 
    'signals-outgoing', 'confidential-incoming', 'confidential-outgoing'
  ];

  useEffect(() => {
    loadRegistrations();
  }, [filters]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const dbService = DatabaseService.getInstance();
      const data = await dbService.getRegistrations(filters);
      setRegistrations(data);
    } catch (error) {
      console.error('Failed to load registrations:', error);
      alert(t.translate('error.loadRegistrations'));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof RegistrationFilters, value: any) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset page when other filters change
    }));
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm(t.getLanguage() === 'el' ? 'Είστε σίγουροι;' : 'Are you sure?')) {
      return;
    }

    try {
      const dbService = DatabaseService.getInstance();
      await dbService.softDeleteRegistration(id);
      loadRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete registration:', error);
      alert(t.getLanguage() === 'el' ? 'Σφάλμα διαγραφής' : 'Delete error');
    }
  };

  const clearFilters = () => {
    setFilters({ page: 1 });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('el-GR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          {t.translate('totals.title')}
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Filter className="h-4 w-4" />
          {t.translate('totals.filter')}
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.translate('totals.month')}
              </label>
              <input
                type="month"
                value={filters.month || ''}
                onChange={(e) => handleFilterChange('month', e.target.value || undefined)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.translate('totals.category')}
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t.translate('totals.category.all')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {t.getCategoryName(cat)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors"
              >
                {t.translate('totals.clear')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">{t.translate('common.loading')}</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t.translate('totals.noResults')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.category')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.protocol')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.draft')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.entryDate')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.offices')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('totals.columns.status')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.translate('common.delete')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {registrations.map((registration) => (
                  <tr key={registration.id} className={registration.isDeleted ? 'opacity-50' : ''}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                      {t.getCategoryName(registration.category)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {registration.protocolNumber}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                      {registration.draftNumber || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">
                      {formatDate(registration.data.entryDate)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-900">
                      <div className="flex flex-wrap gap-1">
                        {registration.offices.slice(0, 2).map((office) => (
                          <span
                            key={office}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {office}
                          </span>
                        ))}
                        {registration.offices.length > 2 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                            +{registration.offices.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        registration.isDeleted 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {registration.isDeleted 
                          ? t.translate('totals.status.deleted')
                          : t.translate('totals.status.active')
                        }
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {!registration.isDeleted && (
                        <button
                          onClick={() => handleDeleteRegistration(registration.id)}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                          title={t.translate('common.delete')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          {t.translate('totals.pagination.page')} {filters.page || 1}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('page', Math.max(1, (filters.page || 1) - 1))}
            disabled={!filters.page || filters.page <= 1}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300"
          >
            &#8592;
          </button>
          <button
            onClick={() => handleFilterChange('page', (filters.page || 1) + 1)}
            disabled={registrations.length < 100}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalRegistrations;