import React, { useContext, useState, useEffect } from 'react'
import { Box } from 'grommet'

// Types
import { TImage, TMedia } from '../../types'

// Context:
import context from '../../contentful-context'

// Custom Components
import Image from '../../components/image'
import LoadingSpinner from '../../components/loadingspinner'
import Spacer from '../../components/spacer'

// Utility:
import { shuffle } from '../../utility'

// ===============================================
interface Props {
  isMobile: boolean
}

// ===============================================
const Gallery: React.FC<Props> = ({ isMobile }) => {
  const { contentful } = useContext(context)
  const [media, setMedia] = useState<Array<TMedia>>([])
  const [blocks, setBlocks] = useState<Array<any>>([])

  // Fetch Images
  useEffect(() => {
    if (media.length === 0 && contentful) {
      contentful
        .getEntries({
          content_type: 'media',
          include: 2
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            const media: Array<TMedia> = results.items.map((item: any) => {
              return {
                format: item.fields['format'],
                image: {
                  name: item.fields['name'],
                  description: [item.fields['description']],
                  url: 'https:' + item.fields['image'].fields['file'].url
                }
              }
            })
            setMedia(media)
          }
        })
        .catch((error: any) => console.log(error))
    }
  })

  // Create displayed Blocks
  useEffect(() => {
    if (blocks.length === 0 && media.length > 0) {
      // Tmps
      let hoch: Array<TImage> = []
      let quer: Array<TImage> = []

      // Sortiere Blocks
      media.forEach((media: TMedia) => {
        if (media.format === 'Hoch') hoch.push(media.image)
        else if (media.format === 'Quer') quer.push(media.image)
      })

      let displayBlocks = hoch.map((item: TImage, index: number) => (
        <Image
          key={'Hoch' + item + index}
          image={item}
          mode={isMobile ? 6 : 2}
          fullsizeable={!isMobile}
        />
      ))

      quer = shuffle(quer)
      let querModules = []
      if (quer.length <= 4 || isMobile) {
        quer.forEach((item: TImage, index: number) =>
          querModules.push(
            <Image
              key={'Quer' + item + index}
              image={item}
              mode={isMobile ? 5 : 3}
              fullsizeable={!isMobile}
            />
          )
        )
      } else {
        // nimm immer 4 und cluster zu einem Block
        const quads = (quer.length - (quer.length % 4)) / 4
        for (let index = 0; index < quads; index++)
          querModules.push(
            <Box width="100%" height="50%" wrap>
              <Image
                key={'Quer' + index * 4}
                image={quer[index * 4]}
                fullsizeable={!isMobile}
                mode={isMobile ? 4 : 1}
                small
              />
              <Image
                key={'Quer' + (index * 4 + 1)}
                image={quer[index * 4 + 1]}
                fullsizeable={!isMobile}
                mode={isMobile ? 4 : 1}
                small
              />
              <Image
                key={'Quer' + (index * 4 + 2)}
                image={quer[index * 4 + 2]}
                fullsizeable={!isMobile}
                mode={isMobile ? 4 : 1}
                small
              />
              <Image
                key={'Quer' + (index * 4 + 3)}
                image={quer[index * 4 + 3]}
                fullsizeable={!isMobile}
                mode={isMobile ? 4 : 1}
                small
              />
            </Box>
          )

        // restliche jeweils als einzelner Block
        if (quer.length % 4 > 0) {
          for (let index = 0; index < quer.length % 4; index++)
            querModules.push(
              <Image
                key={'Quer' + (quads * 4 + index)}
                image={quer[quads * 4 + index]}
                fullsizeable={!isMobile}
                mode={isMobile ? 5 : 3}
              />
            )
        }
      }

      // mach Blöcke aus den querModules
      for (let index = 0; index < (querModules.length - (querModules.length % 2)) / 2; index++) {
        displayBlocks.push(
          <Box
            key={'Row' + index}
            width={isMobile ? '100%' : '50%'}
            height="100%"
            direction="row"
            wrap
          >
            {querModules[index * 2]}
            {querModules[index * 2 + 1]}
          </Box>
        )
      }

      // Shuffle DisplayBlocks
      displayBlocks = shuffle(displayBlocks)

      // wenn QuerModules ungerade ist -> ein Block ist alleine, soll der letzte sein
      if (querModules.length % 2 === 1) {
        displayBlocks.push(
          <Box key="last" width={isMobile ? '100%' : '50%'} height="100%" direction="row" wrap>
            {querModules[querModules.length - 1]}
          </Box>
        )
      }
      if (isMobile) displayBlocks = displayBlocks.slice(0, displayBlocks.length / 2)
      setBlocks(displayBlocks)
    }
  }, [media])

  return (
    <>
      {blocks.length === 0 ? (
        <Box width="100%" height="50vh">
          <LoadingSpinner size={isMobile ? 'medium' : 'normal'} />
        </Box>
      ) : (
        <>
          {isMobile && <Spacer height="5em" />}
          <Box width="100%" height="100%">
            <Box width={isMobile ? '95%' : '80%'} height="80%" margin="auto" direction="row" wrap>
              {blocks}
            </Box>
          </Box>
          <Spacer height="5em" />
        </>
      )}
    </>
  )
}

export default Gallery
