'use client';

import { useState } from 'react';
import { reportsAPI } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportMonth, setReportMonth] = useState(new Date().getMonth() + 1);
  const [reportYear, setReportYear] = useState(new Date().getFullYear());

  const exportAppointments = async (format: 'pdf' | 'csv') => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setExportLoading(true);
    setError('');

    try {
      const response = await reportsAPI.exportAppointments(startDate, endDate, format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `appointments-${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError('Failed to export appointments');
      console.error(err);
    } finally {
      setExportLoading(false);
    }
  };

  const exportPayments = async (format: 'pdf' | 'csv') => {
    setExportLoading(true);
    setError('');

    try {
      const response = await reportsAPI.exportPayments(reportMonth, reportYear, format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payments-${reportYear}-${reportMonth}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError('Failed to export payments');
      console.error(err);
    } finally {
      setExportLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
        <p className="text-muted-foreground mt-1">Generate and export business reports</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appointments Report */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Appointments Report</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Export all appointments within a date range
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => exportAppointments('pdf')}
                disabled={exportLoading || !startDate || !endDate}
                className="flex-1 gap-2"
              >
                <Download size={18} />
                Export as PDF
              </Button>
              <Button
                onClick={() => exportAppointments('csv')}
                disabled={exportLoading || !startDate || !endDate}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Download size={18} />
                Export as CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Payments Report */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Payments Report</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Export monthly payment records
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Month
                </label>
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                >
                  {months.map((month, idx) => (
                    <option key={idx} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Year
                </label>
                <select
                  value={reportYear}
                  onChange={(e) => setReportYear(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => exportPayments('pdf')}
                disabled={exportLoading}
                className="flex-1 gap-2"
              >
                <Download size={18} />
                Export as PDF
              </Button>
              <Button
                onClick={() => exportPayments('csv')}
                disabled={exportLoading}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Download size={18} />
                Export as CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">PDF Reports</h4>
          <p className="text-sm text-blue-800">
            Professional formatted PDF reports with charts and summaries
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 mb-2">CSV Export</h4>
          <p className="text-sm text-green-800">
            Import into Excel or other spreadsheet applications
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-900 mb-2">Data Security</h4>
          <p className="text-sm text-purple-800">
            All exported data is encrypted and securely handled
          </p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Guidelines</h3>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Appointments Report includes all appointment details, patient info, and status</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Payments Report shows monthly revenue, payment methods, and outstanding amounts</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>CSV files can be imported directly into Excel, Google Sheets, or accounting software</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>PDF reports are formatted for printing and professional use</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Reports are generated on-demand and include all available data for selected period</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
