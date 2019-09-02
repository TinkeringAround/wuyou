import React, { FC } from 'react'
import { Box } from 'grommet'

// ===============================================
interface Props {}

// ===============================================
const Navigation: FC<Props> = () => {
  return (
    <Box
      width="100%"
      height="100px"
      background="white"
      style={{
        position: 'sticky',
        top: 0,
        boxShadow: '0px 5px 15px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 10
      }}
    ></Box>
  )
}

export default Navigation
