import type { Metadata } from 'next'
import './globals.css'
import inject from '@stylexjs/dev-runtime'

export const metadata: Metadata = {
  title: 'Marigold Listings',
  description: 'Rental Listings',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (process.env.NODE_ENV !== 'production') {
    inject({
      // configuration options
      classNamePrefix: 'x-',
      dev: true,
      test: false,
      useRemForFontSize: false,
      styleResolution: 'application-order',
    })
  }
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
