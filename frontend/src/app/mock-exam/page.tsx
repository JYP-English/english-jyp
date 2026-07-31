import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

const SUB = [
  { href: '/mock-exam/archive',    icon: '📁', title: '자료실',        desc: '학년별 · 연도별 · 교육청 모의고사 모음' },
  { href: '/mock-exam/top-wrong',  icon: '🔴', title: '오답률 TOP 3',  desc: '학년별 · 연도별 가장 많이 틀리는 문제' },
  { href: '/mock-exam/categories', icon: '🗂️', title: '분야별',        desc: '경제 · 사회 · 역사 · 심리학 · 예술 · 언어 · 기술' },
  { href: '/mock-exam/finder',     icon: '🤖', title: 'AI 시험 찾기',  desc: '특정 문장으로 몇 년도 몇 월 시험인지 AI가 찾아드려요' },
];

export default function MockExamPage() {
  return (
    <PageShell>
      <div className="mb-10">
        <p className="text-blue-600 font-medium text-sm mb-1">모의고사</p>
        <h1 className="text-4xl font-bold mb-3">모의고사 학습 자료</h1>
        <p className="text-gray-500">수능 · 교육청 모의고사 자료를 체계적으로 정리했습니다.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {SUB.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <span className="text-4xl">{item.icon}</span>
            <h2 className="text-xl font-bold mt-4 mb-2 group-hover:text-blue-700">{item.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            <p className="text-blue-600 text-sm font-medium mt-4 group-hover:underline">바로가기 →</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
