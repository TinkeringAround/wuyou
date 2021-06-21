import React from 'react'
import {Text} from 'grommet'

// ===============================================
interface Props {
    size?: string
    textAlign?: 'start' | 'end' | 'center'
    margin?: string
    noPadding?: boolean
    overflow?: 'auto' | 'hidden' | 'scroll' | 'visible'
}

// ===============================================
const Paragraph: React.FC<Props> = ({
                                        children,
                                        size = '0.9em',
                                        textAlign = 'start',
                                        margin = '1.5em 0 0.5em 0',
                                        overflow = 'visible',
                                        noPadding = false
                                    }) => (
    <Text
        className="noFlickr"
        size={size}
        textAlign={textAlign}
        color="black"
        style={{
            lineHeight: 1.8,
            letterSpacing: '0.01rem',
            paddingLeft: noPadding ? 0 : 6,
            paddingRight: noPadding ? 0 : 6,
            margin: margin,
            overflowY: overflow
        }}
    >
        {children}
    </Text>
)

export default Paragraph
