import React from 'react'
import { Button as GrommetButton, Box, Text, ResponsiveContext } from 'grommet'

// Theme
import theme from '../styles/theme'

// ===============================================
interface Props {
  onClick?: any
  fontSize?: string
  textAlign?: 'start' | 'center' | 'end'
  link?: string | null
}

// ===============================================
const Button: React.FC<Props> = ({
  children,
  onClick,
  fontSize,
  link = null,
  textAlign = 'start'
}) => (
  <ResponsiveContext.Consumer>
    {size => {
      const isMobile = size.includes('small')

      const button = {
        backgroundColor: theme.global.colors.red,
        display: 'block',
        transition: 'all 0.2s'
      }

      const text = {
        fontFamily: 'Roboto Mono',
        transition: 'all 1s',
        zIndex: 2
      }

      return (
        <GrommetButton
          className="relative whiteShadow noFlickr"
          style={button}
          margin="0"
          onClick={onClick}
          target={link ? '_blank' : undefined}
          href={link ? link : undefined}
        >
          <Box className="noFlickr" justify="center" height="fit-content" width="100%">
            <Text
              className="noFlickr"
              size={fontSize ? fontSize : isMobile ? '0.8em' : '1.25em'}
              weight="bold"
              textAlign={textAlign}
              color={theme.global.colors.white}
              style={{ padding: isMobile ? '1em' : '0.75em', ...text }}
            >
              {children}
            </Text>
          </Box>
        </GrommetButton>
      )
    }}
  </ResponsiveContext.Consumer>
)

export default Button
