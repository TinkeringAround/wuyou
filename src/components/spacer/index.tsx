import React, {FC} from 'react'
import {Box} from 'grommet'

// ===============================================
interface Props {
    height?: string
    id?: string
}

// ===============================================
const Spacer: FC<Props> = ({height = '50px', id = undefined}) => (
    <Box id={id} width="100%" height={height}/>
)

export default Spacer
