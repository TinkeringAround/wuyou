import React, { FC } from 'react'
import { Box, ResponsiveContext } from 'grommet'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Atoms:
import Headline from '../../atoms/headline'
import Paragraph from '../../atoms/paragraph'

// ===============================================
interface Props {
  textLeft: boolean
  title: string
  subtitle: string
  paragraph: string
  url: string
}

// ===============================================
const Section: FC<Props> = ({ textLeft, title, subtitle, paragraph, url }) => (
  <ResponsiveContext.Consumer>
    {size => {
      const isMobile = size.includes('small')

      // Styles
      const sectionLeft = isMobile
        ? {
            width: '90%',
            height: textLeft ? 'auto' : '30vh',
            margin: 'auto'
          }
        : {
            width: textLeft ? '45%' : '40%',
            height: textLeft ? '85%' : '90%',
            left: '3%',
            bottom: '5%'
          }

      const sectionRight = isMobile
        ? {
            width: '90%',
            height: textLeft ? '30vh' : 'auto',
            margin: '2em auto'
          }
        : {
            width: textLeft ? '40%' : '45%',
            height: textLeft ? '90%' : '85%',
            right: '7%',
            top: '5%'
          }

      // Components
      const text = (
        <Box width={isMobile ? '100%' : '90%'}>
          <Headline alignEnd={!textLeft} title={title} subtitle={subtitle} />
          <Paragraph
            size={isMobile ? '0.7em' : '0.8em'}
            textAlign={textLeft ? 'start' : 'end'}
            overflow="auto"
          >
            {paragraph}
          </Paragraph>
        </Box>
      )

      const image = (
        <LazyLoadImage
          alt={title}
          effect="opacity"
          src={url}
          scrollPosition={false}
          visibleByDefault={false}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      )

      return (
        <Box
          justify="center"
          align="center"
          height={isMobile ? 'auto' : '80vh'}
          pad="2%"
          background="lightGrey"
        >
          <Box
            width="95%"
            height="95%"
            className="relative "
            direction="column"
            justify="center"
            align="center"
          >
            <Box
              className={(isMobile ? '' : 'absolute ') + (textLeft ? '' : 'overlay')}
              background="transparent"
              align="center"
              style={sectionLeft}
            >
              {textLeft ? text : image}
            </Box>

            <Box
              className={(isMobile ? '' : 'absolute ') + (textLeft ? 'overlay' : '')}
              background="transparent"
              align="end"
              style={sectionRight}
            >
              {textLeft ? image : text}
            </Box>
          </Box>
        </Box>
      )
    }}
  </ResponsiveContext.Consumer>
)

export default Section
