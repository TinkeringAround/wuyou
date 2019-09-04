import React, { useContext, useState, useEffect } from 'react'
import { ResponsiveContext, Box, Text } from 'grommet'

// Types:
import { TOpinions, TQuote, TPricing, TPDF } from '../../types'

// Context
import context from '../../contentful-context'

// Atoms:
import Headline from '../../atoms/headline'
import Button from '../../atoms/button'
import Paragraph from '../../atoms/paragraph'

// Custom Components
import Dialog from '../../components/dialog'
import Spacer from '../../components/spacer'

// Utility
import { shuffle } from '../../utility'

// ===============================================
interface Props {}

// ===============================================
const Opinions: React.FC<Props> = () => {
  const { contentful } = useContext(context)
  const [opinions, setOpinions] = useState<TOpinions | null>(null)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (opinions == null && contentful != null) {
      contentful
        .getEntries({
          content_type: 'opinions'
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            const quotes: Array<TQuote> = results.items[0].fields['quotes'].map((quote: any) => {
              return {
                author: quote.fields['author'],
                age: quote.fields['age'],
                quote: quote.fields['quote']
              }
            })

            const prices: Array<TPricing> = results.items[0].fields['prices'].map(
              (pricing: any) => {
                return {
                  title: pricing.fields['title'],
                  price: pricing.fields['price']
                }
              }
            )

            const pdf: TPDF = {
              description: results.items[0].fields['pdf'].fields['description'],
              fileTitle: results.items[0].fields['pdf'].fields['data'].fields['title'],
              fileURL: 'https:' + results.items[0].fields['pdf'].fields['data'].fields['file'].url
            }

            const opinions = {
              quotes: shuffle(quotes),
              prices: shuffle(prices),
              pdf: pdf
            }
            setOpinions(opinions)
          }
        })
        .catch((error: any) => console.log(error))
    }
  }, [contentful])

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        const quoteContent = {
          fontSize: isMobile ? '0.75em' : '1em',
          marginBottom: '0.75em',
          fontFamily: 'Roboto mono',
          lineHeight: 1.5,
          letterSpacing: '0.01rem'
        }
        const quoteAuthor = {
          fontSize: isMobile ? '1em' : '1.25em',
          lineHeight: 1,
          marginTop: '0.5rem',
          fontFamily: 'Roboto mono',
          fontWeight: 600
        }

        return (
          <>
            {opinions && (
              <>
                <Spacer height={isMobile ? '50px' : '100px'} />
                <Box width="100%" align="center">
                  <Box
                    width={isMobile ? '90%' : '85%'}
                    height={isMobile ? '30%' : '20%'}
                    margin="0 auto"
                  >
                    <Headline alignEnd={false} title="Meinungen." />
                  </Box>
                  <Box
                    width={isMobile ? '95%' : '85%'}
                    margin={isMobile ? '0' : '4em auto 8em auto'}
                    justify={isMobile ? 'center' : 'between'}
                    align="start"
                    direction={isMobile ? 'column' : 'row'}
                  >
                    {opinions.quotes.map((quote: TQuote, index: number) => {
                      return (
                        <Box
                          key={'Quote-' + index}
                          width={isMobile ? '90%' : '30%'}
                          direction="column"
                          margin={isMobile ? '1.75em auto' : '0'}
                        >
                          <Text style={quoteContent}>{'"' + quote.quote + '"'}</Text>
                          <Text textAlign="end" style={quoteAuthor}>
                            {quote.author + ', ' + quote.age}
                          </Text>
                        </Box>
                      )
                    })}
                  </Box>
                  <Box width="100%" background="lightgrey" justify="center" align="center">
                    <Box
                      width={isMobile ? '90%' : '80%'}
                      justify="center"
                      align="center"
                      pad={isMobile ? '2em 0' : '2.5em'}
                    >
                      <Box
                        margin="0 auto 2em auto"
                        width={isMobile ? '90%' : '80%'}
                        justify="center"
                        align="center"
                      >
                        <Paragraph size={isMobile ? '1em' : '1.25em'} textAlign="center">
                          Kommt einfach mal zu einem <u>kostenlosen Probletraining</u> bei uns
                          vorbei und macht mit. Falls es euch gefällt und ihr gerne bei uns
                          beitreten wollt, dann könnt Ihr euch hier über die Preise informieren.
                        </Paragraph>
                      </Box>
                      <Box width={isMobile ? '90%' : '50%'}>
                        <Button active onClick={() => setShow(true)} textAlign="center">
                          Preisliste für eine Mitgliedschaft
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Dialog showDialog={show} closeDialog={() => setShow(false)} isMobile={isMobile}>
                  <Box width="100%">
                    <Headline
                      title="Preise."
                      subtitle="Monatliche Abrechnung. Kostenloses Probetraining."
                    />
                  </Box>
                  <Box
                    width="100%"
                    height={isMobile ? '80%' : 'auto'}
                    direction={isMobile ? 'column' : 'row'}
                    margin={(isMobile ? '0 ' : '2em ') + 'auto'}
                    style={{ minHeight: '60%' }}
                  >
                    <Box
                      width={isMobile ? '100%' : '50%'}
                      margin={isMobile ? '1em 0 1.5em 0' : '0'}
                    >
                      <Paragraph
                        size={isMobile ? '0.8em' : '1.2em'}
                        margin={isMobile ? '0' : '1.5em 0'}
                      >
                        {opinions.pdf.description}
                      </Paragraph>
                      <Box width="50%" margin="1em 0 0 1em">
                        <Button active link={opinions.pdf.fileURL}>
                          Anmeldeformular
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      width={isMobile ? '100%' : '50%'}
                      height={isMobile ? '50%' : 'auto'}
                      direction="row"
                      justify="center"
                      align="center"
                      margin={isMobile ? '0' : '1.5em 0'}
                      wrap
                    >
                      {opinions.prices.map((pricing: TPricing, index: number) => {
                        return (
                          <Box
                            key={'Pricing-' + index}
                            className="card"
                            width="46%"
                            height="46%"
                            margin="2%"
                            background="light"
                            justify="center"
                            align="center"
                          >
                            <Box width="90%" height="90%" justify="between">
                              <Text
                                color="black"
                                size={isMobile ? '2em' : '4em'}
                                textAlign="center"
                                style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                              >
                                {pricing.price + '€'}
                              </Text>
                              <Box
                                width="100%"
                                height="50%"
                                justify="center"
                                align="center"
                                background="white"
                              >
                                <Box width="90%">
                                  <Text
                                    size={isMobile ? '1em' : '1.25em'}
                                    textAlign="center"
                                    style={{ fontFamily: 'Roboto Mono' }}
                                  >
                                    {pricing.title}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                </Dialog>
              </>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Opinions
