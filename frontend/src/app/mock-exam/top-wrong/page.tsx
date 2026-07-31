import PageShell from '@/components/layout/PageShell';
import { MOCK_GRADES } from '@/lib/constants';

export const metadata = { title: '오답률 TOP 3' };

export default function TopWrongPage() {
  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <span>모의고사</span> / <span className="text-gray-700 font-medium">오답률 TOP 3</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">오답률 TOP 3</h1>
        <p className="text-gray-500">학년별 · 연도별로 학생들이 가장 많이 틀리는 문제를 분석했습니다.</p>
      </div>

      {/* 학년 탭 */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {MOCK_GRADES.map((g) => (
          <button key={g} className="px-5 py-2 text-sm font-medium border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
            {g}
          </button>
        ))}
      </div>

      {/* 오답률 카드 placeholder */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold mb-4 ${
              rank === 1 ? 'bg-red-500' : rank === 2 ? 'bg-orange-400' : 'bg-yellow-400'
            }`}>
              {rank}
            </div>
            <div className="h-24 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-sm">등록된 데이터 없음</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
