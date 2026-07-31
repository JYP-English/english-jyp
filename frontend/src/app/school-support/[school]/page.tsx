import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS, SCHOOL_TABS } from '@/lib/constants';

interface Props { params: Promise<{ school: string }> }

export async function generateStaticParams() {
  return SCHOOLS.map((s) => ({ school: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { school } = await params;
  const found = SCHOOLS.find((s) => s.slug === school);
  return { title: found ? `${found.name} 내신지원` : '내신지원' };
}

export default async function SchoolPage({ params }: Props) {
  const { school } = await params;
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
          {' / '}
          <span className="text-gray-700 font-medium">{found.name}</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">{found.name}</h1>
        <p className="text-gray-500">기출 경향, 문법 포인트, 기출문제, 워크북을 확인하세요.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {SCHOOL_TABS.map((tab) => (
          <Link
            key={tab.slug}
            href={`/school-support/${school}/${tab.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-bold mb-2 group-hover:text-emerald-700">{tab.label}</h2>
            <p className="text-sm text-gray-400">
              {tab.slug === 'trend' && '최신 시험 출제 경향을 분석했습니다.'}
              {tab.slug === 'grammar' && '학기별로 다루는 문법 포인트를 정리했습니다.'}
              {tab.slug === 'past-exams' && '기출문제를 풀어볼 수 있습니다.'}
              {tab.slug === 'workbook' && '워크북 자료를 제공합니다.'}
            </p>
            <p className="text-emerald-600 text-sm font-medium mt-4 group-hover:underline">바로가기 →</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
