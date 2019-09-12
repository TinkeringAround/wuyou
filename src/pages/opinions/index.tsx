import React, { useState } from 'react'
import { ResponsiveContext, Box, Text } from 'grommet'

// Types:
import { TQuote, TPricing } from '../../types'

// Data
import * as opinions from '../../assets/opinions.json'

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
  const [show, setShow] = useState<boolean>(false)

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const isMedium = size.includes('medium')

        const quoteContent = {
          fontSize: isMobile ? '0.75em' : '1em',
          marginBottom: '0.75em',
          fontFamily: 'Roboto Mono',
          lineHeight: 1.5,
          letterSpacing: '0.01rem'
        }
        const quoteAuthor = {
          fontSize: isMobile ? '1em' : '1.25em',
          lineHeight: 1,
          marginTop: '0.5rem',
          fontFamily: 'Roboto Mono',
          fontWeight: 600
        }

        return (
          <>
            {opinions && (
              <>
                <Spacer id="opinions" height={isMobile ? '1px' : '100px'} />
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
                    {shuffle(opinions.quotes).map((quote: TQuote, index: number) => {
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
                        <Button onClick={() => setShow(true)} textAlign="center">
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
                    height={isMobile ? '80%' : ''}
                    direction={isMobile ? 'column' : 'row'}
                    margin={(isMobile ? '0 ' : '2em ') + 'auto'}
                    style={{ minHeight: '60%' }}
                  >
                    <Box
                      width={isMobile ? '100%' : '50%'}
                      height={isMobile ? '50%' : ''}
                      direction="row"
                      justify="center"
                      align="center"
                      margin="1.5em 0"
                      wrap
                    >
                      {shuffle(opinions.prices).map((pricing: TPricing, index: number) => {
                        return (
                          <Box
                            key={'Pricing-' + index}
                            className="card"
                            width="46%"
                            height="46%"
                            margin="2%"
                            background="white"
                            justify="center"
                            align="center"
                          >
                            <Box width="90%" height="90%" justify="between">
                              <Text
                                color="black"
                                size={isMobile ? '2em' : isMedium ? '3em' : '4em'}
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
                                    size={isMobile ? '1em' : isMedium ? '1em' : '1.5em'}
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
                    <Box
                      width={isMobile ? '100%' : '50%'}
                      margin="0"
                      pad={isMobile ? '0 1%' : '0 1em'}
                    >
                      <Paragraph
                        size={isMobile ? '0.8em' : '1.2em'}
                        margin={isMobile ? '0' : '1.5em 0'}
                      >
                        {opinions.pdf.description}
                      </Paragraph>
                      <Box width="70%" margin={isMobile ? '0.5em 0 0 0' : '0.5em 0 0 0'}>
                        <Button link={opinions.pdf.fileURL} textAlign="center">
                          Anmeldeformular
                        </Button>
                      </Box>
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
