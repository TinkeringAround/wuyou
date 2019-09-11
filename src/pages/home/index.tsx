import React, { FC } from 'react'
import { Box, Text, ResponsiveContext } from 'grommet'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Atoms
import Headline from '../../atoms/headline'

// Assets
import team from '../../assets/images/team.jpg'
import teamMobile from '../../assets/images/teamMobile.jpg'

// ===============================================
const Home: FC = () => {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const isMedium = size.includes('medium')

        return (
          <>
            {isMobile && (
              <Box
                id="home"
                width="90%"
                pad="0.25em"
                margin="2em auto"
                background="rgba(255,255,255,0.9)"
              >
                <Headline tSize="3em" title="Wuyou e.V." />
                <Text size="1em" margin="1em 0 0 6px">
                  In familiärer Atmosphäre chinesische Kampfkunst erlernen und trainieren!
                </Text>
                <Text size="1em" margin="0.25em 0 0 6px">
                  Schaut einfach mal bei uns beim Training vorbei!
                </Text>
              </Box>
            )}
            <Box
              id={isMobile ? '' : 'home'}
              width="100%"
              height={isMobile ? '350px' : window.innerHeight - 100 + 'px'}
              justify="center"
              align="center"
              margin={isMobile ? '0 0 2em 0' : '0'}
            >
              <Box className="relative" width="100%" height="100%">
                {!isMobile && (
                  <Box
                    className="absolute"
                    width={isMedium ? '80%' : '70%'}
                    pad="2em"
                    style={{ bottom: '2em', left: isMobile ? '1em' : '2em' }}
                    background="rgba(255,255,255,0.9)"
                  >
                    <Headline tSize={isMedium ? '5em' : '7em'} title="Wuyou e.V." />
                    <Box width={isMedium ? '100%' : '90%'} margin="1em 0">
                      <Text size={isMedium ? '1.1em' : '1.5em'} margin="0.25em 0 0 6px">
                        In familiärer Atmosphäre chinesische Kampfkunst erlernen und trainieren!
                      </Text>
                      <Text size={isMedium ? '1.1em' : '1.5em'} margin="0.25em 0 0 6px">
                        Schaut einfach mal bei uns beim Training vorbei!
                      </Text>
                    </Box>
                  </Box>
                )}
                <LazyLoadImage
                  alt="Wuyou e.V. - Das Team"
                  effect="opacity"
                  src={isMobile ? teamMobile : team}
                  scrollPosition={false}
                  visibleByDefault={false}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Home
