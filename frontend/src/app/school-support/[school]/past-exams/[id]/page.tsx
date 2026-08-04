import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';
import { getPastExamDetail, type NotionBlock } from '@/lib/notion';

interface Props { params: Promise<{ school: string; id: string }> }

function getImageUrl(block: NotionBlock): string | null {
  if (block.type !== 'image') return null;
  const img = block.image;
  if (img?.type === 'file') return img.file?.url ?? null;
  if (img?.type === 'external') return img.external?.url ?? null;
  return null;
}

function getParagraphText(block: NotionBlock): string | null {
  if (block.type !== 'paragraph') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return block.paragraph?.rich_text?.map((t: any) => t.plain_text ?? '').join('') ?? null;
}

export default async function PastExamDetailPage({ params }: Props) {
  const { school: raw, id } = await params;
  const school = decodeURIComponent(raw);
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  let detail;
  try {
    detail = await getPastExamDetail(id);
  } catch {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = (detail.page as any).properties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title = props['제목']?.title?.map((t: any) => t.plain_text ?? '').join('') ?? '';
  const year: number = props['연도']?.number ?? 0;
  const semester: string = props['학기']?.select?.name ?? '';
  const grade: string = props['학년']?.select?.name ?? '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const teacherNote: string = props['강사설명']?.rich_text?.map((t: any) => t.plain_text ?? '').join('') ?? '';

  const imageUrls = detail.blocks.map(getImageUrl).filter(Boolean) as string[];
  const paragraphs = detail.blocks.map(getParagraphText).filter(Boolean) as string[];

  return (
    <PageShell backHref={`/school-support/${school}/past-exams`}>
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <Link href={`/school-support/${school}/past-exams`} className="hover:text-gray-700">기출문제</Link>
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
      <h1 className="text-2xl font-bold mb-8">{title}</h1>

      {/* 기출문제 이미지 */}
      {imageUrls.length > 0 && (
        <section className="mb-10">
          <h2 className="text-base font-bold text-gray-700 mb-4">기출문제</h2>
          <div className="space-y-4">
            {imageUrls.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`기출문제 이미지 ${i + 1}`}
                className="w-full max-w-3xl rounded-xl border border-gray-200 shadow-sm"
              />
            ))}
          </div>
        </section>
      )}

      {/* 강사 해설 */}
      {(teacherNote || paragraphs.length > 0) && (
        <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-emerald-800 mb-3">강사 해설</h2>
          {teacherNote && (
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-4">
              {teacherNote}
            </p>
          )}
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-2">
              {para}
            </p>
          ))}
        </section>
      )}

      {imageUrls.length === 0 && !teacherNote && paragraphs.length === 0 && (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📄</p>
          <p className="font-medium">자료가 준비 중입니다.</p>
        </div>
      )}
    </PageShell>
  );
}
