import React from 'react'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import './styles.css'

/*
 * Copy note for the whole site: the client's house style is an en dash (–)
 * wherever a hyphen or an em dash would normally go, in every string a visitor
 * reads. It is deliberate — do not "correct" it back. Code comments, URLs and
 * third-party titles are exempt.
 */
export const metadata = {
  description: 'Qbox Sciences – advancing therapeutics through rigorous science.',
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
