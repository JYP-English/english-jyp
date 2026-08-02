import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '우수 학생 | 카르마 영어' };

export default function TopStudentsPage() {
  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/academy" className="hover:text-gray-700">카르마 영어</Link>
        {' / '}
        <span className="text-gray-700 font-medium">우수 학생</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">우수 학생</h1>
      <p className="text-gray-500 mb-10">카르마 영어에서 뛰어난 성과를 낸 학생들을 소개합니다.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">🏆</p>
        <p className="font-medium">우수 학생 소개가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
