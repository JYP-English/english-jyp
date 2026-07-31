'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  {
    label: '모의고사',
    href: '/mock-exam',
    children: [
      { label: '자료실',          href: '/mock-exam/archive' },
      { label: '오답률 TOP 3',    href: '/mock-exam/top-wrong' },
      { label: '분야별',          href: '/mock-exam/categories' },
      { label: 'AI 시험 찾기',    href: '/mock-exam/finder' },
    ],
  },
  {
    label: '내신지원',
    href: '/school-support',
    children: [
      { label: '센텀중학교',        href: '/school-support/centum-middle' },
      { label: '센텀고등학교',      href: '/school-support/centum-high' },
      { label: '남일고등학교',      href: '/school-support/namil-high' },
      { label: '충렬고등학교',      href: '/school-support/chungyeol-high' },
      { label: '해운대고등학교',    href: '/school-support/haeundae-high' },
      { label: '센텀여자고등학교',  href: '/school-support/centum-girls-high' },
      { label: '해강고등학교',      href: '/school-support/haegang-high' },
    ],
  },
  {
    label: '카르마 학원',
    href: '/academy',
    children: [
      { label: '입학안내',    href: '/academy/admission' },
      { label: '졸업생',      href: '/academy/graduates' },
      { label: '성적우수',    href: '/academy/top-students' },
      { label: '자유게시판',  href: '/academy/board' },
      { label: '네이버블로그', href: 'https://blog.naver.com', external: true },
    ],
  },
  {
    label: '커리큘럼',
    href: '/curriculum',
    children: [
      { label: '서술형/영문법 원서 200문장', href: '/curriculum/sentence-200' },
      { label: '영어 뉴스로 끝내는 문법/어휘', href: '/curriculum/news-grammar' },
    ],
  },
  {
    label: 'Games',
    href: '/games',
    children: [
      { label: '단어인증소',   href: '/games/vocabulary-check' },
      { label: '무한의단어',   href: '/games/infinite-words' },
      { label: 'sameSAME',   href: '/games/same-same' },
      { label: '빈칸LOL',     href: '/games/blank-lol' },
      { label: '어순버블팝',  href: '/games/word-order-pop' },
      { label: '주어찾기',    href: '/games/find-subject' },
      { label: '동사찾기',    href: '/games/find-verb' },
      { label: '전치사찾기',  href: '/games/find-preposition' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-700 shrink-0">
          카르마 영어
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {item.children.map((child) =>
                  'external' in child && child.external ? (
                    <a
                      key={child.href}
                      href={child.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {child.label} ↗
                    </a>
                  ) : (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm hover:bg-blue-50 ${
                        pathname === child.href ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'
                      }`}
                    >
                      {child.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </nav>

        {/* Admin Link */}
        <div className="hidden lg:block">
          <Link
            href="/admin"
            className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1 border border-gray-200 rounded-lg"
          >
            관리자
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          {NAV.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => setMobileOpen(mobileOpen === item.href ? null : item.href)}
                className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {item.label}
                <span className="text-gray-400">{mobileOpen === item.href ? '▲' : '▼'}</span>
              </button>
              {mobileOpen === item.href && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {item.children.map((child) =>
                    'external' in child && child.external ? (
                      <a
                        key={child.href}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block pl-8 pr-4 py-2.5 text-sm text-gray-600"
                        onClick={() => setOpen(false)}
                      >
                        {child.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-blue-700"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="border-t px-4 py-3">
            <Link href="/admin" className="text-sm text-gray-400" onClick={() => setOpen(false)}>
              관리자 로그인
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
