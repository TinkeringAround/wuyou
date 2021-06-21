import React, {useState, FC, Fragment} from 'react'
import {Box, Image, Text} from 'grommet'

// Hooks
import {useBreakpoint} from "../../hooks/useBreakpoint";

// Atoms
import {email, youtube, facebook} from '../../atoms/icons'
import Button from '../../atoms/button'

// Assets
import logo from '../../assets/logo.json'
import footer from '../../assets/footer.json'
import FooterDialog from './dialog'

// Const
const MAIL_TO_WUYOU =
    'mailto:wuyou@wuyou.de?subject=Kontaktanfrage%20an%20den%20Wuyou%20e.V.&amp;body=Hallo%20liebes%20Wuyou%20Team,%0D%0A%0D%0A...'
const LINK_TO_FACEBOOK = 'https://www.facebook.com/WuyouEv/'
const LINK_TO_YOUTUBE = 'https://www.youtube.com/channel/UCcYxlWYmuqUL6l4xrq5lmnw'

// ===============================================
const Footer: FC = () => {
    const {isMobile} = useBreakpoint();

    const [dialog, setDialog] = useState<string | null>(null)

    const wrapper = '70px'
    const icon = '50%'
    const a = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fill: 'white',
        color: 'white',
        width: '100%',
        height: '100%'
    }

    return (
        <Fragment>
            <Box
                id="contact"
                width="100%"
                height="400px"
                justify="center"
                align="center"
                margin="0"
            >
                <Box
                    height="100%"
                    width={isMobile ? '100%' : '60%'}
                    justify="center"
                    align="center"
                    margin="0"
                >
                    <Box
                        height="50%"
                        justify="center"
                        align="center"
                        margin="1em 0 2em 0"
                        onClick={() => {
                            const home = document.getElementById('home')
                            if (home) home.scrollIntoView({block: 'end', behavior: 'smooth'})
                        }}
                        style={{cursor: 'pointer'}}
                    >
                        <Box height="50%">
                            <Image fit="contain" alt={logo.title} src={logo.url}/>
                        </Box>
                        <Text
                            textAlign="center"
                            color="black"
                            size="1.25em"
                            margin="0.25em 0"
                            style={{fontFamily: 'Roboto Mono', fontWeight: 600}}
                        >
                            Wushu.Taiji.Fitness.
                        </Text>
                        <Text
                            textAlign="center"
                            color="black"
                            size="0.75em"
                            margin="0.25em 0"
                            style={{fontFamily: 'Roboto Mono', fontWeight: 600}}
                        >
                            wuyou@wuyou.de
                        </Text>
                    </Box>

                    <Box height="30%" justify="center" align="start" direction="row">
                        <Box
                            width={wrapper}
                            height={wrapper}
                            margin="0 0.5em"
                            justify="center"
                            align="center"
                            background="red"
                        >
                            <a
                                aria-label="Schreibe eine Email an wuyou@wuyou.de"
                                href={MAIL_TO_WUYOU}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={a}
                            >
                                <svg width={icon} height={icon} viewBox={email.viewport}>
                                    {email.path}
                                </svg>
                            </a>
                        </Box>
                        <Box
                            width={wrapper}
                            height={wrapper}
                            margin="0 0.5em"
                            justify="center"
                            align="center"
                            background="red"
                        >
                            <a
                                aria-label="Besuche unsere Facebook-Seite"
                                href={LINK_TO_FACEBOOK}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={a}
                            >
                                <svg width={icon} height={icon} viewBox={facebook.viewport}>
                                    {facebook.path}
                                </svg>
                            </a>
                        </Box>
                        <Box
                            width={wrapper}
                            height={wrapper}
                            margin="0 0.5em"
                            justify="center"
                            align="center"
                            background="red"
                        >
                            <a
                                aria-label="Besuche unsere YouTube-Seite"
                                href={LINK_TO_YOUTUBE}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={a}
                            >
                                <svg width={icon} height={icon} viewBox={youtube.viewport}>
                                    {youtube.path}
                                </svg>
                            </a>
                        </Box>
                    </Box>
                    <Box height="20%" justify="center" align="center" direction="row">
                        <Box margin="0 0.5em">
                            <Button
                                fontSize="0.75em"
                                onClick={() => setDialog('imprint')}
                                textAlign="center"
                            >
                                Impressum
                            </Button>
                        </Box>
                        <Box margin="0 0.5em">
                            <Button
                                fontSize="0.75em"
                                onClick={() => setDialog('datasecurity')}
                                textAlign="center"
                            >
                                Datenschutz
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        width={isMobile ? '100%' : '50%'}
                        margin={isMobile ? '2em 0' : '2em 0 0'}
                        justify="center"
                        align="center"
                    >
                        <a
                            aria-label="Gehe zur Homepage von Thomas Maier"
                            href="https://thomasmaier.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                fontSize: '0.7em',
                                textAlign: 'center'
                            }}
                        >
                            Made with Love by <strong>Thomas Maier.</strong>
                        </a>
                    </Box>
                </Box>
            </Box>
            {/* Dialog */}
            <FooterDialog
                close={() => setDialog(null)}
                dialog={dialog}
                isMobile={isMobile}
                imprint={footer.imprint}
                datasecurity={footer.datasecurity}
            />
        </Fragment>
    )
}

export default Footer
