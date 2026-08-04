/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import { SCHOOLS } from '@/lib/constants';
import { getGrammarDetail, type NotionBlock } from '@/lib/notion';

interface Props { params: Promise<{ school: string; id: string }> }

// ── Rich text ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichText({ tokens }: { tokens: any[] }) {
  if (!tokens?.length) return null;
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {tokens.map((t: any, i: number) => {
        const { bold, italic, code, strikethrough } = t.annotations ?? {};
        if (code) {
          return (
            <code key={i} className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded text-[0.85em] font-mono">
              {t.plain_text}
            </code>
          );
        }
        const cls = [bold && 'font-bold', italic && 'italic', strikethrough && 'line-through']
          .filter(Boolean).join(' ');
        return cls
          ? <span key={i} className={cls}>{t.plain_text}</span>
          : <span key={i}>{t.plain_text}</span>;
      })}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function richStr(tokens: any[]): string {
  return tokens?.map((t: any) => t.plain_text ?? '').join('') ?? '';
}

// ── Block renderer ─────────────────────────────────────────────────────────────

function renderBlocks(blocks: NotionBlock[]): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const b = blocks[i];

    if (b.type === 'heading_1') {
      nodes.push(
        <h2 key={b.id} className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200 first:mt-0">
          <RichText tokens={b.heading_1?.rich_text ?? []} />
        </h2>
      );
    } else if (b.type === 'heading_2') {
      nodes.push(
        <h3 key={b.id} className="text-base font-bold text-emerald-800 mt-7 mb-3">
          <RichText tokens={b.heading_2?.rich_text ?? []} />
        </h3>
      );
    } else if (b.type === 'heading_3') {
      nodes.push(
        <h4 key={b.id} className="text-sm font-bold text-gray-700 mt-5 mb-2">
          <RichText tokens={b.heading_3?.rich_text ?? []} />
        </h4>
      );
    } else if (b.type === 'paragraph') {
      const text = richStr(b.paragraph?.rich_text ?? []);
      if (text.trim()) {
        nodes.push(
          <p key={b.id} className="text-gray-700 leading-relaxed my-2 text-sm">
            <RichText tokens={b.paragraph?.rich_text ?? []} />
          </p>
        );
      }
    } else if (b.type === 'bulleted_list_item') {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(blocks[i++]);
      }
      nodes.push(
        <ul key={`ul-${items[0].id}`} className="list-disc pl-5 space-y-1.5 my-3 text-sm text-gray-700">
          {items.map((item) => (
            <li key={item.id}><RichText tokens={item.bulleted_list_item?.rich_text ?? []} /></li>
          ))}
        </ul>
      );
      continue;
    } else if (b.type === 'numbered_list_item') {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(blocks[i++]);
      }
      nodes.push(
        <ol key={`ol-${items[0].id}`} className="list-decimal pl-5 space-y-1.5 my-3 text-sm text-gray-700">
          {items.map((item) => (
            <li key={item.id}><RichText tokens={item.numbered_list_item?.rich_text ?? []} /></li>
          ))}
        </ol>
      );
      continue;
    } else if (b.type === 'divider') {
      nodes.push(<hr key={b.id} className="my-6 border-gray-200" />);
    } else if (b.type === 'quote') {
      nodes.push(
        <blockquote key={b.id} className="border-l-4 border-emerald-400 pl-4 py-1 my-3 bg-emerald-50 rounded-r-lg text-emerald-800 text-sm">
          <RichText tokens={b.quote?.rich_text ?? []} />
        </blockquote>
      );
    } else if (b.type === 'table') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows = (b.children ?? []) as any[];
      const hasColHeader = b.table?.has_column_header ?? false;
      if (rows.length > 0) {
        nodes.push(
          <div key={b.id} className="overflow-x-auto my-4 rounded-xl border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {rows.map((row, ri) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const cells: any[][] = row.table_row?.cells ?? [];
                  const isHeader = hasColHeader && ri === 0;
                  return (
                    <tr
                      key={row.id}
                      className={isHeader
                        ? 'bg-emerald-700 text-white'
                        : ri % 2 === 1 ? 'bg-gray-50' : 'bg-white'}
                    >
                      {cells.map((cell, ci) => {
                        const Tag = isHeader ? 'th' : 'td';
                        return (
                          <Tag
                            key={ci}
                            className={`border-b border-r border-gray-200 px-4 py-2.5 text-left last:border-r-0 ${isHeader ? 'font-semibold text-white border-emerald-600' : ''}`}
                          >
                            <RichText tokens={cell} />
                          </Tag>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    } else if (b.type === 'code') {
      nodes.push(
        <pre key={b.id} className="bg-gray-900 text-gray-100 rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{richStr(b.code?.rich_text ?? [])}</code>
        </pre>
      );
    }

    i++;
  }

  return <>{nodes}</>;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function GrammarDetailPage({ params }: Props) {
  const { school: raw, id } = await params;
  const school = decodeURIComponent(raw);
  const found = SCHOOLS.find((s) => s.slug === school);
  if (!found) notFound();

  let detail;
  try {
    detail = await getGrammarDetail(id);
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
  const pointsRaw: string = props['문법포인트목록']?.rich_text?.map((t: any) => t.plain_text ?? '').join('') ?? '';
  const points = pointsRaw ? pointsRaw.split(',').map((p) => p.trim()).filter(Boolean) : [];

  return (
    <PageShell>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/school-support" className="hover:text-gray-700">내신지원</Link>
        {' / '}
        <Link href={`/school-support/${school}`} className="hover:text-gray-700">{found.name}</Link>
        {' / '}
        <Link href={`/school-support/${school}/grammar`} className="hover:text-gray-700">학기별 문법 포인트</Link>
        {' / '}
        <span className="text-gray-700 font-medium">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          {year > 0 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{year}년</span>
          )}
          {semester && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{semester}</span>
          )}
          {grade && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{grade}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-5">{title}</h1>

        {/* 문법 포인트 요약 chips */}
        {points.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">이번 학기 핵심 문법</p>
            <div className="flex flex-wrap gap-2">
              {points.map((point, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 bg-white border border-emerald-200 text-emerald-800 text-sm px-3 py-1.5 rounded-full font-medium"
                >
                  <span className="w-5 h-5 bg-emerald-700 text-white rounded-full text-xs flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  {point}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notion 블록 콘텐츠 */}
      {detail.blocks.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          {renderBlocks(detail.blocks)}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-medium">상세 내용이 준비 중입니다.</p>
        </div>
      )}

      {/* 목록으로 돌아가기 */}
      <div className="mt-8">
        <Link
          href={`/school-support/${school}/grammar`}
          className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 font-medium"
        >
          ← 문법 포인트 목록으로
        </Link>
      </div>
    </PageShell>
  );
}
