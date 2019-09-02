import React, { FC } from 'react'
import { Box, Heading, ResponsiveContext } from 'grommet'

// ===============================================
interface Props {
  alignEnd?: boolean
  title: string
  subtitle?: string
}

// ===============================================
const Headline: FC<Props> = ({ alignEnd = false, title, subtitle }) => (
  <ResponsiveContext.Consumer>
    {size => {
      const isMobile = size.includes('small')

      return (
        <Box margin="0.75em 0 0 4px">
          <Heading
            level="1"
            margin="0"
            size={isMobile ? '3em' : '6em'}
            textAlign={alignEnd ? 'end' : 'start'}
            style={{ paddingRight: isMobile ? '0px' : '20px', lineHeight: 1 }}
          >
            {title}
          </Heading>
          {subtitle && subtitle !== '' && (
            <Heading
              level="2"
              margin="0"
              size={isMobile ? '1em' : '2em'}
              style={{ opacity: 0.5, marginLeft: 6 }}
            >
              {subtitle}
            </Heading>
          )}
          <Box
            width={isMobile ? '80%' : '50%'}
            height="1.25em"
            background="red"
            margin={isMobile ? '1em 0 0 0' : '1em 0 0 6px'}
          ></Box>
        </Box>
      )
    }}
  </ResponsiveContext.Consumer>
)

export default Headline
