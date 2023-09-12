import React from 'react'

import './global.scss'
import Header from '@/src/components/Header/Header'

import Head from './head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head></Head>
      <body>
        <div className="fixed-width">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
