import Link from 'next/link';
import Header from '@/components/layout/Header';
import InquiryForm from '@/components/InquiryForm';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-24">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <p className="text-blue-200 font-medium mb-3">중고등학생 영어 전문</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                영어강사 JYP와<br />함께 성적을 올려요
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-md">
                내신부터 수능까지, 학생 개개인의 성향에 맞는 1:1 맞춤 지도로
                여러분의 영어 실력을 책임집니다.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/inquiry"
                  className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  수강 문의하기
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  강사 소개 보기
                </Link>
              </div>
            </div>

            {/* Profile placeholder */}
            <div className="w-64 h-64 rounded-full bg-blue-600 flex items-center justify-center text-white text-6xl font-bold shrink-0">
              JYP
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: '수강 학생', value: '200+명' },
              { label: '강의 경력', value: '5년+' },
              { label: '1등급 배출', value: '30+명' },
              { label: '평균 성적 향상', value: '2등급↑' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">이런 점이 다릅니다</h2>
            <p className="text-gray-500 text-center mb-12">학생을 중심으로 설계된 학습 시스템</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: '1:1 맞춤 지도',
                  desc: '학생의 현재 수준과 목표 대학에 맞춰 개인화된 커리큘럼을 설계합니다.',
                },
                {
                  icon: '📊',
                  title: '성적 진도 추적',
                  desc: '모의고사·내신 성적을 체계적으로 기록하고 성장 그래프를 확인합니다.',
                },
                {
                  icon: '🤖',
                  title: 'AI 지문 분석',
                  desc: 'AI가 영어 지문을 분석하고 맞춤 시험지를 자동 생성합니다.',
                },
                {
                  icon: '💬',
                  title: '1:1 Q&A',
                  desc: '언제든지 질문을 올리면 강사가 직접 답변해 드립니다.',
                },
                {
                  icon: '📚',
                  title: '자료실 제공',
                  desc: '수업 자료, 모의고사 파일을 언제든지 다운로드할 수 있습니다.',
                },
                {
                  icon: '📝',
                  title: '과제 피드백',
                  desc: '제출한 과제에 강사가 직접 채점하고 상세한 피드백을 남깁니다.',
                },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="text-lg font-semibold mt-3 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">수강 문의</h2>
            <p className="text-gray-500 text-center mb-10">궁금한 점은 편하게 남겨주세요. 빠르게 연락드립니다.</p>
            <InquiryForm />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <p className="mb-1 font-semibold text-white">영어강사 JYP</p>
        <p>부산광역시 · 중고등학생 영어 전문</p>
        <p className="mt-4 text-xs">© 2026 JYP English. All rights reserved.</p>
      </footer>
    </>
  );
}
