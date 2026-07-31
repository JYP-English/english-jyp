import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';

export const metadata = { title: '입학 안내 | 카르마 학원' };

const INFO_ITEMS = [
  { label: '수업 시간', value: '평일 오후 3시 ~ 9시 / 주말 오전 10시 ~ 오후 4시' },
  { label: '반 편성', value: '레벨 테스트 후 수준별 반 배정' },
  { label: '수강 과목', value: '모의고사, 내신, 문법, 독해, 영작' },
  { label: '문의', value: '051-000-0000 / 카카오톡 @카르마영어' },
];

export default function AdmissionPage() {
  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/academy" className="hover:text-gray-700">카르마 학원</Link>
        {' / '}
        <span className="text-gray-700 font-medium">입학 안내</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">입학 안내</h1>
      <p className="text-gray-500 mb-10">카르마 영어학원 입학에 관한 정보입니다.</p>

      <div className="max-w-2xl space-y-4">
        {INFO_ITEMS.map((item) => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6">
            <span className="text-purple-600 font-bold w-28 shrink-0">{item.label}</span>
            <span className="text-gray-700">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6 max-w-2xl">
        <p className="text-purple-700 font-medium">상세 내용은 학원으로 직접 문의해 주세요.</p>
      </div>
    </PageShell>
  );
}
