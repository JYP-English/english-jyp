import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const INQUIRIES_DB_ID = process.env.NOTION_INQUIRIES_DB_ID!;

export const STATUS_TO_NAME = ['미확인', '확인완료', '처리완료'] as const;
export const NAME_TO_STATUS: Record<string, number> = {
  '미확인': 0,
  '확인완료': 1,
  '처리완료': 2,
};
