let adminKey = '';

export function setAdminKey(key: string) {
  adminKey = key;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
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

export const inquiryAdminApi = {
  list: () =>
    request<{ items: Inquiry[]; totalCount: number }>('GET', '/api/admin/inquiries'),

  updateStatus: (id: string, status: number) =>
    request<Inquiry>('PATCH', `/api/admin/inquiries/${id}`, { status }),
};

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  school?: string;
  grade?: number | null;
  message: string;
  status: number;
  createdAt: string;
}
