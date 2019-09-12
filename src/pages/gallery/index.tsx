import React, { useState, useEffect } from 'react'
import { Box } from 'grommet'

// Types
import { TImage } from '../../types'

// Custom Components
import Image from '../../components/image'
import Spacer from '../../components/spacer'

// Assets
import gallery from '../../assets/gallery.json'

// Utility:
import { shuffle } from '../../utility'

// ===============================================
interface Props {
  isMobile: boolean
}

// ===============================================
const Gallery: React.FC<Props> = ({ isMobile }) => {
  const [sections, setSections] = useState<Array<JSX.Element>>([])

  const createSections = () => {
    let newSections: Array<JSX.Element> = []
    let blocks: Array<JSX.Element> = []
    let querModules: Array<JSX.Element> = []

    // Tmps Arrays
    let hoch: Array<TImage> = []
    let quer: Array<TImage> = []

    // Sort Media
    gallery.forEach((m: any) => {
      if (m.format === 'Hoch') hoch.push(m.image)
      else if (m.format === 'Quer') quer.push(m.image)
    })

    // Desktop: Push "Hoch" elements
    if (!isMobile) {
      hoch.forEach((item: TImage, index: number) => {
        blocks.push(
          <Image key={'Hoch' + item + index} image={item} mode={2} fullsizeable={!isMobile} />
        )
      })
    }

    quer = shuffle(quer)
    if (quer.length <= 4) {
      // simple "Quer" elements as modules
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
      // take 4 "Quer" elements and cluster them as a module
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

      // the leftovers "Quer" elements as simple modules
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

    // create displayBlocks out of the "Quer" modules
    for (let index = 0; index < (querModules.length - (querModules.length % 2)) / 2; index++) {
      blocks.push(
        <Box width={isMobile ? '100%' : '50%'} height="100%" direction="row" wrap>
          {querModules[index * 2]}
          {querModules[index * 2 + 1]}
        </Box>
      )
    }

    // Shuffle DisplayBlocks
    blocks = shuffle(blocks)

    // finalize blocks in order to render them under each other as sections
    if (!isMobile) {
      for (let i = 0; i < blocks.length; i += 2) {
        newSections.push(
          <Box
            key={'Section' + i}
            width={isMobile ? '95%' : '85%'}
            height="100%"
            margin="0 auto"
            direction="row"
            wrap
          >
            {blocks[i]}
            {blocks[i + 1]}
          </Box>
        )
      }
    } else {
      for (let i = 0; i < blocks.length; i++) {
        newSections.push(
          <Box key={'Section' + i} width="95%" height="100%" margin="0 auto">
            {blocks[i]}
          </Box>
        )
      }
    }

    // on mobile, "Hoch" elements should be treated as finished sections
    if (isMobile) {
      hoch.forEach((item: TImage, index: number) => {
        newSections.push(
          <Box key={'HochSection' + item + index} width="95%" height="80%" margin="0 auto">
            <Image image={item} mode={isMobile ? 6 : 2} fullsizeable={!isMobile} />
          </Box>
        )
      })
    }

    // Shuffle Twice
    newSections = shuffle(newSections)
    newSections = shuffle(newSections)

    setSections(newSections)
  }

  // Lifecycle Methods
  useEffect(() => {
    if (gallery.length > 0 && sections.length === 0) createSections()
  })

  useEffect(() => {
    if (isMobile) createSections()
  }, [isMobile])

  return (
    <>
      {gallery.length > 0 && sections.length > 0 && (
        <>
          <Spacer id="gallery" height="5em" />
          {sections}
        </>
      )}
    </>
  )
}

export default Gallery
