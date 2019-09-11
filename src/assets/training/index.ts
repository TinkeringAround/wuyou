import { TTraining } from '../../types'

// Assets:
import article1 from './article1.jpg'
import article2 from './article2.jpg'
import article3 from './article3.jpg'

import Alina from './Alina.png'
import Birgit from './Birgit.png'
import Celine from './Celine.png'
import Mario from './Mario.png'
import Thomas from './Thomas.png'

// ===============================================
const training: TTraining = {
  articles: [
    {
      title: 'Wushu.',
      subtitle: 'Herkunft und Geschichte.',
      paragraph: `Wushu ist der Oberbegriff aller chinesischen Kampfkünste und wird im westlichen Teil der Welt auch oft als Kung Fu (Gongfu) bezeichnet.
    Wushu ist in seinem Ursprungsort China mit einer jahrtausend alten Tradition verknüpft und hat sich erst in den letzten 50 Jahren zu der wettkampffähigen Sportart entwickelt. Unterschieden wird dabei zwischen zwei Ausrichtungen, dem traditionellen und modernen Wushu.
    Unsere Trainer wurden im Taolu und Taiji-Bereich über Jahre in beiden Bereichen gelehrt.`,
      url: article1
    },
    {
      title: 'Taolu.',
      subtitle: '',
      paragraph: `Unter traditionellem Wushu versteht man die über tausenden von Jahren entstandenen Formen, die über Generationen hinweg von Meister zu Schüler weitergereicht wurde. In diesen Formen hat jede Bewegung eine Kampfbedeutung, die es zu perfektionieren gilt. Kraft, Geschwindigkeit, Rythmus, Koordination, Balance sind nur wenige der Eigenschaften, die ein Wushu Sportler zu trainieren und meistern hat, um ein Form vollständig zu verstehen und darbieten zu können. Auch der Umgang mit traditionellen chinesischen Waffen wie der Dreistock oder die Kette werden gelehrt.`,
      url: article2
    },
    {
      title: 'Taiji.',
      subtitle: '',
      paragraph: `Das Moderne Wushu entstand ab den 1950er Jahre in China durch ein Komitee erfahrener und angesehener Meister des traditionellen Wushu.
      Sie kombinierten die traditionellen Stile und formten einheitliche und damit wettkampffähige Formen.
      In diesen Formen wird nicht nur viel Wert auf die Basis der Kampfkunst, sondern auch auf Akrobatikelemente und auf die Ästhetik der Darbietung gelegt. Im Modernen Wushu wird auch der Umgang der Waffen gelehrt, wobei man sich dabei auf eine geringere Auswahl beschränkt. Das Schwert, der chinesische Säbel und der Langstock sind dabei die am häufigst gesehensten.`,
      url: article3
    }
  ],
  trainers: [
    {
      name: 'Alina Walth',
      description: [
        'Trainerin Taiji',
        'Trainerin Taolu',
        'Deutsche Meisterin',
        'Europameisterin im Taiji'
      ],
      addition: '22',
      url: Alina
    },
    {
      name: 'Birgit Walth',
      description: [
        'Trainerin Taiji',
        'Medailliengewinnerin an Nordostdeutschen und Deutschen Meisterschaften'
      ],
      addition: '50',
      url: Birgit
    },
    {
      name: 'Celine Walth',
      description: [
        'Trainerin Tolu',
        'Deutsche Meisterin',
        'Teilnahme an Europa- und Weltmeisterschaften'
      ],
      addition: '20',
      url: Celine
    },
    {
      name: 'Mario Hahn',
      description: ['Trainer Taiji', 'mehrmaliger Deutscher Meister im Taiji'],
      addition: '55',
      url: Mario
    },
    {
      name: 'Thomas Maier',
      description: [
        'Leitung Taolu/Wushu',
        'mehrmaliger Deutscher Meister im Taolu',
        'Teilnahme an Europa- und Weltmeisterschaften'
      ],
      addition: '24',
      url: Thomas
    }
  ]
}

export default training
