import React from 'react'
import { Text } from 'grommet'

// ===============================================
interface Props {
  size?: string
  textAlign?: 'start' | 'end' | 'center'
  margin?: string
}

// ===============================================
const Paragraph: React.FC<Props> = ({
  children,
  size = '0.9em',
  textAlign = 'start',
  margin = '1.5em 0 0.5em 0'
}) => {
  return (
    <Text
      size={size}
      textAlign={textAlign}
      color="black"
      style={{
        lineHeight: 2,
        letterSpacing: '0.01rem',
        paddingLeft: 6,
        paddingRight: 6,
        margin: margin
      }}
    >
      {children}
    </Text>
  )
}

export default Paragraph
