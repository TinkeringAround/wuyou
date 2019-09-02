import React from 'react'
import { Text } from 'grommet'

// ===============================================
interface Props {}

// ===============================================
const Paragraph: React.FC<Props> = ({ children }) => {
  return (
    <Text
      size="1em"
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
