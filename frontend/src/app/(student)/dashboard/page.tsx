'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useAuthStore } from '@/stores/authStore';

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  const menuItems = [
    { href: '/questions', icon: '💬', label: 'Q&A 게시판', desc: '질문 등록 및 강사 답변 확인' },
    { href: '/homework', icon: '📝', label: '과제', desc: '과제 확인 및 제출' },
    { href: '/progress', icon: '📊', label: '성적 진도', desc: '모의고사·내신 성적 추적' },
    { href: '/materials', icon: '📚', label: '자료실', desc: '수업 자료 다운로드' },
    { href: '/passages', icon: '📖', label: '지문 분석', desc: 'AI 어법·구조 분석' },
    { href: '/worksheets', icon: '🤖', label: 'AI 시험지', desc: 'AI 생성 맞춤 시험지' },
  ];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">안녕하세요, {user.name}님 👋</h1>
          <p className="text-gray-500">
            {user.school ? `${user.school} ` : ''}
            {user.grade ? `${user.grade}학년` : ''}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <span className="text-3xl">{item.icon}</span>
              <h2 className="text-lg font-semibold mt-3 mb-1 group-hover:text-blue-700">{item.label}</h2>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
