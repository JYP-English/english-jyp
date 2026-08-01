import { NextRequest } from 'next/server';
import { notion, INQUIRIES_DB_ID, NAME_TO_STATUS } from '@/lib/notion';

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-key') !== process.env.ADMIN_PASSWORD) {
    return Response.json({ success: false, message: '인증 실패' }, { status: 401 });
  }

  try {
    const res = await notion.databases.query({
      database_id: INQUIRIES_DB_ID,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    });

    const items = res.results.map((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties as Record<string, { type: string; title?: { plain_text: string }[]; rich_text?: { plain_text: string }[]; number?: number | null; select?: { name: string } | null }>;

      const statusName = props['상태']?.select?.name ?? '미확인';

      return {
        id: page.id,
        name: props['이름']?.title?.[0]?.plain_text ?? '',
        phone: props['전화번호']?.rich_text?.[0]?.plain_text ?? '',
        school: props['학교']?.rich_text?.[0]?.plain_text ?? '',
        grade: props['학년']?.rich_text?.[0]?.plain_text
          ? Number(props['학년'].rich_text[0].plain_text)
          : null,
        message: props['문의내용']?.rich_text?.[0]?.plain_text ?? '',
        status: NAME_TO_STATUS[statusName] ?? 0,
        createdAt: (page as { created_time: string }).created_time,
      };
    });

    return Response.json({ success: true, data: { items, totalCount: items.length } });
  } catch (e) {
    console.error('[GET /api/admin/inquiries]', e);
    return Response.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
