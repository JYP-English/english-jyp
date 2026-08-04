import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import GrammarList from '@/components/GrammarList';
import { SCHOOLS } from '@/lib/constants';
import { getGrammarItems } from '@/lib/notion';

export const revalidate = 3600;

interface Props { params: Promise<{ school: string }> }

export default async function GrammarPage({ params }: Props) {
  const { school: raw } = await params;
  const school = decodeURIComponent(raw);
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  const items = await getGrammarItems(found.name);

  return (
    <PageShell>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <span className="text-gray-700 font-medium">학기별 문법 포인트</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{found.name} — 학기별 문법 포인트</h1>
      <p className="text-gray-500 mb-10">학기별로 다루는 핵심 문법 포인트를 정리한 자료입니다.</p>

      <GrammarList items={items} />
    </PageShell>
  );
}
