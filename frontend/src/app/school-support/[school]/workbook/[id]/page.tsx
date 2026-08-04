import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';
import { getWorkbookDetail, type NotionBlock } from '@/lib/notion';

interface Props { params: Promise<{ school: string; id: string }> }

function getParagraphText(block: NotionBlock): string | null {
  if (block.type !== 'paragraph') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return block.paragraph?.rich_text?.map((t: any) => t.plain_text ?? '').join('') ?? null;
}

export default async function WorkbookDetailPage({ params }: Props) {
  const { school: raw, id } = await params;
  const school = decodeURIComponent(raw);
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  let detail;
  try {
    detail = await getWorkbookDetail(id);
  } catch {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = (detail.page as any).properties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title: string = props['제목']?.title?.map((t: any) => t.plain_text ?? '').join('') ?? '';
  const year: number = props['연도']?.number ?? 0;
  const semester: string = props['학기']?.select?.name ?? '';
  const grade: string = props['학년']?.select?.name ?? '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const description: string = props['설명']?.rich_text?.map((t: any) => t.plain_text ?? '').join('') ?? '';
  const downloadUrl: string | null = props['다운로드URL']?.url ?? null;

  const paragraphs = detail.blocks.map(getParagraphText).filter(Boolean) as string[];

  return (
    <PageShell backHref={`/school-support/${school}/workbook`}>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <Link href={`/school-support/${school}/workbook`} className="hover:text-gray-700">워크북</Link>
        {' / '}
        <span className="text-gray-700 font-medium">{title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-2">
        {year > 0 && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{year}년</span>
        )}
        {semester && (
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{semester}</span>
        )}
        {grade && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{grade}</span>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {description && (
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
      )}

      {/* 다운로드 버튼 */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition mb-8"
        >
          📥 워크북 다운로드
        </a>
      )}

      {/* 페이지 본문 내용 */}
      {paragraphs.length > 0 && (
        <section className="bg-gray-50 rounded-2xl p-6 space-y-3">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {para}
            </p>
          ))}
        </section>
      )}

      {!downloadUrl && paragraphs.length === 0 && !description && (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-medium">자료가 준비 중입니다.</p>
        </div>
      )}
    </PageShell>
  );
}
