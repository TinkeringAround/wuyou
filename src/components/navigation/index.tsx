import React, { FC, useState } from 'react'
import { Box, Text, ResponsiveContext, Image, Heading } from 'grommet'
import { Portal } from 'react-portal'
import posed, { PoseGroup } from 'react-pose'
import { Link, animateScroll as scroll } from 'react-scroll'

// Assets
import logo from '../../assets/logo.png'

// ===============================================
const Overlay = posed.div({
  exit: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 150 },
    beforeChildren: true,
    staggerChildren: 50
  }
})

const OverlayItem = posed.div({
  exit: { opacity: 0, left: '-5%' },
  enter: { opacity: 1, left: '5%' }
})

// Pages
const pages = ['Wuyou', 'Training', 'Meinungen', 'Gallerie', 'Anfahrt', 'Kontakt']

// ===============================================
interface Props {}

// ===============================================
const Navigation: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false)

  const overlay = {
    left: 0,
    top: 0,
    zIndex: 800,

    width: '100vw',
    height: '100vh',

    backgroundColor: 'white'
  }

  const number = {
    fontFamily: 'Roboto Mono'
  }

  const page = {
    fontFamily: 'Roboto Mono'
  }

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <>
            <Box
              className="sticky"
              width="100%"
              height="100px"
              background="white"
              style={{
                boxShadow: '0px 5px 15px 5px rgba(0, 0, 0, 0.1)',
                zIndex: 10
              }}
              onClick={() => setOpen(true)}
              direction="row"
              justify="start"
              align="center"
            >
              <Box width="10%" height="80%">
                <Image fit="contain" src={logo} />
              </Box>
              <Box width="40%" height="80%" justify="end">
                <Heading level="1" color="black" size="2em" margin="0">
                  Chinese Arts. Wushu. Fitness.
                </Heading>
              </Box>
            </Box>
            <Portal>
              <PoseGroup preEnterPose="exit">
                {open && (
                  <Overlay key="Overlay" className="fixed" style={overlay}>
                    <Box height="100%" justify="end">
                      <Box height="90%" justify="around" margin={{ bottom: '3em' }}>
                        {pages.map((link: string, index: number) => {
                          return (
                            <OverlayItem
                              key={link}
                              margin="0 0 30px 30px"
                              style={{
                                display: 'flex',
                                position: 'relative'
                              }}
                              onClick={() => {
                                scroll.scrollToBottom()
                                setOpen(false)
                              }}
                            >
                              <Box>
                                <Text style={number}>{'0' + (index + 1)}</Text>
                                <Text style={page}>{link}</Text>
                              </Box>
                            </OverlayItem>
                          )
                        })}
                      </Box>
                    </Box>
                  </Overlay>
                )}
              </PoseGroup>
            </Portal>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Navigation
