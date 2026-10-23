/**
 * Product portfolio, the single place to edit until it moves into Payload.
 * Source: the "product folio card" PDF, grouped and ordered per the client's
 * handwritten note. Spelling is corrected where the PDF had typos the client
 * underlined (Sulbactam).
 */

export type Product = {
  brand: string
  drug: string
  form: string
}

export type ProductGroup = {
  title: string
  products: Product[]
}

const injection = (brand: string, drug: string): Product => ({ brand, drug, form: 'Injection' })

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    title: 'Anti Infectives',
    products: [
      injection('Ampilix', 'Ampicillin + Sulbactam 1.5 g & 3 g'),
      injection('Aztronov', 'Aztreonem 1 g & 2 g'),
      injection('Aztronov-A', 'Aztreonem 1.5 g + Avibactam 0.5 g'),
      injection('Cazent', 'Cefepime 2 g + Sulbactam 2 g'),
      injection('Doxidrip', 'Doxycycline 100 mg'),
      injection('Exatec', 'Teicoplanin 600 mg'),
      injection('Qmero', 'Meropenem 500 mg & 1 g'),
      injection('Qmero-S', 'Meropenem 1 g + Sulbactam 500 mg'),
      injection('Renomyx', 'Polymyxin B 5 Lac IU & 7.5 Lac IU'),
      injection('Repletz', 'Cefepime + Tazobactam 2.5 g'),
      injection('Sepshield', 'Ceftriaxone + Sulbactam + EDTA 1.5 g'),
      injection('Sulbastar', 'Sulbactam 2 g'),
    ],
  },
  {
    // The note boxed Rocubox on its own, so it is kept apart from the anti infectives.
    title: 'Critical Care',
    products: [injection('Rocubox', 'Rocuronium 50 mg/5 ml')],
  },
  {
    title: 'Immune Modulation',
    products: [
      { brand: 'Enzomune', drug: 'Lyophilised Pepsin Peptide 180 mg', form: 'Sublingual Tablet' },
    ],
  },
  {
    title: 'Wellness',
    products: [{ brand: 'Meloquent', drug: 'Melatonin 5 mg', form: 'Tablets' }],
  },
]
