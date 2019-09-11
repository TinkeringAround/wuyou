import { TOpinions } from '../../types'

// ===============================================
const opinions: TOpinions = {
  quotes: [
    {
      author: 'Alina Walth',
      age: '22',
      quote:
        'Der Wuyou ist für mich wie eine zweite Familie geworden, deswegen gehe ich nicht nur wegen des Sports dorthin, sondern auch wegen der Menschen.'
    },
    {
      author: 'Mario Hahn',
      age: '55',
      quote:
        'Im Wushu ist man oft durch die Komplexität der Bewegungen zu höchster Konzentration und Koordination gezwungen, wodurch beide Gehirnhälften stets angeregt werden.'
    },
    {
      author: 'Thomas Maier',
      age: '24',
      quote:
        'Im Wushu lernt man Selbstverteidigung, den waffenlosen Kampf, den Umgang mit den traditionellen chinesischen Waffen, akrobatische Sprünge und Drehungen wie im Film.'
    }
  ],
  prices: [
    {
      title: 'Erwachsene',
      price: '30'
    },
    {
      title: 'Familie',
      price: '50'
    },
    {
      title: 'Kind, Schüler & Student',
      price: '15'
    },
    {
      title: 'Passives Mitglied',
      price: '5'
    }
  ],
  pdf: {
    description:
      'Die folgenden Preise werden monatlich abgerechnet, kommt vorher einfach mal beim Training vorbei und schnuppert rein. Wenn ihr Spaß beim Training habt, dann findet ihr hier das Anmeldeformular. Einfach ausfüllen und beim nächsten Mal beim Training vorbeibringen.',
    fileTitle: 'Anmeldeformular Wuyou e.V.',
    fileURL: 'https://wuyou.de/anmeldeformular.pdf'
  }
}

export default opinions
