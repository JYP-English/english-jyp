import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '필수 문장 200 | 커리큘럼' };

export default function Sentence200Page() {
  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/curriculum" className="hover:text-gray-700">커리큘럼</Link>
        {' / '}
        <span className="text-gray-700 font-medium">필수 문장 200</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">필수 문장 200</h1>
      <p className="text-gray-500 mb-10">내신·모의고사 대비 필수 문장 200개를 반복 훈련합니다.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">✏️</p>
        <p className="font-medium">필수 문장 200 자료가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
