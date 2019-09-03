import React, { useState } from 'react'
import { Box, Text, ResponsiveContext } from 'grommet'

// ===============================================
interface Props {
  goto: any
  count: number
  currentSlide: number
}

// ===============================================
const Pagination: React.FC<Props> = ({ goto, count, currentSlide }) => {
  const [paginations] = useState<Array<number>>(
    (): Array<number> => {
      const array: Array<number> = []
      for (let i = 0; i < count; i++) {
        array.push(i)
      }
      return array
    }
  )

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <Box width="100%" height={isMobile ? '50px' : '100px'} justify="center" align="center">
            <Box width="60%" height="100%" justify="center" align="center" direction="row">
              {paginations.map((number: number, index: number) => (
                <Text
                  key={'Pagination-' + number}
                  className="icon"
                  size={currentSlide === number ? '2em' : '1.5em'}
                  margin={number !== count - 1 ? '0 0.5em 0 0' : '0'}
                  color={currentSlide === number ? 'black' : 'lightgrey'}
                  style={{ fontFamily: 'Roboto Mono', cursor: 'pointer' }}
                  onClick={() => goto(number)}
                >
                  {'•'}
                </Text>
              ))}
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Pagination
