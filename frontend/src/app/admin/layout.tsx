'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/stores/adminAuthStore';

const MENU = [
  { label: '대시보드', href: '/admin', icon: '🏠' },
  { label: '지문 관리', href: '/admin/passages', icon: '📄' },
  { label: '게시물 관리', href: '/admin/posts', icon: '📝', soon: true },
  { label: '문의 관리', href: '/admin/inquiries', icon: '📬', soon: true },
  { label: '졸업생 후기', href: '/admin/graduates', icon: '🎓', soon: true },
  { label: '우수 학생', href: '/admin/top-students', icon: '🏆', soon: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthed, logout } = useAdminAuth();

  if (!isAuthed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-gray-700">
          <p className="text-xs text-gray-400 mb-1">카르마 학원</p>
          <p className="font-bold">관리자 센터</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.soon ? '#' : item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                  ? 'bg-white text-gray-900 font-semibold'
                  : 'text-gray-300 hover:bg-gray-800'
              } ${item.soon ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.soon && <span className="ml-auto text-[10px] bg-gray-700 px-1.5 py-0.5 rounded">준비중</span>}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
