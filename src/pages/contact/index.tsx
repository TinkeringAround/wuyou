import React, { useState, useEffect, useContext } from 'react'
import { Box, ResponsiveContext, Heading, Text } from 'grommet'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Types:
import { TPosition } from '../../types'

// Context
import context from '../../contentful-context'

// Atoms
import Headline from '../../atoms/headline'

// Components
import Paragraph from '../../atoms/paragraph'

// ===============================================
interface Props {}

// ===============================================
const Contact: React.FC<Props> = () => {
  const { contentful } = useContext(context)
  const [position, setPosition] = useState<TPosition | null>(null)

  // Life Cycle Methods
  useEffect(() => {
    if (position == null) {
      contentful
        .getEntries({
          content_type: 'position',
          include: 2
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            setPosition({
              address: results.items[0].fields['address'],
              days: results.items[0].fields['days'],
              descriptions: results.items[0].fields['description'],
              times: results.items[0].fields['time'],
              titles: results.items[0].fields['title'],
              trainers: results.items[0].fields['trainer'],
              url: results.items[0].fields['link'],
              map: 'https:' + results.items[0].fields['map'].fields['file'].url,
              mapMobile: 'https:' + results.items[0].fields['mapMobile'].fields['file'].url
            })
          }
        })
        .catch((error: any) => console.log('Position:', error))
    }
  }, [contentful])

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <>
            {position && (
              <>
                <Box
                  width={isMobile ? '90%' : '85%'}
                  height={isMobile ? '25%' : '20%'}
                  margin="0 auto"
                >
                  <Headline alignEnd={false} title="Anfahrt und Zeiten." />
                </Box>
                <Box width={isMobile ? '90%' : '85%'} margin="0 auto 1em auto">
                  <Box width="100%">
                    <Heading level="3" color="black" size="2em" margin="0">
                      Trainingsort:
                    </Heading>
                    {position.address.map((address: string, index: number) => (
                      <Paragraph key={'Position-' + index} margin="0.2em 0 0 0" noPadding>
                        {address}
                      </Paragraph>
                    ))}
                    <Heading level="3" color="black" size="2em" margin="1em 0 0 0">
                      Trainingszeiten:
                    </Heading>
                  </Box>

                  <Box
                    width="100%"
                    direction={isMobile ? 'column' : 'row'}
                    margin="1em 0 0 0"
                    justify="between"
                  >
                    {position.days.map((day: string, index: number) => {
                      return (
                        <Box
                          key={'TrainingTime-' + index}
                          className="card"
                          width={isMobile ? '100%' : '45%'}
                          height={isMobile ? '250px' : '400px'}
                          margin={isMobile ? '1em 0' : '0'}
                          background="light"
                          justify="center"
                          align="center"
                        >
                          <Box width="90%" height="90%" justify="between">
                            <Text
                              color="black"
                              size={isMobile ? '1em' : '2em'}
                              textAlign="center"
                              style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                            >
                              {day}
                            </Text>
                            <Text
                              color="black"
                              size={isMobile ? '1.25em' : '1.75em'}
                              textAlign="center"
                              style={{ fontFamily: 'Roboto Mono' }}
                            >
                              {position.times[index]}
                            </Text>
                            <Box width="100%" height="70%" background="white">
                              <Box
                                width="95%"
                                height="95%"
                                justify="around"
                                align="center"
                                margin="auto"
                              >
                                <Text
                                  size={isMobile ? '1em' : '2em'}
                                  textAlign="center"
                                  style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                                >
                                  {position.titles[index]}
                                </Text>
                                <Box width={isMobile ? '90%' : '70%'}>
                                  <Text
                                    size={isMobile ? '0.75em' : '1em'}
                                    textAlign="center"
                                    style={{ fontFamily: 'Roboto Mono' }}
                                  >
                                    {position.descriptions[index]}
                                  </Text>
                                </Box>
                                <Text
                                  size={isMobile ? '0.5em' : '0.75em'}
                                  textAlign="center"
                                  style={{ fontFamily: 'Roboto Mono' }}
                                >
                                  {position.trainers[index]}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
                <Box
                  width="100%"
                  height={isMobile ? '300px' : '500px'}
                  className="overlay"
                  margin={isMobile ? '2em auto' : '4em auto'}
                >
                  <a
                    href={position.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  >
                    <LazyLoadImage
                      alt="Anfahrt zum Wuyou e.V."
                      effect="opacity"
                      src={isMobile ? position.mapMobile : position.map}
                      scrollPosition={false}
                      visibleByDefault={false}
                      width="100%"
                      height="100%"
                      style={{ objectFit: 'cover' }}
                    />
                  </a>
                </Box>
              </>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Contact
