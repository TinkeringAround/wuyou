import React from 'react'
import { Portal } from 'react-portal'
import posed, { PoseGroup } from 'react-pose'
import { Box } from 'grommet'

// Atoms
import { Simple } from '../../atoms/animation'
import { close } from '../../atoms/icons'

// ===============================================
interface Props {
  showDialog: boolean
  closeDialog: any
  isMobile?: boolean
}

// ===============================================
const Dialog: React.FC<Props> = ({ children, showDialog, closeDialog, isMobile = false }) => {
  // Animation
  const DialogAnimation = posed.div({
    exit: {
      opacity: 0,
      bottom: isMobile ? -50 : 0
    },
    enter: {
      opacity: 1,
      bottom: isMobile ? 0 : 50
    }
  })

  // Styles
  const iconSize = '35px'

  const dialog = {
    top: 'auto',
    bottom: -50,
    left: isMobile ? 0 : '10%',
    width: isMobile ? '100%' : '80%',
    height: isMobile ? '95%' : '90%',
    zIndex: 701,

    backgroundColor: 'rgb(255,255,255)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const background = {
    left: 0,
    top: 0,
    zIndex: 700,

    width: '100vw',
    height: '100vh',

    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }

  return (
    <Portal>
      <PoseGroup preEnterPose="exit">
        {showDialog && (
          <DialogAnimation key="Dialog" className="fixed" style={dialog}>
            <Box
              width="fit-content"
              height="fit-content"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem'
              }}
              onClick={closeDialog}
            >
              <svg className="icon" width={iconSize} height={iconSize} viewBox={close.viewport}>
                {close.path}
              </svg>
            </Box>
            <Box width="90%" height="90%" margin="0" direction="column">
              {children}
            </Box>
          </DialogAnimation>
        )}
        {showDialog && (
          <Simple
            key="Background"
            className="absolute"
            onClick={closeDialog}
            style={background}
          ></Simple>
        )}
      </PoseGroup>
    </Portal>
  )
}

export default Dialog
