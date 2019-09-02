import React, { useState } from 'react'
import { Button as GrommetButton, Box, Text, ResponsiveContext } from 'grommet'
import posed from 'react-pose'

// Theme
import theme from '../styles/theme'

// ===============================================
const Animation = posed.div({
  hidden: { width: 0 },
  visible: {
    width: '110%',
    transition: { duration: 500 }
  }
})

const button = {
  display: 'block',
  transition: 'all 0.2s'
}

const overlay = {
  top: 0,
  left: '-5%',
  height: '100%',
  zIndex: 1,
  backgroundColor: theme.global.colors.red
}

const text = {
  fontFamily: 'Roboto Mono',
  transition: 'all 1s',
  zIndex: 2
}

// ===============================================
interface Props {
  onClick?: any
  active?: boolean
  link?: string | null
}

// ===============================================
const Button: React.FC<Props> = ({ children, onClick, active = false, link = null }) => {
  const [hover, setHover] = useState(false)

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <GrommetButton
            className="relative"
            style={button}
            margin="0"
            onClick={onClick}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Box justify="center" height="fit-content" width="fit-content">
              <Text
                size={isMobile ? '0.8em' : '1.25em'}
                weight="bold"
                color={hover || active ? theme.global.colors.white : theme.global.colors.black}
                style={{ padding: isMobile ? '1em' : '0.75em', ...text }}
              >
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ) : (
                  <>{children}</>
                )}
              </Text>
            </Box>
            <Animation
              initialPose="hidden"
              pose={hover || active ? 'visible' : 'hidden'}
              className="absolute"
              style={overlay}
            />
          </GrommetButton>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Button
