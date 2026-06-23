import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: '윤홍비 | 포트폴리오',
  description: '퍼블리셔 윤홍비의 포트폴리오 사이트입니다. CMS, SEO, 웹 퍼블리싱 프로젝트를 소개합니다.',
  openGraph: {
    title: '윤홍비 | 포트폴리오',
    description: '퍼블리셔 윤홍비의 포트폴리오 사이트입니다. CMS, SEO, 웹 퍼블리싱 프로젝트를 소개합니다.',
    url: 'https://rd-aqqeoff18-pibee.vercel.app/', // 실제 배포 주소로 변경
    siteName: '윤홍비 포트폴리오',
    images: [
      {
        url: '/sum.png', // public 폴더에 1200x630 이미지 넣기
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '윤홍비 | 포트폴리오',
    description: '퍼블리셔 윤홍비의 포트폴리오 사이트입니다.',
    images: ['/sum.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children} <Analytics /></body>
    </html>
  )
}