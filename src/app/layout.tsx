import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";
import { EdgeStoreProvider } from '@/lib/edgestore'
import { AppContextProvider } from './context/appContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code-4all',
  description: 'A code e-commenrce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white" suppressHydrationWarning={true}>
        <ToastContainer />
        <EdgeStoreProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
