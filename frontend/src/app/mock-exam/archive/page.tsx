import PageShell from '@/components/layout/PageShell';
import { MOCK_GRADES, MOCK_BOARDS } from '@/lib/constants';

export const metadata = { title: '모의고사 자료실' };

export default function MockExamArchivePage() {
  const years = Array.from({ length: 7 }, (_, i) => 2024 - i);

  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <span>모의고사</span> / <span className="text-gray-700 font-medium">자료실</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">모의고사 자료실</h1>
        <p className="text-gray-500">학년별 · 연도별 · 교육청 모의고사를 한곳에서 찾아보세요.</p>
      </div>

      {/* 필터 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 flex flex-wrap gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">학년</p>
          <div className="flex flex-wrap gap-2">
            {MOCK_GRADES.map((g) => (
              <button key={g} className="px-4 py-1.5 text-sm border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">연도</p>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button key={y} className="px-4 py-1.5 text-sm border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
                {y}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">교육청</p>
          <div className="flex flex-wrap gap-2">
            {MOCK_BOARDS.map((b) => (
              <button key={b} className="px-4 py-1.5 text-sm border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 자료 목록 (placeholder) */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 grid grid-cols-5 text-sm font-semibold text-gray-600">
          <span className="col-span-2">시험명</span>
          <span>학년</span>
          <span>연도 / 월</span>
          <span>교육청</span>
        </div>
        <div className="px-6 py-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-medium">자료가 아직 등록되지 않았습니다.</p>
          <p className="text-sm mt-1">관리자가 자료를 업로드하면 여기에 표시됩니다.</p>
        </div>
      </div>
    </PageShell>
  );
}
