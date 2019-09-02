import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import '../../../node_modules/react-lazy-load-image-component/src/effects/blur.css'

// Atoms:
import { Simple } from '../../atoms/animation'
import { TTrainer } from '../../types'

// Custom Compontents:
import Dialog from '../dialog'

// ===============================================
interface Props {
  mode: 1 | 2 | 3 | 4 | 5 | 6
  fullsizeable?: boolean
  data: TTrainer
}

/*
Desktop
1: w50, h50
2: w50, h100
3: w100, h50

Mobile
4: w50, h50
5: w100, h50
6: w100, h100
*/

// ===============================================
const Image: React.FC<Props> = ({ mode, fullsizeable = false, data }) => {
  const { name, age, description, image } = data
  const [hover, setHover] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  // Responsive Attributes
  const isMobile = mode >= 4
  const wide = mode >= 5 || mode === 3
  const high = mode === 2 || mode === 6

  // #region Styles
  const wrapper = {
    width: wide ? '100%' : '50%',
    height: high ? '100%' : '50%',
    transition: 'all 0.2s',
    transform: hover ? 'scale(1.02)' : 'none',
    cursor: fullsizeable ? 'pointer' : 'unset'
  }

  const overlay = {
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    zIndex: 1,
    width: 'calc(100% - 19px)',
    height: 'calc(100% - 19px)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',

    display: 'flex',
    flex: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

    transition: 'all 0.05s',
    transform: hover ? 'scale(1.02)' : 'none'
  }

  const title = {
    width: '85%',
    height: 'fit-content',
    fontSize: isMobile ? '0.75em' : '1em',
    margin: isMobile ? '0 auto 10px auto' : '0 auto 5px auto',
    lineHeight: 1.25,
    fontFamily: 'Roboto Mono'
  }

  const line = {
    width: '85%',
    height: 'fit-content',
    fontWeight: 600,
    fontSize: isMobile ? '0.5em' : '0.75em',
    lineHeight: 1.5
  }
  // #endregion

  // Event Handlers
  useEffect(() => {
    setHover(false)
  }, [data])

  return (
    <>
      <Box className="relative" pad="10px" style={wrapper}>
        <Simple
          className="absolute"
          initialPose="hidden"
          pose={hover ? 'visible' : 'hidden'}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={fullsizeable ? () => setShowDialog(true) : undefined}
          style={overlay}
        >
          <Box
            width="100%"
            height="100%"
            direction="column"
            justify="end"
            align="center"
            pad={{ bottom: isMobile ? '0.5em' : '1em' }}
          >
            <Text textAlign="start" weight="bold" color="grey" style={title}>
              {name + (age !== '' ? ',' + age : '')}
            </Text>
            {description != null &&
              description.map((entry: string, index: number) => (
                <Text
                  key={'Description-' + entry + index}
                  margin="0 auto"
                  textAlign="start"
                  color="grey"
                  style={line}
                >
                  {entry}
                </Text>
              ))}
          </Box>
        </Simple>
        <LazyLoadImage
          alt={name}
          effect="blur"
          src={image}
          scrollPosition={false}
          visibleByDefault={false}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      {fullsizeable && (
        <Dialog showDialog={showDialog} closeDialog={() => setShowDialog(false)}>
          <Box width="100%" height="100%" justify="center" align="center">
            <LazyLoadImage
              alt={name}
              effect="blur"
              src={image}
              scrollPosition={false}
              visibleByDefault={false}
              width="100%"
              height="100%"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Dialog>
      )}
    </>
  )
}

export default Image
