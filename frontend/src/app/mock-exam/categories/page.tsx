import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '분야별 모의고사' };

const CATEGORIES = [
  { icon: '💰', name: '경제' },
  { icon: '🏛️', name: '사회' },
  { icon: '📜', name: '역사' },
  { icon: '🧠', name: '심리학' },
  { icon: '🎨', name: '예술' },
  { icon: '🔤', name: '언어학' },
  { icon: '⚙️', name: '기술' },
  { icon: '🌿', name: '환경' },
  { icon: '🔬', name: '과학' },
  { icon: '⚕️', name: '의학' },
  { icon: '🏃', name: '스포츠' },
  { icon: '🍎', name: '교육' },
];

export default function CategoriesPage() {
  return (
    <PageShell>
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3">
          <span>모의고사</span> / <span className="text-gray-700 font-medium">분야별</span>
        </nav>
        <h1 className="text-3xl font-bold mb-2">분야별 지문</h1>
        <p className="text-gray-500">경제, 사회, 역사, 심리학 등 주제별로 지문을 분류했습니다.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <span className="text-4xl">{cat.icon}</span>
            <p className="font-semibold mt-3 group-hover:text-blue-700">{cat.name}</p>
            <p className="text-xs text-gray-400 mt-1">0개의 지문</p>
          </button>
        ))}
      </div>
    </PageShell>
  );
}
