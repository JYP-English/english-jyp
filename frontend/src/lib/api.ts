import axios from 'axios';
import type { ApiResponse, PagedResponse, TokenResponse, User, TutorProfile, Post, Inquiry } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,  // HttpOnly cookie for refresh token
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post<ApiResponse<TokenResponse>>(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        if (res.data.success && res.data.data) {
          setAccessToken(res.data.data.accessToken);
          original.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return api(original);
        }
      } catch {
        setAccessToken(null);
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const authApi = {
  register: (data: { email: string; password: string; name: string; phone?: string; school?: string; grade?: number }) =>
    api.post<ApiResponse<TokenResponse>>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<TokenResponse>>('/auth/login', data),

  logout: () => api.post<ApiResponse<null>>('/auth/logout'),

  getMe: () => api.get<ApiResponse<User>>('/auth/me'),

  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'school' | 'grade'>>) =>
    api.patch<ApiResponse<User>>('/auth/me', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch<ApiResponse<null>>('/auth/me/password', data),
};

// Tutor
export const tutorApi = {
  getProfile: () => api.get<ApiResponse<TutorProfile>>('/tutor/profile'),

  updateProfile: (data: Partial<Omit<TutorProfile, 'id' | 'updatedAt'>>) =>
    api.put<ApiResponse<TutorProfile>>('/tutor/profile', data),
};

// Posts
export const postsApi = {
  getAll: (params?: { category?: number; page?: number; pageSize?: number }) =>
    api.get<ApiResponse<PagedResponse<Post>>>('/posts', { params }),

  getById: (id: number) => api.get<ApiResponse<Post>>(`/posts/${id}`),

  create: (data: { category: number; title: string; content: string; isPinned?: boolean }) =>
    api.post<ApiResponse<Post>>('/posts', data),

  update: (id: number, data: Partial<{ category: number; title: string; content: string; isPinned: boolean }>) =>
    api.put<ApiResponse<Post>>(`/posts/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<null>>(`/posts/${id}`),
};

// Inquiry
export const inquiryApi = {
  submit: (data: { name: string; phone: string; email?: string; school?: string; grade?: number; message: string }) =>
    api.post<ApiResponse<Inquiry>>('/inquiries', data),

  getAll: (params?: { page?: number; pageSize?: number }) =>
    api.get<ApiResponse<PagedResponse<Inquiry>>>('/inquiries', { params }),

  updateStatus: (id: number, status: 0 | 1 | 2) =>
    api.patch<ApiResponse<Inquiry>>(`/inquiries/${id}/status`, { status }),
};

export default api;
