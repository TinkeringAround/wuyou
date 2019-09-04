import React, { useState, FC } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// Types:
import { TImage } from '../../types'

// Atoms:
import Headline from '../../atoms/headline'

// Custom Components:
import Image from '../../components/image'

// Utility:
import { shuffle } from '../../utility'

// ===============================================
interface Props {
  trainers: Array<TImage>
}

// ===============================================
const Trainerteam: FC<Props> = ({ trainers }) => {
  const [shuffledTrainers] = useState<Array<TImage>>(shuffle(Array.from(trainers)))

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <Box justify="center" height="100%" width="100%" align="center">
            <Box width={isMobile ? '90%' : '85%'} height="25%" margin="0 auto">
              <Headline alignEnd={false} title="Unsere Trainer." />
            </Box>
            <Box
              height={isMobile ? '90%' : '80%'}
              width={isMobile ? '90%' : '85%'}
              justify="between"
              align="center"
              margin="0 auto"
            >
              {shuffledTrainers != null && shuffledTrainers.length > 0 && (
                <Box
                  height="90%"
                  width="100%"
                  direction={isMobile ? 'column' : 'row'}
                  align="center"
                >
                  <Image image={shuffledTrainers[0]} mode={isMobile ? 6 : 2} />
                  <Box width={isMobile ? '100%' : '50%'} height="100%" direction="row" wrap>
                    <Image image={shuffledTrainers[1]} mode={isMobile ? 4 : 1} small />
                    <Image image={shuffledTrainers[2]} mode={isMobile ? 4 : 1} small />
                    <Image image={shuffledTrainers[3]} mode={isMobile ? 4 : 1} small />
                    <Image image={shuffledTrainers[4]} mode={isMobile ? 4 : 1} small />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Trainerteam
