'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authApi.login(form);
      if (res.data.success && res.data.data) {
        setAuth(res.data.data.user, res.data.data.accessToken);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(message ?? '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-700">영어강사 JYP</Link>
          <p className="text-gray-500 mt-2">로그인하여 학습을 계속하세요</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              required autoFocus placeholder="example@email.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              name="password" type="password" value={form.password} onChange={handleChange}
              required placeholder="비밀번호"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-60"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <p className="text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <Link href="/register" className="text-blue-700 font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
