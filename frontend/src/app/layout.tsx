import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/layout/QueryProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const SITE_URL = 'https://english-jyp.vercel.app';
const SITE_NAME = '카르마 영어학원';
const DEFAULT_TITLE = '카르마 영어학원 | 부산 해운대구 중고등 영어 전문';
const DEFAULT_DESCRIPTION =
  '부산광역시 해운대구 Karma 영어학원. 학교별 내신 기출 분석, 모의고사 대비, 문법·독해 커리큘럼까지 중고등 영어를 체계적으로 준비하세요.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png?v=2',

        width: 1200,
        height: 630,
        alt: '카르마 영어학원',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png?v=2'],
  },
  keywords: ['카르마 영어학원', '부산 영어학원', '해운대구 영어', '중고등 영어', '내신 영어', '모의고사 영어', '부산 해운대구 학원'],
  authors: [{ name: 'JYP' }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
