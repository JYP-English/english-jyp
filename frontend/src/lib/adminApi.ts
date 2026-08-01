const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

let adminKey = '';

export function setAdminKey(key: string) {
  adminKey = key;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message ?? '요청 실패');
  }
  return json.data as T;
}

export const passageApi = {
  list: (category: number) =>
    request<{ items: Passage[]; totalCount: number }>('GET', `/api/v1/passages?category=${category}&pageSize=200`),

  create: (data: { category: number; title: string; content: string }) =>
    request<Passage>('POST', '/api/v1/passages', data),

  update: (id: number, data: { title?: string; content?: string }) =>
    request<Passage>('PUT', `/api/v1/passages/${id}`, data),

  delete: (id: number) =>
    request<null>('DELETE', `/api/v1/passages/${id}`),

  reorder: (orders: { id: number; sortOrder: number }[]) =>
    request<null>('PUT', '/api/v1/passages/reorder', orders),
};

export const inquiryAdminApi = {
  list: (page = 1, pageSize = 50) =>
    request<{ items: Inquiry[]; totalCount: number }>('GET', `/api/v1/inquiries?page=${page}&pageSize=${pageSize}`),

  updateStatus: (id: number, status: number) =>
    request<Inquiry>('PATCH', `/api/v1/inquiries/${id}/status`, { status }),
};

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  school?: string;
  grade?: number;
  message: string;
  status: number; // 0=미확인, 1=확인, 2=완료
  createdAt: string;
}

export interface Passage {
  id: number;
  category: number;
  title: string;
  content: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
