import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from './auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

let apiClient: AxiosInstance | null = null;

export const getApiClient = (): AxiosInstance => {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add JWT token to requests
    apiClient.interceptors.request.use((config) => {
      const { doctor } = useAuthStore.getState();
      if (doctor?.token) {
        config.headers.Authorization = `Bearer ${doctor.token}`;
      }
      return config;
    });

    // Handle token expiry
    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }
  return apiClient;
};

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    getApiClient().post('/auth/login', { email, password }),
  logout: () => getApiClient().post('/auth/logout'),
};

// Appointment APIs
export const appointmentAPI = {
  getAll: (page = 0, size = 10) =>
    getApiClient().get(`/appointments?page=${page}&size=${size}`),
  getById: (id: string) =>
    getApiClient().get(`/appointments/${id}`),
  create: (data: any) =>
    getApiClient().post(`/appointments`, data),
  updateStatus: (id: string, status: string) =>
    getApiClient().patch(`/appointments/${id}/status`, { status }),
  addNotes: (id: string, notes: string) =>
    getApiClient().patch(`/appointments/${id}/notes`, { notes }),
  recordPayment: (id: string, amount: number, method: string) =>
    getApiClient().post(`/appointments/${id}/payment`, { amount, method }),
};

// Patient APIs
export const patientAPI = {
  getAll: (page = 0, size = 10) =>
    getApiClient().get(`/patients?page=${page}&size=${size}`),
  getById: (id: string) =>
    getApiClient().get(`/patients/${id}`),
  updateDetails: (id: string, data: any) =>
    getApiClient().put(`/patients/${id}`, data),
};

// Blog APIs
export const blogAPI = {
  getAll: (page = 0, size = 10) =>
    getApiClient().get(`/blogs?page=${page}&size=${size}`),
  create: (data: FormData) =>
    getApiClient().post('/blogs', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: FormData) =>
    getApiClient().put(`/blogs/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) =>
    getApiClient().delete(`/blogs/${id}`),
  publish: (id: string) =>
    getApiClient().patch(`/blogs/${id}/publish`),
};

// Disease APIs
export const diseaseAPI = {
  getAll: (page = 0, size = 10) =>
    getApiClient().get(`/diseases?page=${page}&size=${size}`),
  create: (data: FormData) =>
    getApiClient().post('/diseases', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: FormData) =>
    getApiClient().put(`/diseases/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) =>
    getApiClient().delete(`/diseases/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboard: (month?: number, year?: number) =>
    getApiClient().get(`/analytics/dashboard${month ? `?month=${month}&year=${year}` : ''}`),
  getMonthlyRevenue: (year: number) =>
    getApiClient().get(`/analytics/monthly-revenue?year=${year}`),
  getYearlyRevenue: () =>
    getApiClient().get('/analytics/yearly-revenue'),
};

// Reports APIs
export const reportsAPI = {
  exportAppointments: (startDate: string, endDate: string, format: 'pdf' | 'csv') =>
    getApiClient().get(`/reports/appointments?startDate=${startDate}&endDate=${endDate}&format=${format}`, {
      responseType: format === 'pdf' ? 'blob' : 'blob',
    }),
  exportPayments: (month: number, year: number, format: 'pdf' | 'csv') =>
    getApiClient().get(`/reports/payments?month=${month}&year=${year}&format=${format}`, {
      responseType: 'blob',
    }),
};
