import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';
import { getPastExamItems } from '@/lib/notion';

export const revalidate = 3600;

interface Props { params: Promise<{ school: string }> }

export async function generateStaticParams() {
  return SCHOOLS.map((s) => ({ school: s.slug }));
}

export default async function PastExamsPage({ params }: Props) {
  const { school } = await params;
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  const items = await getPastExamItems(school);

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
      <p className="text-gray-500 mb-10">기출문제 이미지와 강사 해설을 확인하세요.</p>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📄</p>
          <p className="font-medium">기출문제 자료가 준비 중입니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/school-support/${school}/past-exams/${item.id}`}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-6 py-4 hover:border-emerald-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {item.year > 0 && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {item.year}년
                    </span>
                  )}
                  {item.semester && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                      {item.semester}
                    </span>
                  )}
                  {item.grade && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      {item.grade}
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-800 group-hover:text-emerald-700">
                  {item.title}
                </span>
              </div>
              <span className="text-gray-300 group-hover:text-emerald-500 transition">→</span>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
