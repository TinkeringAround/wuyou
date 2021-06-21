import React, {FC} from 'react'
import {Box, Text, Heading} from 'grommet'
import {LazyLoadImage} from 'react-lazy-load-image-component'

// Hooks
import {useBreakpoint} from "../../hooks/useBreakpoint";

// Assets
import * as home from '../../assets/home.json'

// ===============================================
const Home: FC = () => {
    const {isMobile, isMiddle, isMedium} = useBreakpoint();

    return (
        <Box
            id="home"
            width="100%"
            height={window.innerHeight + 'px'}
            justify="center"
            align="center"
            margin="0"
        >
            <Box className="relative" width="100%" height="100%">
                <Box
                    className="absolute"
                    width={isMobile ? '100%' : isMedium ? '80%' : '70%'}
                    pad={isMobile ? '1em' : '2em'}
                    style={{
                        bottom: isMobile ? '1em' : '2em',
                        left: isMobile ? '0' : '2em',
                        zIndex: 5
                    }}
                >
                    <Box width={isMedium ? '100%' : '90%'} margin="1em 0">
                        <Heading
                            level="1"
                            size={isMobile ? '3em' : isMedium ? '4em' : isMiddle ? '6.5em' : '8em'}
                            color="white"
                            margin="0"
                        >
                            Wuyou e.V.
                        </Heading>
                        <Text
                            size={isMobile ? '0.85em' : isMedium ? '1.1em' : isMiddle ? '1.3em' : '1.5em'}
                            margin="0.25em 0 0 6px"
                            color="white"
                            style={{fontWeight: isMobile ? 100 : 600}}
                        >
                            In familiärer Atmosphäre chinesische Kampfkunst erlernen und trainieren!
                        </Text>
                        <Text
                            size={isMobile ? '0.85em' : isMedium ? '1.1em' : isMiddle ? '1.3em' : '1.5em'}
                            margin="0.25em 0 0 6px"
                            color="white"
                            style={{fontWeight: isMobile ? 100 : 600}}
                        >
                            Schaut einfach mal bei uns beim Training vorbei!
                        </Text>
                    </Box>
                </Box>
                <LazyLoadImage
                    alt="Wuyou e.V. - Das Team"
                    effect="opacity"
                    src={
                        (isMobile ? home.mobile : home.desktop) +
                        `?fm=jpg&fl=progressive&fit=thumb&w=${window.innerWidth}&h=${window.innerHeight}`
                    }
                    scrollPosition={false}
                    visibleByDefault={false}
                    width="100%"
                    height="100%"
                    style={{objectFit: 'cover'}}
                />
            </Box>
        </Box>
    )
}

export default Home
