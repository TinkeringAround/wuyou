import React, { useState, FC } from 'react'
import { Box, ResponsiveContext, Image, Text } from 'grommet'

// Atoms
import { email, youtube, facebook } from '../../atoms/icons'
import Button from '../../atoms/button'

// Assets
import logo from '../../assets/logo.json'
import footer from '../../assets/footer.json'
import FooterDialog from './dialog'

// Consts
const mailToWuyou =
  'mailto:wuyou@wuyou.de?subject=Kontaktanfrage%20an%20den%20Wuyou%20e.V.&amp;body=Hallo%20liebes%20Wuyou%20Team,%0D%0A%0D%0A...'
const linkToFacebook = 'https://www.facebook.com/WuyouEv/'
const linktToYoutube = 'https://www.youtube.com/channel/UCcYxlWYmuqUL6l4xrq5lmnw'

// ===============================================
const Footer: FC = () => {
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
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <>
            <Box
              id="contact"
              width="100%"
              height="400px"
              justify="center"
              align="center"
              margin="0 0 2em 0"
            >
              <Box
                className="noFlickr"
                height="100%"
                width={isMobile ? '100%' : '60%'}
                justify="center"
                align="center"
                margin="0"
              >
                <Box
                  className={isMobile ? '' : 'zoomOnHover'}
                  height="50%"
                  justify="center"
                  align="center"
                  margin="1em 0 2em 0"
                  onClick={() => {
                    const home = document.getElementById('home')
                    if (home) home.scrollIntoView({ block: 'end', behavior: 'smooth' })
                  }}
                >
                  <Box className="noFlickr" height="50%">
                    <Image fit="contain" alt={logo.title} src={logo.url} />
                  </Box>
                  <Text
                    className="noFlickr"
                    textAlign="center"
                    color="black"
                    size="1.25em"
                    margin="0.25em 0"
                    style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                  >
                    Wushu.Taiji.Fitness.
                  </Text>
                  <Text
                    className="noFlickr"
                    textAlign="center"
                    color="black"
                    size="0.75em"
                    margin="0.25em 0"
                    style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
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
                      href={mailToWuyou}
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
                      href={linkToFacebook}
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
                      href={linktToYoutube}
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
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Footer
