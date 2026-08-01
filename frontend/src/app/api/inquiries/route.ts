import { notion, INQUIRIES_DB_ID } from '@/lib/notion';

export async function POST(req: Request) {
  try {
    const { name, phone, school, grade, message } = await req.json();

    if (!name || !phone || !message) {
      return Response.json({ success: false, message: '필수 항목을 입력해 주세요.' }, { status: 400 });
    }

    await notion.pages.create({
      parent: { database_id: INQUIRIES_DB_ID },
      properties: {
        '이름': { title: [{ text: { content: name } }] },
        '전화번호': { rich_text: [{ text: { content: phone } }] },
        '학교': { rich_text: school ? [{ text: { content: school } }] : [] },
        '학년': { rich_text: grade ? [{ text: { content: String(grade) } }] : [] },
        '문의내용': { rich_text: [{ text: { content: message } }] },
        '상태': { select: { name: '미확인' } },
      },
    });

    return Response.json({ success: true });
  } catch (e) {
    console.error('[POST /api/inquiries]', e);
    return Response.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
