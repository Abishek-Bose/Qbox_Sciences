import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark } from '@/components/Watermark'
import { PRODUCT_GROUPS } from '@/content/products'

/**
 * The product portfolio as one table per group: Brand, Drug & Strength, Dosage
 * Form. A real <table> so screen readers get the column headers; the gradient
 * header and rounded card are styling only.
 */
export const ProductTables = () => (
  <section id="products" className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-20">
    <Watermark side="left" />

    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal y={16}>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Portfolio</p>
        <h2 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">Our Products</h2>
      </Reveal>

      <div className="mt-12 space-y-12">
        {PRODUCT_GROUPS.map(({ title, products }) => (
          <Reveal key={title} y={16}>
            <h3 className="text-2xl font-semibold text-navy">{title}</h3>

            {/* overflow-x-auto so a long drug name scrolls inside the card on a
                phone rather than pushing the whole page sideways. */}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline bg-white shadow-sm shadow-navy/5">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-brand via-navy to-abyss text-white">
                    <th scope="col" className="w-[26%] px-6 py-5 text-base font-medium">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-5 text-base font-medium">
                      Drug &amp; Strength
                    </th>
                    <th scope="col" className="w-[20%] px-6 py-5 text-base font-medium">
                      Dosage Form
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ brand, drug, form }) => (
                    <tr key={brand} className="border-t border-hairline first:border-t-0">
                      <th scope="row" className="px-6 py-4 text-base font-medium text-ink">
                        {brand}
                      </th>
                      <td className="px-6 py-4 text-base text-ink">{drug}</td>
                      <td className="px-6 py-4 text-base text-ink">{form}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default ProductTables
