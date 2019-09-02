import React from 'react'
import { Portal } from 'react-portal'
import posed, { PoseGroup } from 'react-pose'
import { Box } from 'grommet'

// Atoms
import { Simple } from '../../atoms/animation'
import { close } from '../../atoms/icons'

// ===============================================
const DialogAnimation = posed.div({
  exit: {
    opacity: 0,
    top: 0
  },
  enter: {
    opacity: 1,
    top: '5%'
  }
})

// ===============================================
interface Props {
  showDialog: boolean
  closeDialog: any
}

// ===============================================
const Dialog: React.FC<Props> = ({ children, showDialog, closeDialog }) => {
  // Styles
  const iconSize = '25px'

  const dialog = {
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
    zIndex: 701,

    backgroundColor: 'rgb(255,255,255)',

    display: 'flex',
    flex: 'row',
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
          <DialogAnimation key="Dialog" className="absolute" style={dialog}>
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
              <svg className="Icon" width={iconSize} height={iconSize} viewBox={close.viewport}>
                {close.path}
              </svg>
            </Box>
            <Box width="90%" height="90%" margin="0">
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
