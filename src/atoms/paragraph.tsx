import React from 'react'
import { Text } from 'grommet'

// ===============================================
interface Props {
  size?: string
  textAlign?: 'start' | 'end' | 'center'
}

// ===============================================
const Paragraph: React.FC<Props> = ({ children, size = '1em', textAlign = 'start' }) => {
  return (
    <Text
      size={size}
      textAlign={textAlign}
      style={{
        lineHeight: 2,
        letterSpacing: '0.01rem',
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: '1.5em',
        marginBottom: '0.5em'
      }}
    >
      {children}
    </Text>
  )
}

export default Paragraph
