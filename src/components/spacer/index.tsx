import React from 'react'
import { Box } from 'grommet'

// ===============================================
interface Props {
  height?: string
  id?: string
}

// ===============================================
const Spacer: React.FC<Props> = ({ height = '50px', id = undefined }) => (
  <Box id={id} width="100%" height={height}></Box>
)

export default Spacer
