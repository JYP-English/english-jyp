import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';

interface Props { params: Promise<{ school: string }> }

export async function generateStaticParams() {
  return SCHOOLS.map((s) => ({ school: s.slug }));
}

export default async function PastExamsPage({ params }: Props) {
  const { school } = await params;
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <span className="text-gray-700 font-medium">기출문제</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{found.name} — 기출문제</h1>
      <p className="text-gray-500 mb-10">실제 시험 기출문제를 풀어보며 실력을 점검하세요.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">📄</p>
        <p className="font-medium">기출문제 자료가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
