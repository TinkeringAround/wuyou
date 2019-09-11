import React, { FC, useState } from 'react'
import { Box, Text, ResponsiveContext, Image, Heading } from 'grommet'
import { Portal } from 'react-portal'
import posed, { PoseGroup } from 'react-pose'

// Atoms
import { menu } from '../../atoms/icons'

// Assets
import logo from '../../assets/images/logo.png'

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
const pages = ['Training', 'Meinungen', 'Gallerie', 'Anfahrt', 'Kontakt']
const ids = ['training', 'opinions', 'gallery', 'position', 'contact']

// ===============================================
interface Props {
  scrolled: boolean
}

// ===============================================
const Navigation: FC<Props> = ({ scrolled }) => {
  const [open, setOpen] = useState<boolean>(false)

  const overlay = {
    left: 0,
    top: 0,
    zIndex: 800,

    width: '100vw',
    height: window.innerHeight,

    backgroundColor: 'white'
  }

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const isMedium = size.includes('medium')

        const title = scrolled ? (isMedium ? '1.3em' : '1.5em') : isMedium ? '1.5em' : '1.75em'
        const subtitle = scrolled ? (isMedium ? '0.7em' : '1em') : isMedium ? '0.8em' : '1.25em'
        const icon = '90%'

        const listitem = {
          display: 'inline',
          fontSize: isMedium ? '0.8em' : '1em',
          fontWeight: 600,
          fontFamily: 'Roboto Mono',
          margin: '0 0.75em',
          cursor: 'pointer'
        }

        const number = {
          fontFamily: 'Roboto Mono',
          fontSize: '1em'
        }
        const page = {
          fontFamily: 'Roboto Mono',
          fontSize: '2em',
          fontWeight: 600
        }

        return (
          <>
            <Box
              className="sticky animation"
              width="100%"
              height={scrolled ? '80px' : '100px'}
              background="white"
              direction="row"
              align="center"
              style={{
                boxShadow: scrolled
                  ? '0px 5px 5px 5px rgba(0, 0, 0, 0.15)'
                  : '0px 5px 10px 5px rgba(0, 0, 0, 0.1)',
                zIndex: 10
              }}
            >
              <Box
                className="zoomOnHover"
                width={isMobile ? (scrolled ? '30%' : '40%') : '10%'}
                height="80%"
                onClick={() => {
                  const home = document.getElementById('home')
                  if (home) home.scrollIntoView({ block: 'end', behavior: 'smooth' })
                }}
                justify="center"
                align="center"
              >
                <Box width="90%" height="90%">
                  <Image fit="contain" src={logo} />
                </Box>
              </Box>
              {!isMobile && (
                <Box width="40%" height="80%" justify="end" pad={isMedium ? '0.25em 0.25em' : '0'}>
                  <Heading
                    className="animation"
                    level="1"
                    size={title}
                    color="black"
                    style={{ fontWeight: 600 }}
                    margin="0"
                  >
                    Wushu. Taiji. Fitness.
                  </Heading>
                  <Heading
                    className="animation"
                    level="2"
                    size={subtitle}
                    color="dark"
                    style={{ fontFamily: 'Roboto Mono' }}
                    margin="0"
                  >
                    Chinesische Kampfkunst in Wolfsburg.
                  </Heading>
                </Box>
              )}
              <Box
                width={isMobile ? (scrolled ? '70%' : '60%') : '50%'}
                height="80%"
                justify={isMobile ? 'center' : 'end'}
                align="end"
              >
                {isMobile && (
                  <Box height="50%" width="20%" margin="0 1em" onClick={() => setOpen(true)}>
                    <svg className="icon" width={icon} height={icon} viewBox={menu.viewport}>
                      {menu.path}
                    </svg>
                  </Box>
                )}
                {!isMobile && (
                  <nav>
                    <ul
                      style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                    >
                      {pages.map((page: string, index: number) => (
                        <li
                          key={'NavigationItem-' + index}
                          className="icon"
                          style={listitem}
                          onClick={() => {
                            const element = document.getElementById(ids[index])
                            if (element)
                              element.scrollIntoView({
                                block: element.id === 'home' ? 'end' : 'start',
                                behavior: 'smooth'
                              })
                            setOpen(false)
                          }}
                        >
                          {page}
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </Box>
            </Box>
            {/* Portal */}
            <Portal>
              <aside>
                <PoseGroup preEnterPose="exit">
                  {open && (
                    <Overlay key="Overlay" className="fixed" style={overlay}>
                      <Box height="100%" justify="end">
                        <Box
                          className="absolute"
                          style={{ top: '1.5em', right: '1.5em' }}
                          onClick={() => setOpen(false)}
                        >
                          <Text className="icon" color="dark" style={{ fontFamily: 'Roboto Mono' }}>
                            Schließen
                          </Text>
                        </Box>
                        <Box height="90%" justify="evenly" margin={{ bottom: '3em' }}>
                          {pages.map((link: string, index: number) => {
                            return (
                              <OverlayItem
                                key={link}
                                className="relative"
                                margin="0 0 30px 30px"
                                style={{ display: 'flex' }}
                                onClick={() => {
                                  const element = document.getElementById(ids[index])
                                  if (element)
                                    element.scrollIntoView({ block: 'start', behavior: 'smooth' })
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
              </aside>
            </Portal>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Navigation
