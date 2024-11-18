'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { setCurrentUrl } from '../lib/features/slices/currentUrlSlice'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'AI助手管理平台',
//   description: 'AI助手管理平台',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <>
      <Head>
        <title>AI助手管理平台</title>
      </Head>
      <Provider store={storeRef.current}>
        <html lang="en">
          <body className={inter.className}>
            <div id="page-transition">{children}</div>
          </body>
        </html>
      </Provider>
    </>
  )

  // return (
    
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>
  // )
}
