import Link from 'next/link';
import Header from '@/components/layout/Header';
import InquiryForm from '@/components/InquiryForm';
import { GAMES } from '@/lib/constants';

const SECTIONS = [
  {
    href: '/mock-exam',
    icon: '📝',
    title: '모의고사',
    color: 'from-emerald-700 to-emerald-900',
    items: ['자료실 (학년별 · 연도별)', '오답률 TOP 3', '분야별 지문', 'AI 시험 찾기'],
  },
  {
    href: '/school-support',
    icon: '🏫',
    title: '내신지원',
    color: 'from-emerald-500 to-emerald-700',
    items: ['센텀중 · 센텀고 · 남일고', '충렬고 · 해운대고', '센텀여고 · 해강고', '기출 · 문법 · 워크북'],
  },
  {
    href: '/academy',
    icon: '🎓',
    title: '카르마 영어 학원',
    color: 'from-violet-500 to-violet-700',
    items: ['입학안내', '졸업생 · 성적우수', '자유게시판', '네이버블로그'],
  },
  {
    href: '/curriculum',
    icon: '📚',
    title: '카르마 익스클루시브 커리큘럼',
    color: 'from-orange-500 to-orange-700',
    items: ['원서 문장 200개로 끝내는 서술형/영문법', '영어 뉴스로 끝내는 영문법 / 어휘'],
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-emerald-200 font-medium mb-3 tracking-widest text-sm uppercase">Karma English Academy</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              카르마 영어와 함께<br />영어를 정복하세요
            </h1>
            <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
              중고등학생을 위한 내신·수능 영어 전문 학원.<br />
              모의고사 자료부터 AI 학습 도구, 영어 게임까지 한 곳에서.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/mock-exam" className="px-8 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                모의고사 자료 보기
              </Link>
              <Link href="/school-support" className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                내신 지원 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">주요 서비스</h2>
            <p className="text-gray-500 text-center mb-10">필요한 학습 자료를 바로 찾아보세요</p>
            <div className="grid md:grid-cols-2 gap-6">
              {SECTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${s.color} px-6 py-5 flex items-center gap-4`}>
                    <span className="text-4xl">{s.icon}</span>
                    <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  </div>
                  <ul className="px-6 py-4 space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-emerald-400">•</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-4">
                    <span className="text-sm text-emerald-600 font-medium group-hover:underline">바로가기 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-1">English Games</h2>
                <p className="text-gray-500">게임으로 재미있게 영어 실력을 키워요</p>
              </div>
              <Link href="/games" className="text-emerald-600 font-medium hover:underline text-sm">
                전체 보기 →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GAMES.map((g) => (
                <Link
                  key={g.slug}
                  href={`/games/${g.slug}`}
                  className="bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-2xl p-5 text-center transition-all group"
                >
                  <span className="text-3xl">{g.icon}</span>
                  <p className="font-semibold mt-3 text-sm group-hover:text-emerald-700">{g.name}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">수강 문의</h2>
            <p className="text-gray-500 text-center mb-10">궁금한 점은 편하게 남겨주세요</p>
            <InquiryForm />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <p className="font-bold text-white text-base mb-1">카르마 영어</p>
        <p>부산광역시 해운대구 · 중고등학생 영어 전문</p>
        <p className="mt-4 text-xs">© 2026 Karma English Academy. All rights reserved.</p>
      </footer>
    </>
  );
}
