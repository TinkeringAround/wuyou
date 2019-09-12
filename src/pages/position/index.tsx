import React, { FC } from 'react'
import { Box, ResponsiveContext, Heading, Text } from 'grommet'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Atoms
import Headline from '../../atoms/headline'

// Components
import Paragraph from '../../atoms/paragraph'
import Spacer from '../../components/spacer'

// Assets
import * as position from '../../assets/position.json'

// ===============================================
const Position: FC = () => (
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
                margin={isMobile ? '0 auto 1em auto' : '0 auto 3em auto'}
              >
                <Headline alignEnd={false} title="Anfahrt und Zeiten." />
              </Box>
              <Box width={isMobile ? '90%' : '85%'} margin="0 auto 1em auto">
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
                  className="relative"
                  href={position.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                >
                  <Box
                    className="absolute"
                    background={isMobile ? 'rgba(255,255,255,0.9)' : 'white'}
                    pad="1.5em"
                    width={isMobile ? '80%' : 'auto'}
                    style={{
                      zIndex: 5,
                      bottom: isMobile ? '15%' : '10%',
                      right: isMobile ? '10%' : '5%'
                    }}
                  >
                    <Heading
                      level="3"
                      color="black"
                      size={isMobile ? '1.25em' : '2em'}
                      margin="0"
                      style={{ fontFamily: 'Roboto Mono' }}
                    >
                      Trainingsort
                    </Heading>
                    {position.address.map((address: string, index: number) => (
                      <Paragraph
                        key={'Position-' + index}
                        margin="0.2em 0 0 0"
                        noPadding
                        size={isMobile ? '0.7em' : '0.9em'}
                      >
                        {address}
                      </Paragraph>
                    ))}
                  </Box>
                  <LazyLoadImage
                    className="whiteShadow"
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

export default Position
