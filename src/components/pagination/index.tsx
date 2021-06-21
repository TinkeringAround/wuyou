import React, {useState, FC} from 'react'
import {Box} from 'grommet'

// Hooks
import {useBreakpoint} from "../../hooks/useBreakpoint";

// ===============================================
interface Props {
    goto: any
    count: number
    currentSlide: number
}

// ===============================================
const Pagination: FC<Props> = ({goto, count, currentSlide}) => {
    const {isMobile} = useBreakpoint();

    const [pagination] = useState<Array<number>>(Array.from(Array(count).keys()))

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
                        style={{fontFamily: 'Roboto Mono', cursor: 'pointer', boxShadow: "none"}}
                        onClick={() => goto(number)}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Pagination
