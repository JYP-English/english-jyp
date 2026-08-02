import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '카르마 영어' };

const ACADEMY_SECTIONS = [
  { slug: 'admission', label: '입학 안내', icon: '🚪', desc: '수업 시간, 반 편성, 수강료 등 입학 관련 안내입니다.' },
  { slug: 'graduates', label: '졸업생 후기', icon: '🎓', desc: '카르마 영어를 거쳐 간 학생들의 생생한 후기입니다.' },
  { slug: 'top-students', label: '우수 학생', icon: '🏆', desc: '우수한 성과를 낸 학생들을 소개합니다.' },
  { slug: 'board', label: '학원 게시판', icon: '📌', desc: '학원 공지사항 및 자유 게시판입니다.' },
];

export default function AcademyPage() {
  return (
    <PageShell>
      <div className="mb-10">
        <p className="text-purple-600 font-medium text-sm mb-1">카르마 영어</p>
        <h1 className="text-4xl font-bold mb-3">카르마 영어</h1>
        <p className="text-gray-500">입학 안내부터 졸업생 후기까지, 카르마 영어의 모든 정보를 확인하세요.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {ACADEMY_SECTIONS.map((sec) => (
          <Link
            key={sec.slug}
            href={`/academy/${sec.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <span className="text-4xl">{sec.icon}</span>
            <h2 className="text-lg font-bold mt-4 mb-2 group-hover:text-purple-700">{sec.label}</h2>
            <p className="text-sm text-gray-400">{sec.desc}</p>
            <p className="text-purple-600 text-sm font-medium mt-4 group-hover:underline">바로가기 →</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
