import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppContextProvider } from './context/appContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code-4-all',
  description: 'An code e-commenrce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* <AppContextProvider>{children}</AppContextProvider> */}
        {children}
      </body>
    </html>
  )
}
