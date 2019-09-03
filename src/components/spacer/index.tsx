import React from 'react'
import { Box } from 'grommet'

// ===============================================
interface Props {
  height?: string
}

// ===============================================
const Spacer: React.FC<Props> = ({ height = '50px' }) => <Box width="100%" height={height}></Box>

export default Spacer
