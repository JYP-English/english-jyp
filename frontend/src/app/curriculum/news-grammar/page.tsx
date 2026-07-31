import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '뉴스로 배우는 문법 | 커리큘럼' };

export default function NewsGrammarPage() {
  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/curriculum" className="hover:text-gray-700">커리큘럼</Link>
        {' / '}
        <span className="text-gray-700 font-medium">뉴스로 배우는 문법</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">뉴스로 배우는 문법</h1>
      <p className="text-gray-500 mb-10">실제 뉴스 기사를 통해 살아있는 영어 문법을 학습합니다.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">📰</p>
        <p className="font-medium">뉴스 문법 콘텐츠가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
