import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '졸업생 후기 | 카르마 학원' };

export default function GraduatesPage() {
  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/academy" className="hover:text-gray-700">카르마 학원</Link>
        {' / '}
        <span className="text-gray-700 font-medium">졸업생 후기</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">졸업생 후기</h1>
      <p className="text-gray-500 mb-10">카르마 학원을 거쳐 간 학생들의 이야기입니다.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">🎓</p>
        <p className="font-medium">졸업생 후기가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
