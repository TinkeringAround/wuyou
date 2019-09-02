import React, { useState, FC } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// Types:
import { TTrainer } from '../../types'

// Atoms:
import Headline from '../../atoms/headline'

// Custom Components:
import Image from '../../components/image'

// Utility:
import { shuffle } from '../../utility'

// ===============================================
interface Props {
  trainers: Array<TTrainer>
}

// ===============================================
const Trainerteam: FC<Props> = ({ trainers }) => {
  const [shuffledTrainers] = useState<Array<TTrainer>>(shuffle(Array.from(trainers)))

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <>
            {isMobile ? (
              <Box width="100%" height="100vh">
                <Box width="90%" height="30%" margin="auto">
                  <Headline alignEnd={false} title="Unsere Trainer." />
                </Box>
                <Box width="90%" height="90%" margin="auto">
                  <Box width="100%" height="100%" pad="10px 0" direction="row" align="center" wrap>
                    {shuffledTrainers != null && shuffledTrainers.length > 0 && (
                      <>
                        <Image data={shuffledTrainers[0]} mode={5} />
                        <Box height="50%" width="100%" direction="row" wrap>
                          <Image data={shuffledTrainers[1]} mode={4} />
                          <Image data={shuffledTrainers[2]} mode={4} />
                          <Image data={shuffledTrainers[3]} mode={4} />
                          <Image data={shuffledTrainers[4]} mode={4} />
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box justify="center" height="100%" width="100%" align="center">
                <Box width="85%" height="100%" margin="auto">
                  <Headline alignEnd={false} title="Unsere Trainer." />
                  <Box height="70%" width="100%" justify="between" align="center" margin="1.5em 0">
                    {shuffledTrainers != null && shuffledTrainers.length > 0 && (
                      <>
                        <Box height="90%" width="100%" direction="row" align="center">
                          <Image data={shuffledTrainers[0]} mode={2} />
                          <Box width="50%" height="100%" direction="row" wrap>
                            <Image data={shuffledTrainers[1]} mode={1} />
                            <Image data={shuffledTrainers[2]} mode={1} />
                            <Image data={shuffledTrainers[3]} mode={1} />
                            <Image data={shuffledTrainers[4]} mode={1} />
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Trainerteam
