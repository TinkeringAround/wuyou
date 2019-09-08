import React, { FC } from 'react'
import { Box, Text, Heading, ResponsiveContext } from 'grommet'

// ===============================================
const Home: FC = () => {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <Box
            id="home"
            width="100%"
            height={window.innerHeight - 100 + 'px'}
            justify="center"
            align="center"
          >
            <Box className="relative" width="80%" height="80%" background="lightgrey">
              <Box
                className="absolute"
                width={isMobile ? '90%' : '80%'}
                style={{ top: '4em', left: isMobile ? '1em' : '3em' }}
              >
                <Heading level="1" size={isMobile ? '3em' : '8em'} margin="0">
                  Chinese Arts.
                </Heading>
                <Box width="80%">
                  <Text size={isMobile ? '1em' : '1.5em'} margin="0 0 0 0.5em">
                    In familiärer Atmosphäre chinesische Kampfkunst erlernen und trainieren! Schaut
                    einfach mal bei uns beim Training vorbei!
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Home
