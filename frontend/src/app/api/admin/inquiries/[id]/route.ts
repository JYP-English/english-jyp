import { NextRequest } from 'next/server';
import { notion, STATUS_TO_NAME } from '@/lib/notion';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (req.headers.get('x-admin-key') !== process.env.ADMIN_PASSWORD) {
    return Response.json({ success: false, message: '인증 실패' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();
    const statusName = STATUS_TO_NAME[status as 0 | 1 | 2] ?? '미확인';

    await notion.pages.update({
      page_id: id,
      properties: {
        '상태': { select: { name: statusName } },
      },
    });

    return Response.json({ success: true, data: { id, status } });
  } catch (e) {
    console.error('[PATCH /api/admin/inquiries/[id]]', e);
    return Response.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
