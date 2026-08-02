'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/stores/adminAuthStore';

const QUICK_LINKS = [
  { label: '문의 관리', href: '/admin/inquiries', icon: '📬', desc: '학생·학부모 문의 확인 및 상태 관리' },
];

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(password);
    if (!ok) setError('비밀번호가 올바르지 않습니다.');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-bold mb-1">관리자 로그인</h1>
        <p className="text-gray-400 text-sm mb-8">카르마 영어 관리자 전용 페이지입니다.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="관리자 비밀번호"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthed } = useAdminAuth();

  if (!isAuthed) return <LoginForm />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-gray-400 text-sm mt-1">관리할 메뉴를 선택하세요.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-gray-400 hover:shadow-sm cursor-pointer"
          >
            <span className="text-3xl">{item.icon}</span>
            <div className="flex items-center gap-2 mt-3 mb-1">
              <h2 className="font-bold">{item.label}</h2>
            </div>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
