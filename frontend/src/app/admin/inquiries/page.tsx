'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/stores/adminAuthStore';
import { inquiryAdminApi, type Inquiry } from '@/lib/adminApi';

const STATUS_LABELS: Record<number, { label: string; color: string }> = {
  0: { label: '미확인', color: 'bg-red-100 text-red-600' },
  1: { label: '확인완료', color: 'bg-blue-100 text-blue-600' },
  2: { label: '처리완료', color: 'bg-green-100 text-green-600' },
};

export default function InquiriesPage() {
  const { isAuthed } = useAdminAuth();
  const router = useRouter();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthed) router.replace('/admin');
  }, [isAuthed, router]);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await inquiryAdminApi.list();
      setInquiries(res.items);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '불러오기 실패');
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  async function handleStatusChange(id: string, status: number) {
    try {
      const updated = await inquiryAdminApi.updateStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: updated.status } : i)));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '상태 변경 실패');
    }
  }

  const unreadCount = inquiries.filter((i) => i.status === 0).length;

  if (!isAuthed) return null;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-700">← 대시보드</Link>
          <h1 className="text-2xl font-bold mt-1">문의 관리</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            총 {inquiries.length}건
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                미확인 {unreadCount}건
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          새로고침
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400">불러오는 중...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl text-gray-400">
          <p className="text-3xl mb-2">📬</p>
          <p>접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => {
            const st = STATUS_LABELS[inq.status] ?? STATUS_LABELS[0];
            const isOpen = expanded === inq.id;
            const date = new Date(inq.createdAt).toLocaleString('ko-KR', {
              month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit',
            });

            return (
              <div
                key={inq.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                  inq.status === 0 ? 'border-red-200' : 'border-gray-200'
                }`}
              >
                {/* 헤더 행 */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(isOpen ? null : inq.id)}
                >
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.color}`}>
                    {st.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">
                      {inq.name}
                      <span className="text-gray-400 font-normal ml-2">{inq.phone}</span>
                      {inq.school && <span className="text-gray-400 font-normal ml-2">{inq.school} {inq.grade ? `${inq.grade}학년` : ''}</span>}
                    </p>
                    <p className="text-sm text-gray-400 truncate mt-0.5">{inq.message}</p>
                  </div>
                  <span className="text-xs text-gray-300 shrink-0">{date}</span>
                  <span className="text-gray-300 text-sm">{isOpen ? '▲' : '▼'}</span>
                </div>

                {/* 펼침 내용 */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {inq.message}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <span className="text-xs text-gray-400 self-center mr-auto">상태 변경:</span>
                      {[0, 1, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(inq.id, s)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            inq.status === s
                              ? `${STATUS_LABELS[s].color} border-transparent font-semibold`
                              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {STATUS_LABELS[s].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
