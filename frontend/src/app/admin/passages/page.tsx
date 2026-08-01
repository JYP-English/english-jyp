'use client';

import Link from 'next/link';
import { useAdminAuth } from '@/stores/adminAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PASSAGE_CATEGORIES = [
  { slug: 'economy',     label: '경제',   icon: '💰', value: 10 },
  { slug: 'society',     label: '사회',   icon: '🏛️', value: 11 },
  { slug: 'history',     label: '역사',   icon: '📜', value: 12 },
  { slug: 'psychology',  label: '심리학', icon: '🧠', value: 13 },
  { slug: 'art',         label: '예술',   icon: '🎨', value: 14 },
  { slug: 'linguistics', label: '언어학', icon: '🔤', value: 15 },
  { slug: 'tech',        label: '기술',   icon: '⚙️', value: 16 },
  { slug: 'environment', label: '환경',   icon: '🌿', value: 17 },
  { slug: 'science',     label: '과학',   icon: '🔬', value: 18 },
  { slug: 'medicine',    label: '의학',   icon: '⚕️', value: 19 },
  { slug: 'sports',      label: '스포츠', icon: '🏃', value: 20 },
  { slug: 'education',   label: '교육',   icon: '🍎', value: 21 },
];

export { PASSAGE_CATEGORIES };

export default function PassagesIndexPage() {
  const { isAuthed } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) router.replace('/admin');
  }, [isAuthed, router]);

  if (!isAuthed) return null;

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-700">← 대시보드</Link>
        <h1 className="text-2xl font-bold mt-2">지문 관리</h1>
        <p className="text-gray-400 text-sm mt-1">분야를 선택해서 지문을 추가·수정·삭제하세요.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PASSAGE_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/admin/passages/${cat.slug}`}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <span className="text-4xl">{cat.icon}</span>
            <p className="font-semibold mt-3 group-hover:text-blue-700">{cat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
