import React, {useState, useEffect, Fragment} from 'react'
import {Box, Text} from 'grommet'
import {LazyLoadImage} from 'react-lazy-load-image-component'

// Styles
import '../../../node_modules/react-lazy-load-image-component/src/effects/opacity.css'
import '../../../node_modules/react-lazy-load-image-component/src/effects/blur.css'

// Atoms
import {Simple} from '../../atoms/animation'
import {TImage} from '../../types'

// Custom Compontents
import Dialog from '../dialog'

/*
Übersicht Modi:

Desktop
1: w50, h50
2: w50, h100
3: w100, h50

Mobile
4: w50, h50
5: w100, h50
6: w100, h100
*/

// ===============================================
interface Props {
    mode: 1 | 2 | 3 | 4 | 5 | 6
    image: TImage
    fullsizeable?: boolean
    small?: boolean
    face?: boolean
}

// ===============================================
const Image: React.FC<Props> = ({
                                    mode,
                                    fullsizeable = false,
                                    image,
                                    small = false,
                                    face = false
                                }) => {
    const {name, description, addition, url} = image
    const [hover, setHover] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    // Responsive Attributes
    const isMobile = mode >= 4
    const wide = mode >= 5 || mode === 3
    const high = mode === 2 || mode === 6

    // #region Styles
    const wrapper = {
        width: wide ? '100%' : '50%',
        height: high ? '100%' : '50%',
        transition: 'all 0.2s',
        cursor: fullsizeable ? 'pointer' : 'unset'
    }

    const overlay = {
        top: '0',
        left: '0',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',

        display: 'flex',
        flex: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

    const title = {
        width: '85%',
        fontSize: isMobile ? (small ? '0.7em' : '1em') : small ? '0.8em' : '1.25em',
        lineHeight: 1.25,
        fontFamily: 'Roboto Mono'
    }

    const line = {
        width: '85%',
        fontWeight: 600,
        fontSize: isMobile ? (small ? '0.45em' : '0.65em') : small ? '0.6em' : '1em',
        lineHeight: 1.5
    }
    // #endregion

    // Event Handlers
    useEffect(() => {
        setHover(false)
    }, [image])

    return (
        <Fragment>
            <Box className="relative" pad={isMobile ? '5px' : '10px'} style={wrapper}>
                <Simple
                    className="absolute"
                    initialPose="hidden"
                    pose={hover ? 'visible' : 'hidden'}
                    onTouchStart={() => setHover(!hover)}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={fullsizeable ? () => setShowDialog(true) : undefined}
                    style={overlay}
                >
                    <Box width="100%" height="100%" direction="column" justify="center" align="center">
                        <Text textAlign="start" weight="bold" color="dark" style={title}>
                            {name + (addition ? ',' + addition : '')}
                        </Text>
                        {description != null &&
                        description.map((entry: string, index: number) => (
                            <Text
                                key={'Description-' + entry + index}
                                margin="0 auto"
                                textAlign="start"
                                color="dark"
                                style={line}
                            >
                                {entry}
                            </Text>
                        ))}
                    </Box>
                </Simple>
                <LazyLoadImage
                    alt={name}
                    effect="opacity"
                    src={
                        url + '?' + (small || isMobile ? 'q=75&' : '') + (high || face ? 'f=face&fit=fill' : '')
                    }
                    scrollPosition={false}
                    visibleByDefault={false}
                    width="100%"
                    height="100%"
                    style={{objectFit: 'cover'}}
                />
            </Box>
            {fullsizeable && (
                <Dialog showDialog={showDialog} closeDialog={() => setShowDialog(false)}>
                    <Box width="100%" height="100%" justify="center" align="center">
                        <LazyLoadImage
                            alt={name}
                            effect="blur"
                            src={url}
                            scrollPosition={false}
                            visibleByDefault={false}
                            width="100%"
                            height="100%"
                            style={{objectFit: 'contain'}}
                        />
                    </Box>
                </Dialog>
            )}
        </Fragment>
    )
}

export default Image
