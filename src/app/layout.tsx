import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marigold Listings',
  description: 'Rental Listings',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
