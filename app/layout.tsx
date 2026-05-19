import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const cookieRun = localFont({
  src: [
    {
      path: '../public/fonts/CookieRunFont_OTF/CookieRun Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CookieRunFont_OTF/CookieRun Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/CookieRunFont_OTF/CookieRun Black.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-cookierun',
  fallback: ['system-ui', 'sans-serif']
})

const supersonicRocketship = localFont({
  src: '../public/fonts/Supersonic Rocketship.ttf',
  variable: '--font-logo',
  fallback: ['cursive']
})

export const metadata: Metadata = {
  title: 'SPAGHETTI - Object-Oriented Pain Sharing',
  description: '자랑할 수 없다면, 장렬하게 망한 걸 공유하자.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${cookieRun.variable} ${supersonicRocketship.variable} font-sans antialiased bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forceTheme="dark">
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
