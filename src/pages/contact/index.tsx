import React, { useState, useEffect, useContext } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// Types:
import { TPosition } from '../../types'

// Context
import context from '../../contentful-context'

// Atoms
import Headline from '../../atoms/headline'

// ===============================================
interface Props {}

// ===============================================
const Contact: React.FC<Props> = () => {
  const { contentful } = useContext(context)
  const [position, setPosition] = useState<TPosition | null>(null)

  // Life Cycle Methods
  useEffect(() => {
    if (position == null) {
      contentful
        .getEntries({
          content_type: 'position',
          include: 2
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            setPosition({
              address: results.items[0].fields['address'],
              days: results.items[0].fields['days'],
              descriptions: results.items[0].fields['description'],
              times: results.items[0].fields['time'],
              titles: results.items[0].fields['title'],
              trainers: results.items[0].fields['trainer'],
              url: results.items[0].fields['link'],
              map: 'https:' + results.items[0].fields['map'].fields['file'].url,
              mapMobile: 'https:' + results.items[0].fields['mapMobile'].fields['file'].url
            })
          }
        })
        .catch((error: any) => console.log('Position:', error))
    }
  }, [contentful])

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <>
            {position && (
              <>
                <Box justify="center" height="100%" width="100%" align="center">
                  <Box
                    width={isMobile ? '90%' : '85%'}
                    height={isMobile ? '30%' : '20%'}
                    margin="0 auto"
                  >
                    <Headline alignEnd={false} title="Anfahrt und Trainingszeiten." />
                  </Box>
                  <Box
                    height={isMobile ? '90%' : '80%'}
                    width={isMobile ? '90%' : '85%'}
                    justify="between"
                    align="center"
                    margin="0 auto"
                  ></Box>
                </Box>
              </>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Contact
