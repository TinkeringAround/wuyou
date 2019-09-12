// ===============================================
export type THome = {
  desktop: string
  mobile: string
}

// ===============================================
export type TLogo = {
  title: string
  url: string
}

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

// ===============================================
export type TFooter = {
  imprint: TDocument | null
  datasecurity: TDocument | null
}

export type TDocument = {
  title: string
  chapters: Array<TChapter>
  data: TData | null
}

export type TChapter = {
  title: string
  paragraph: string | null
}

export type TData = {
  title: string
  url: string
}
