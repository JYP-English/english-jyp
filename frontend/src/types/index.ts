export type UserRole = 'Student' | 'Tutor';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  school?: string;
  grade?: number;
  role: UserRole;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TutorProfile {
  id: number;
  bio?: string;
  career?: string;        // JSON string
  achievements?: string;  // JSON string
  teachingStyle?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  profileImageUrl?: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  authorName: string;
  category: 0 | 1 | 2;   // 0: 공지, 1: 칼럼, 2: 후기
  title: string;
  content: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email?: string;
  school?: string;
  grade?: number;
  message: string;
  status: 0 | 1 | 2;   // 0: 미확인, 1: 확인, 2: 처리완료
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  errors?: string[];
}

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
