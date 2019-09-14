import React, { useState } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// ===============================================
interface Props {
  goto: any
  count: number
  currentSlide: number
}

// ===============================================
const Pagination: React.FC<Props> = ({ goto, count, currentSlide }) => {
  const [pagination] = useState<Array<number>>(
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
              {pagination.map((number: number) => (
                <Box
                  key={'Pagination-' + number}
                  className="zoomOnHover"
                  height="10px"
                  width="30px"
                  margin="0 0.5em"
                  background={currentSlide === number ? 'black' : 'lightgrey'}
                  style={{ fontFamily: 'Roboto Mono', cursor: 'pointer' }}
                  onClick={() => goto(number)}
                ></Box>
              ))}
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Pagination

/*<Text
                  key={'Pagination-' + number}
                  className="icon"
                  size={currentSlide === number ? '2em' : '1.5em'}
                  margin={number !== count - 1 ? '0 0.5em 0 0' : '0'}
                  color={currentSlide === number ? 'black' : 'lightgrey'}
                  style={{ fontFamily: 'Roboto Mono', cursor: 'pointer' }}
                  onClick={() => goto(number)}
                >
                  {'•'}
                </Text>*/
