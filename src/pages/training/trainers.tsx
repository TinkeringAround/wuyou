import React, { FC, Fragment, useState } from 'react'
import { Box } from 'grommet'

// Types
import { TImage } from '../../types'

// Atoms
import Headline from '../../atoms/headline'

// Custom Components
import Image from '../../components/image'
import Spacer from '../../components/spacer'

// Utility
import { shuffle } from '../../utility'
import { useBreakpoint } from '../../hooks/useBreakpoint'

// ===============================================
interface Props {
  trainers: Array<TImage>
}

// ===============================================
const Trainerteam: FC<Props> = ({ trainers }) => {
  const { isMobile } = useBreakpoint()

  const [shuffledTrainers] = useState<Array<TImage>>(shuffle(Array.from(trainers)))

  return (
    <Fragment>
      <Spacer height={isMobile ? '3em' : '6em'} />
      <Box
        width={isMobile ? '90%' : '85%'}
        margin={isMobile ? '0 auto 1.5em auto' : '0 auto 3em auto'}
      >
        <Headline alignEnd={false} title='Unsere Trainer.' />
      </Box>
      <Box
        height={isMobile ? '90%' : '80%'}
        width={isMobile ? '90%' : '85%'}
        justify='between'
        align='center'
        margin='0 auto'
      >
        {shuffledTrainers != null && shuffledTrainers.length > 0 && (
          <Box
            height='90%'
            width='100%'
            direction='row'
            wrap={isMobile}
          >
            <Image image={shuffledTrainers[0]} mode={isMobile ? 4 : 2} small={isMobile} face />
            <Image image={shuffledTrainers[1]} mode={isMobile ? 4 : 2} small={isMobile} face />
            <Image image={shuffledTrainers[2]} mode={isMobile ? 4 : 2} small={isMobile} face />
            <Image image={shuffledTrainers[3]} mode={isMobile ? 4 : 2} small={isMobile} face />
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

export default Trainerteam
