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
import Spacer from '../../components/spacer'

// ===============================================
interface Props {}

// ===============================================
const Position: React.FC<Props> = () => {
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
                <Spacer id="position" height={isMobile ? '5em' : '8em'} />
                <Box
                  width={isMobile ? '90%' : '85%'}
                  height={isMobile ? '25%' : '20%'}
                  margin="0 auto"
                >
                  <Headline alignEnd={false} title="Anfahrt und Zeiten." />
                </Box>
                <Box width={isMobile ? '90%' : '85%'} margin="0 auto 1em auto">
                  <Box width="100%">
                    <Heading
                      level="3"
                      color="black"
                      size={isMobile ? '1.25em' : '2em'}
                      margin="0"
                      style={{ fontFamily: 'Roboto Mono' }}
                    >
                      Trainingsort:
                    </Heading>
                    {position.address.map((address: string, index: number) => (
                      <Paragraph key={'Position-' + index} margin="0.2em 0 0 0" noPadding>
                        {address}
                      </Paragraph>
                    ))}
                    <Heading
                      level="3"
                      color="black"
                      size={isMobile ? '1.25em' : '2em'}
                      margin="1em 0 0 0"
                      style={{ fontFamily: 'Roboto Mono' }}
                    >
                      Trainingszeiten:
                    </Heading>
                  </Box>

                  <Box
                    width="100%"
                    direction={isMobile ? 'column' : 'row'}
                    margin={isMobile ? '0' : '1em 0 0 0'}
                    justify="between"
                  >
                    {position.days.map((day: string, index: number) => {
                      return (
                        <Box
                          key={'TrainingTime-' + index}
                          className="cardWithShadow"
                          width={isMobile ? '100%' : '45%'}
                          height={isMobile ? '250px' : '400px'}
                          margin={isMobile ? '1em 0' : '0'}
                          justify="center"
                          align="center"
                        >
                          <Box width="90%" height="90%" justify="center">
                            <Box width="100%" margin="0 0 2em 0" background="white">
                              <Text
                                size={isMobile ? '1.5em' : '2.5em'}
                                style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                              >
                                {position.titles[index]}
                              </Text>
                              <Box width={isMobile ? '90%' : '70%'} margin="0.5em 0">
                                <Text
                                  size={isMobile ? '0.75em' : '1em'}
                                  style={{ fontFamily: 'Roboto Mono' }}
                                >
                                  {position.descriptions[index]}
                                </Text>
                              </Box>
                              <Text
                                size={isMobile ? '0.6em' : '0.75em'}
                                style={{ fontFamily: 'Roboto Mono' }}
                              >
                                {position.trainers[index]}
                              </Text>
                            </Box>
                            <Text
                              color="black"
                              size={isMobile ? '0.85em' : '1.25em'}
                              textAlign="end"
                              style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                            >
                              {day}
                            </Text>
                            <Text
                              color="black"
                              size={isMobile ? '0.75em' : '1em'}
                              textAlign="end"
                              style={{ fontFamily: 'Roboto Mono' }}
                            >
                              {position.times[index]}
                            </Text>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
                <Box
                  width="100%"
                  height={isMobile ? '300px' : '500px'}
                  margin={isMobile ? '2em auto 0 auto' : '4em auto 0 auto'}
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

export default Position
