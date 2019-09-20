import React, { FC } from 'react'
import { Box, Heading, ResponsiveContext } from 'grommet'

// ===============================================
interface Props {
  alignEnd?: boolean
  title: string
  subtitle?: string
  tSize?: string | null
  sSize?: string | null
}

// ===============================================
const Headline: FC<Props> = ({ alignEnd = false, title, subtitle, tSize = null, sSize = null }) => (
  <ResponsiveContext.Consumer>
    {size => {
      const isMobile = size.includes('small')
      const isMedium = size.includes('medium')

      const titleSize = tSize ? tSize : isMobile ? '2.5em' : '5em'
      const subtitleSize = sSize ? sSize : isMobile ? '1em' : isMedium ? '1.25em' : '1.75em'

      return (
        <Box className="noFlickr" margin="0.75em 0 0 4px" align={alignEnd ? 'end' : 'start'}>
          <Heading
            className="noFlickr"
            level="1"
            margin="0"
            color="black"
            size={titleSize}
            textAlign={alignEnd ? 'end' : 'start'}
            style={{ paddingRight: isMobile || alignEnd ? '0px' : '20px', lineHeight: 1 }}
          >
            {title}
          </Heading>
          {subtitle && subtitle !== '' && (
            <Heading className="noFlickr" level="2" color="dark" margin="0" size={subtitleSize}>
              {subtitle}
            </Heading>
          )}
          <Box
            className="noFlickr"
            width={isMobile ? '80%' : '50%'}
            height="1.25em"
            background="red"
            margin="1em 0 0 0"
          ></Box>
        </Box>
      )
    }}
  </ResponsiveContext.Consumer>
)

export default Headline
