'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, isLoggedIn, clearAuth } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      router.push('/');
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          영어강사 JYP
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-blue-700 transition-colors">강사소개</Link>
          <Link href="/posts" className="hover:text-blue-700 transition-colors">공지사항</Link>
          <Link href="/inquiry" className="hover:text-blue-700 transition-colors">수강문의</Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="hover:text-blue-700 transition-colors">대시보드</Link>
              {user?.role === 'Tutor' && (
                <Link href="/admin" className="hover:text-blue-700 transition-colors">관리자</Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600">{user?.name}님</span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
