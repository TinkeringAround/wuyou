import React from 'react'
import { Portal } from 'react-portal'
import { PoseGroup } from 'react-pose'
import { Box } from 'grommet'

// Atoms
import { Simple } from '../../atoms/animation'
import { close } from '../../atoms/icons'

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
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 701,

    backgroundColor: 'rgb(255,255,255)',

    display: 'flex',
    flex: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <Portal>
      <PoseGroup preEnterPose="exit">
        {showDialog && (
          <Simple key="Dialog" className="absolute" style={dialog}>
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
          </Simple>
        )}
      </PoseGroup>
    </Portal>
  )
}

export default Dialog
