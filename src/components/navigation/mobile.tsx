import React, { FC } from 'react'
import { Text, Box } from 'grommet'
import { Portal } from 'react-portal'
import posed, { PoseGroup } from 'react-pose'

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

// ===============================================
interface Props {
  open: boolean
  close: any
  pages: Array<string>
  ids: Array<string>
}

// ===============================================
const Mobile: FC<Props> = ({ open, close, pages, ids }) => {
  const overlay = {
    left: 0,
    top: 0,
    zIndex: 800,

    width: '100vw',
    height: window.innerHeight,

    backgroundColor: 'white'
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
    <Portal>
      <aside>
        <PoseGroup preEnterPose="exit">
          {open && (
            <Overlay key="Overlay" className="fixed" style={overlay}>
              <Box height="100%" justify="end">
                <Box className="absolute" style={{ top: '1.5em', right: '1.5em' }} onClick={close}>
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
                          close()
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
  )
}

export default Mobile
