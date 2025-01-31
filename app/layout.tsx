import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'antd/dist/reset.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Octavertex Dashboard',
  description: 'Client Discovery Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}