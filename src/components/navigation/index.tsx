import React, {FC, useState} from 'react'
import {Box, ResponsiveContext, Image, Heading} from 'grommet'

// Atoms
import {menu} from '../../atoms/icons'

// Partials
import Mobile from './mobile'
import Desktop from './desktop'

// Assets
import * as logo from '../../assets/logo.json'

// Pages
const pages = ['Training', 'Meinungen', 'Gallerie', 'Anfahrt', 'Kontakt']
const ids = ['training', 'opinions', 'gallery', 'position', 'contact']

// ===============================================
interface Props {
    scrolled: boolean
}

// ===============================================
const Navigation: FC<Props> = ({scrolled}) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <ResponsiveContext.Consumer>
            {size => {
                const isMobile = size.includes('small')
                const isMedium = size.includes('medium')
                const isMiddle = size.includes('middle')

                const title = scrolled
                    ? isMedium
                        ? '1.3em'
                        : '1.5em'
                    : isMedium
                        ? '1.5em'
                        : isMiddle
                            ? '1.675em'
                            : '1.75em'
                const subtitle = scrolled
                    ? isMedium
                        ? '0.7em'
                        : '1em'
                    : isMedium
                        ? '0.8em'
                        : isMiddle
                            ? '1em'
                            : '1.25em'
                const icon = '90%'

                return (
                    <>
                        <Box
                            className="fixed animation"
                            width="100%"
                            height={isMobile ? (scrolled ? '60px' : '80px') : scrolled ? '80px' : '100px'}
                            background={scrolled ? 'white' : 'transparent'}
                            direction="row"
                            justify={isMobile ? 'between' : 'start'}
                            align="center"
                            style={{
                                boxShadow: scrolled ? '0px 5px 5px 5px rgba(0, 0, 0, 0.15)' : 'none',
                                zIndex: 10
                            }}
                        >
                            <Box
                                className="zoomOnHover noFlickr"
                                width={isMobile ? (scrolled ? '25%' : '30%') : '10%'}
                                height="80%"
                                justify="center"
                                align="center"
                                style={{boxShadow: "none"}}
                                onClick={() => {
                                    const home = document.getElementById('home')
                                    if (home) home.scrollIntoView({block: 'end', behavior: 'smooth'})
                                }}
                            >
                                <Box width="90%" height="90%">
                                    <Image
                                        className="animation"
                                        fit="contain"
                                        alt={logo.title}
                                        src={scrolled ? logo.url : logo.urlInverse}
                                    />
                                </Box>
                            </Box>

                            {!isMobile && (
                                <Box width="40%" height="80%" justify="end" pad={isMedium ? '0.25em 0.25em' : '0'}>
                                    <Heading
                                        className="animation"
                                        level="1"
                                        size={title}
                                        color={scrolled ? 'black' : 'white'}
                                        style={{fontWeight: 600}}
                                        margin="0"
                                    >
                                        Wushu. Taiji. Fitness.
                                    </Heading>
                                    <Heading
                                        className="animation"
                                        level="2"
                                        size={subtitle}
                                        color={scrolled ? 'dark' : 'lightGrey'}
                                        style={{fontFamily: 'Roboto Mono'}}
                                        margin={scrolled ? '0 0 0.175em' : '0 0 0.25em'}
                                    >
                                        Chinesische Kampfkunst in Wolfsburg.
                                    </Heading>
                                </Box>
                            )}
                            <Box
                                width={isMobile ? (scrolled ? '70%' : '60%') : '50%'}
                                height="80%"
                                justify={isMobile ? 'center' : 'end'}
                                align="end"
                            >
                                {isMobile && (
                                    <Box height="50%" width="20%" margin="0 1em" onClick={() => setOpen(true)}>
                                        <svg
                                            width={icon}
                                            height={icon}
                                            viewBox={menu.viewport}
                                            style={{fill: scrolled ? 'black' : 'white'}}
                                        >
                                            {menu.path}
                                        </svg>
                                    </Box>
                                )}
                                {!isMobile && (
                                    <Desktop
                                        isMedium={isMedium}
                                        scrolled={scrolled}
                                        close={() => setOpen(false)}
                                        pages={pages}
                                        ids={ids}
                                    />
                                )}
                            </Box>
                        </Box>

                        {/* Portal */}
                        <Mobile open={open} close={() => setOpen(false)} pages={pages} ids={ids}/>
                    </>
                )
            }}
        </ResponsiveContext.Consumer>
    )
}

export default Navigation
