import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';

interface Props { params: Promise<{ school: string }> }

export default async function TrendPage({ params }: Props) {
  const { school: raw } = await params;
  const school = decodeURIComponent(raw);
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <span className="text-gray-700 font-medium">기출 경향</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{found.name} — 기출 경향</h1>
      <p className="text-gray-500 mb-10">최신 출제 경향을 분석한 자료입니다.</p>
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
        <p className="text-4xl mb-3">📊</p>
        <p className="font-medium">기출 경향 자료가 준비 중입니다.</p>
      </div>
    </PageShell>
  );
}
