import Link from 'next/link';
import type { TrendItem } from '@/lib/notion';

interface Props {
  items: TrendItem[];
  school: string;
}

const PLACEHOLDER = '최신 시험에서는 독해 지문의 난이도가 상승하는 경향이 있으며, 어휘 문항과 빈칸 추론 유형이 강조되고 있습니다. 특히 서술형 비중이 매 학기 증가하고 있어 꼼꼼한 대비가 필요합니다.';

export default function TrendPreviewCard({ items, school }: Props) {
  const latest = items[0];
  const previewText = latest ? (latest.summary || latest.title) : PLACEHOLDER;

  return (
    <Link
      href={`/school-support/${school}/trend`}
      className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-emerald-300 hover:shadow-md transition-all"
    >
      <h2 className="text-lg font-bold mb-2 group-hover:text-emerald-700">기출 경향</h2>
      <p className="text-sm text-gray-400 mb-4">최신 시험 출제 경향을 분석했습니다.</p>

      <div className="relative rounded-lg bg-gray-50 p-4 overflow-hidden select-none">
        <p className="text-sm text-gray-600 line-clamp-4">{previewText}</p>
        <div className="absolute inset-0 backdrop-blur-[3px] bg-white/20" />
      </div>

      <p className="text-emerald-600 text-sm font-medium mt-4 group-hover:underline">
        자세히 보기 →
      </p>
    </Link>
  );
}
