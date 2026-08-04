import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

// DB IDs
export const INQUIRIES_DB_ID = process.env.NOTION_INQUIRIES_DB_ID!;
export const TREND_DB_ID = process.env.NOTION_TREND_DB_ID!;
export const GRAMMAR_DB_ID = process.env.NOTION_GRAMMAR_DB_ID!;
export const PAST_EXAMS_DB_ID = process.env.NOTION_PAST_EXAMS_DB_ID!;
export const WORKBOOK_DB_ID = process.env.NOTION_WORKBOOK_DB_ID!;

// Inquiry status maps
export const STATUS_TO_NAME = ['미확인', '확인완료', '처리완료'] as const;
export const NAME_TO_STATUS: Record<string, number> = {
  '미확인': 0,
  '확인완료': 1,
  '처리완료': 2,
};

// ── Shared Types ───────────────────────────────────────────────────────────────

export interface TrendItem {
  id: string;
  title: string;
  year: number;
  semester: string;
  grade: string;
  summary: string;
}

export interface GrammarItem {
  id: string;
  title: string;
  year: number;
  semester: string;
  grade: string;
  points: string;
}

export interface PastExamItem {
  id: string;
  title: string;
  year: number;
  semester: string;
  grade: string;
  teacherNote: string;
}

export interface WorkbookItem {
  id: string;
  title: string;
  year: number;
  semester: string;
  grade: string;
  description: string;
  downloadUrl: string | null;
}

export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// ── Internal Helpers ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function richText(arr: any[]): string {
  if (!Array.isArray(arr)) return '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return arr.map((t: any) => t.plain_text ?? '').join('');
}

function schoolFilter(school: string) {
  return { property: '학교', select: { equals: school } };
}

function publishedFilter() {
  return { property: '공개여부', checkbox: { equals: true } };
}

// ── School Support Queries ─────────────────────────────────────────────────────

export async function getTrendItems(school: string): Promise<TrendItem[]> {
  try {
    const res = await notion.databases.query({
      database_id: TREND_DB_ID,
      filter: { and: [schoolFilter(school), publishedFilter()] },
      sorts: [
        { property: '연도', direction: 'descending' },
        { property: '학기', direction: 'descending' },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res.results as any[]).map((p) => ({
      id: p.id as string,
      title: richText(p.properties['제목'].title),
      year: (p.properties['연도'].number as number) ?? 0,
      semester: (p.properties['학기'].select?.name as string) ?? '',
      grade: (p.properties['학년'].select?.name as string) ?? '',
      summary: richText(p.properties['내용요약'].rich_text),
    }));
  } catch {
    return [];
  }
}

export async function getGrammarItems(school: string): Promise<GrammarItem[]> {
  try {
    const res = await notion.databases.query({
      database_id: GRAMMAR_DB_ID,
      filter: { and: [schoolFilter(school), publishedFilter()] },
      sorts: [
        { property: '연도', direction: 'descending' },
        { property: '학기', direction: 'descending' },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res.results as any[]).map((p) => ({
      id: p.id as string,
      title: richText(p.properties['제목'].title),
      year: (p.properties['연도'].number as number) ?? 0,
      semester: (p.properties['학기'].select?.name as string) ?? '',
      grade: (p.properties['학년'].select?.name as string) ?? '',
      points: richText(p.properties['문법포인트목록'].rich_text),
    }));
  } catch {
    return [];
  }
}

export async function getPastExamItems(school: string): Promise<PastExamItem[]> {
  try {
    const res = await notion.databases.query({
      database_id: PAST_EXAMS_DB_ID,
      filter: { and: [schoolFilter(school), publishedFilter()] },
      sorts: [
        { property: '연도', direction: 'descending' },
        { property: '학기', direction: 'descending' },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res.results as any[]).map((p) => ({
      id: p.id as string,
      title: richText(p.properties['제목'].title),
      year: (p.properties['연도'].number as number) ?? 0,
      semester: (p.properties['학기'].select?.name as string) ?? '',
      grade: (p.properties['학년'].select?.name as string) ?? '',
      teacherNote: richText(p.properties['강사설명'].rich_text),
    }));
  } catch {
    return [];
  }
}

export async function getTrendDetail(pageId: string) {
  const [page, blocksRes] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);
  const blocks = blocksRes.results as NotionBlock[];
  const enriched = await Promise.all(
    blocks.map(async (b) => {
      if (b.type === 'table') {
        const rows = await notion.blocks.children.list({ block_id: b.id });
        return { ...b, children: rows.results };
      }
      return b;
    })
  );
  return { page, blocks: enriched };
}

export async function getGrammarDetail(pageId: string) {
  const [page, blocksRes] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);
  const blocks = blocksRes.results as NotionBlock[];
  const enriched = await Promise.all(
    blocks.map(async (b) => {
      if (b.type === 'table') {
        const rows = await notion.blocks.children.list({ block_id: b.id });
        return { ...b, children: rows.results };
      }
      return b;
    })
  );
  return { page, blocks: enriched };
}

export async function getPastExamDetail(pageId: string) {
  const [page, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);
  return { page, blocks: blocks.results as NotionBlock[] };
}

export async function getWorkbookItems(school: string): Promise<WorkbookItem[]> {
  try {
    const res = await notion.databases.query({
      database_id: WORKBOOK_DB_ID,
      filter: { and: [schoolFilter(school), publishedFilter()] },
      sorts: [
        { property: '연도', direction: 'descending' },
        { property: '학기', direction: 'descending' },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res.results as any[]).map((p) => ({
      id: p.id as string,
      title: richText(p.properties['제목'].title),
      year: (p.properties['연도'].number as number) ?? 0,
      semester: (p.properties['학기'].select?.name as string) ?? '',
      grade: (p.properties['학년'].select?.name as string) ?? '',
      description: richText(p.properties['설명'].rich_text),
      downloadUrl: (p.properties['다운로드URL'].url as string | null) ?? null,
    }));
  } catch {
    return [];
  }
}

export async function getWorkbookDetail(pageId: string) {
  const [page, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    notion.blocks.children.list({ block_id: pageId }),
  ]);
  return { page, blocks: blocks.results as NotionBlock[] };
}
