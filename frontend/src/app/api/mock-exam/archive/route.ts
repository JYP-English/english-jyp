import { NextRequest } from 'next/server';
import { notion } from '@/lib/notion';

const DB_ID = process.env.NOTION_MOCK_EXAM_DB_ID!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const 학년 = searchParams.get('학년');
  const 학년도 = searchParams.get('학년도');
  const 교육청 = searchParams.get('교육청');

  const filters: object[] = [];
  if (학년) filters.push({ property: '학년', select: { equals: 학년 } });
  if (학년도) filters.push({ property: '학년도', number: { equals: Number(학년도) } });
  if (교육청) filters.push({ property: '교육청', select: { equals: 교육청 } });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    database_id: DB_ID,
    sorts: [
      { property: '학년도', direction: 'descending' },
      { property: '월', direction: 'descending' },
    ],
  };
  if (filters.length === 1) query.filter = filters[0];
  if (filters.length > 1) query.filter = { and: filters };

  try {
    const res = await notion.databases.query(query);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = res.results.map((page: any) => ({
      id: page.id,
      시험명: page.properties['시험명']?.title?.[0]?.plain_text ?? '',
      학년: page.properties['학년']?.select?.name ?? '',
      학년도: page.properties['학년도']?.number ?? null,
      월: page.properties['월']?.number ?? null,
      교육청: page.properties['교육청']?.select?.name ?? '',
      문제지: page.properties['문제지']?.url ?? null,
      정답: page.properties['정답']?.url ?? null,
      듣기: page.properties['듣기']?.url ?? null,
    }));

    return Response.json({ success: true, data: items });
  } catch (e) {
    console.error('[GET /api/mock-exam/archive]', e);
    return Response.json({ success: false, message: '서버 오류' }, { status: 500 });
  }
}
