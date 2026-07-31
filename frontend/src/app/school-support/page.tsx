import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';

export const metadata = { title: '내신지원' };

export default function SchoolSupportPage() {
  return (
    <PageShell>
      <div className="mb-10">
        <p className="text-emerald-600 font-medium text-sm mb-1">내신지원</p>
        <h1 className="text-4xl font-bold mb-3">학교별 내신 지원</h1>
        <p className="text-gray-500">기출 경향, 문법 포인트, 기출문제, 워크북을 학교별로 제공합니다.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCHOOLS.map((school) => (
          <Link
            key={school.slug}
            href={`/school-support/${school.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <span className="text-4xl">🏫</span>
            <h2 className="text-lg font-bold mt-4 mb-2 group-hover:text-emerald-700">
              {school.name}
            </h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {['기출 경향', '문법 포인트', '기출문제', '워크북'].map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-emerald-600 text-sm font-medium mt-4 group-hover:underline">바로가기 →</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
