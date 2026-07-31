import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '커리큘럼' };

const CURRICULUM_SECTIONS = [
  {
    slug: 'sentence-200',
    label: '필수 문장 200',
    icon: '✏️',
    desc: '내신·모의고사 대비 필수 문장 200개를 반복 훈련합니다.',
  },
  {
    slug: 'news-grammar',
    label: '뉴스로 배우는 문법',
    icon: '📰',
    desc: '실제 뉴스 기사를 통해 살아있는 영어 문법을 학습합니다.',
  },
];

export default function CurriculumPage() {
  return (
    <PageShell>
      <div className="mb-10">
        <p className="text-orange-500 font-medium text-sm mb-1">커리큘럼</p>
        <h1 className="text-4xl font-bold mb-3">학습 커리큘럼</h1>
        <p className="text-gray-500">체계적인 커리큘럼으로 영어 실력을 키우세요.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
        {CURRICULUM_SECTIONS.map((sec) => (
          <Link
            key={sec.slug}
            href={`/curriculum/${sec.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <span className="text-4xl">{sec.icon}</span>
            <h2 className="text-lg font-bold mt-4 mb-2 group-hover:text-orange-600">{sec.label}</h2>
            <p className="text-sm text-gray-400">{sec.desc}</p>
            <p className="text-orange-500 text-sm font-medium mt-4 group-hover:underline">바로가기 →</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
