// ===============================================
export type TTraining = {
  articles: Array<TArticle>
  trainers: Array<TImage>
}

export type TArticle = {
  title: string
  subtitle: string
  paragraph: string
  url: string
}

export type TTrainer = {
  name: string
  age?: string
  description: Array<string>
  image: string
}

// ===============================================
export type TIcon = {
  viewport: string
  path: JSX.Element
}

// ===============================================
export type TOpinions = {
  quotes: Array<TQuote>
  prices: Array<TPricing>
  pdf: TPDF
}

export type TQuote = {
  author: string
  age: string
  quote: string
}

export type TPricing = {
  title: string
  price: string
}

export type TPDF = {
  description: string
  fileTitle: string
  fileURL: string
}

// ===============================================
export type TMedia = {
  format: string
  image: TImage
}

export type TImage = {
  name: string
  description: Array<string>
  addition: string
  url: string
}

// ===============================================
export type TPosition = {
  address: Array<string>
  days: Array<string>
  descriptions: Array<string>
  times: Array<string>
  titles: Array<string>
  trainers: Array<string>
  map: string
  mapMobile: string
  url: string
}
