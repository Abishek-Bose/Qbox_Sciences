import React from 'react'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import './styles.css'

export const metadata = {
  description: 'Qbox Sciences — advancing therapeutics through rigorous science.',
  title: 'Qbox Sciences',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
