import React, { FC } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// Atoms:
import Headline from '../../atoms/headline'
import Paragraph from '../../atoms/paragraph'

// ===============================================
interface Props {
  textLeft: boolean
  title: string
  subtitle: string
  paragraph: string
}

// ===============================================
const Section: FC<Props> = ({ textLeft, title, subtitle, paragraph }) => {
  // TODO: image

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        // Styles
        const sectionLeft = isMobile
          ? {
              width: '90%',
              height: textLeft ? 'auto' : '50vh',
              margin: 'auto'
            }
          : {
              width: '45%',
              height: '85%',
              left: '3%',
              top: '7.5%'
            }

        const sectionRight = isMobile
          ? {
              width: '90%',
              height: textLeft ? '50vh' : 'auto',
              margin: '2em auto'
            }
          : {
              width: '45%',
              height: '85%',
              right: '7%',
              top: 0
            }

        // Components
        const text = (
          <Box width={isMobile ? '100%' : '90%'}>
            <Headline alignEnd={false} title={title} subtitle={subtitle} />
            <Paragraph>{paragraph}</Paragraph>
          </Box>
        )

        return (
          <Box
            className="relative"
            justify="center"
            align="center"
            width="100%"
            height={isMobile ? 'auto' : '100%'}
            direction="column"
          >
            <Box
              className={(isMobile ? '' : 'absolute ') + (textLeft ? '' : 'overlay')}
              background={textLeft ? 'transparent' : 'lightgrey'}
              align="center"
              style={sectionLeft}
            >
              {textLeft ? text : ''}
            </Box>

            <Box
              className={(isMobile ? '' : 'absolute ') + (textLeft ? 'overlay' : '')}
              background={textLeft ? 'lightgrey' : 'transparent'}
              align="end"
              style={sectionRight}
            >
              {textLeft ? '' : text}
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Section
