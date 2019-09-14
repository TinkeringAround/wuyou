var fs = require('fs')
require('dotenv').config()

// Shuffle
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ===============================================
const contentful = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_API_KEY
})

const pathPrefix = './src/assets/'

// ===============================================

// Logo
contentful
  .getEntries({
    content_type: 'logo',
    include: 2
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const logo = {
        title: results.items[0].fields['title'],
        url: 'https:' + results.items[0].fields['logo'].fields['file'].url,
        urlInverse: 'https:' + results.items[0].fields['logoInverse'].fields['file'].url
      }
      fs.writeFileSync(pathPrefix + 'logo.json', JSON.stringify(logo, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log('Position:', error))

// ===============================================

// Home
contentful
  .getEntries({
    content_type: 'home',
    include: 2
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const home = {
        desktop: 'https:' + results.items[0].fields['desktop'].fields['file'].url,
        mobile: 'https:' + results.items[0].fields['mobile'].fields['file'].url
      }
      fs.writeFileSync(pathPrefix + 'home.json', JSON.stringify(home, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log('Position:', error))

// ===============================================

// Position
contentful
  .getEntries({
    content_type: 'position',
    include: 2
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const position = {
        address: results.items[0].fields['address'],
        days: results.items[0].fields['days'],
        descriptions: results.items[0].fields['description'],
        times: results.items[0].fields['time'],
        titles: results.items[0].fields['title'],
        trainers: results.items[0].fields['trainer'],
        url: results.items[0].fields['link'],
        map: 'https:' + results.items[0].fields['map'].fields['file'].url,
        mapMobile: 'https:' + results.items[0].fields['mapMobile'].fields['file'].url
      }
      fs.writeFileSync(pathPrefix + 'position.json', JSON.stringify(position, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log('Position:', error))

// ===============================================

// Gallery
contentful
  .getEntries({
    content_type: 'media',
    include: 2
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const media = results.items.map(item => {
        return {
          format: item.fields['format'],
          image: {
            name: item.fields['name'],
            description: [item.fields['description']],
            addition: '',
            url: 'https:' + item.fields['image'].fields['file'].url
          }
        }
      })
      fs.writeFileSync(pathPrefix + 'gallery.json', JSON.stringify(media, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log('Gallery:', error))

// ===============================================

// Opinions
contentful
  .getEntries({
    content_type: 'opinions'
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const quotes = results.items[0].fields['quotes'].map(quote => {
        return {
          author: quote.fields['author'],
          age: quote.fields['age'],
          quote: quote.fields['quote']
        }
      })

      const prices = results.items[0].fields['prices'].map(pricing => {
        return {
          title: pricing.fields['title'],
          price: pricing.fields['price']
        }
      })

      const pdf = {
        description: results.items[0].fields['pdf'].fields['description'],
        fileTitle: results.items[0].fields['pdf'].fields['data'].fields['title'],
        fileURL: 'https:' + results.items[0].fields['pdf'].fields['data'].fields['file'].url
      }

      const opinions = {
        quotes: shuffle(quotes),
        prices: shuffle(prices),
        pdf: pdf
      }

      fs.writeFileSync(pathPrefix + 'opinions.json', JSON.stringify(opinions, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log(error))

// ===============================================

// Training
contentful
  .getEntries({
    content_type: 'training',
    include: 2
  })
  .then(results => {
    if (results.hasOwnProperty('items')) {
      const training = {
        articles: shuffle(
          results.items[0].fields['articles'].map(article => {
            return {
              title: article.fields['title'],
              subtitle: article.fields['subtitle'] != null ? article.fields['subtitle'] : '',
              paragraph: article.fields['content'],
              url: 'https:' + article.fields['image'].fields['file'].url
            }
          })
        ),
        trainers: shuffle(
          results.items[0].fields['trainers'].map(trainer => {
            return {
              name: trainer.fields['name'],
              addition: '' + trainer.fields['age'],
              description: trainer.fields['description'],
              url: 'https:' + trainer.fields['image'].fields['file'].url
            }
          })
        )
      }

      fs.writeFileSync(pathPrefix + 'training.json', JSON.stringify(training, null, 2), 'utf-8')
    }
  })
  .catch(error => console.log(error))

// ===============================================

// Footer
contentful
  .getEntries({
    content_type: 'document',
    include: 2
  })
  .then(results => {
    var newFooter = {
      imprint: null,
      datasecurity: null
    }
    if (results.hasOwnProperty('items')) {
      results.items.forEach(document => {
        const tmp = {
          title: document.fields['title'],
          chapters: document.fields['chapter'].map(chapter => {
            const c = {
              title: chapter.fields['title'],
              paragraph: chapter.fields['paragraph'] ? chapter.fields['paragraph'] : null
            }
            return c
          }),
          data: document.fields.hasOwnProperty('data')
            ? {
                title: document.fields['data'].fields['title'],
                url: 'https:' + document.fields['data'].fields['file'].url
              }
            : null
        }
        if (tmp.title === 'Impressum') newFooter.imprint = tmp
        else if (tmp.title === 'Datenschutz') newFooter.datasecurity = tmp
      })
    }
    fs.writeFileSync(pathPrefix + 'footer.json', JSON.stringify(newFooter, null, 2), 'utf-8')
  })
  .catch(error => console.log(error))
