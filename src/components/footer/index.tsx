import React, { useState, useEffect, useContext } from 'react'
import { Box, Heading, ResponsiveContext, Image, Text } from 'grommet'

// Types
import { TDocument, TChapter, TFooter } from '../../types'

// Context
import context from '../../contentful-context'

// Atoms
import { email, youtube, facebook } from '../../atoms/icons'
import Button from '../../atoms/button'
import Headline from '../../atoms/headline'
import Paragraph from '../../atoms/paragraph'

// Components
import Dialog from '../dialog'

// Assets
import logo from '../../assets/logo.png'

// Consts
const mailToWuyou =
  'mailto:wuyou@wuyo.de?subject=Kontaktanfrage%20an%20den%20Wuyou%20e.V.&amp;body=Hallo%20liebes%20Wuyou%20Team,%0D%0A%0D%0A...'
const linkToFacebook = 'https://www.facebook.com/WuyouEv/'
const linktToYoutube = 'https://www.youtube.com/channel/UCcYxlWYmuqUL6l4xrq5lmnw'

// ===============================================
interface Props {}

// ===============================================
const Footer: React.FC<Props> = () => {
  const { contentful } = useContext(context)
  const [dialog, setDialog] = useState<string | null>(null)
  const [footer, setFooter] = useState<TFooter | null>(null)

  useEffect(() => {
    if (footer == null) {
      contentful
        .getEntries({
          content_type: 'document',
          include: 2
        })
        .then((results: any) => {
          var newFooter: TFooter = {
            imprint: null,
            datasecurity: null
          }
          if (results.hasOwnProperty('items')) {
            results.items.forEach((document: any) => {
              const tmp: TDocument = {
                title: document.fields['title'],
                chapters: document.fields['chapter'].map((chapter: any) => {
                  const c: TChapter = {
                    title: chapter.fields['title'],
                    paragraph: chapter.fields['paragraph'] ? chapter.fields['paragraph'] : null
                  }
                  return c
                }),
                data: document.fields.hasOwnProperty('data')
                  ? {
                      title: document.fields['data'].fields['title'],
                      url: 'https:' + document.fields['data'].fields['file'].url
                    }
                  : null
              }
              if (tmp.title === 'Impressum') newFooter.imprint = tmp
              else if (tmp.title === 'Datenschutz') newFooter.datasecurity = tmp
            })
          }
          setFooter(newFooter)
        })
        .catch((error: any) => console.log(error))
    }
  })

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
                >
                  <Box height="50%">
                    <Image fit="contain" src={logo} />
                  </Box>
                  <Text
                    textAlign="center"
                    color="black"
                    size="1.25em"
                    margin="0.25em 0"
                    style={{ fontFamily: 'Roboto Mono', fontWeight: 600 }}
                  >
                    Wushu.Taiji.Fitness.
                  </Text>
                </Box>

                <Box height="30%" justify="center" align="start" direction="row">
                  <Box
                    className="zoomOnHover"
                    width={wrapper}
                    height={wrapper}
                    margin="0 0.5em"
                    justify="center"
                    align="center"
                    background="red"
                  >
                    <a href={mailToWuyou} target="_blank" rel="noopener noreferrer" style={a}>
                      <svg width={icon} height={icon} viewBox={email.viewport}>
                        {email.path}
                      </svg>
                    </a>
                  </Box>
                  <Box
                    className="zoomOnHover"
                    width={wrapper}
                    height={wrapper}
                    margin="0 0.5em"
                    justify="center"
                    align="center"
                    background="red"
                  >
                    <a href={linkToFacebook} target="_blank" rel="noopener noreferrer" style={a}>
                      <svg width={icon} height={icon} viewBox={facebook.viewport}>
                        {facebook.path}
                      </svg>
                    </a>
                  </Box>
                  <Box
                    className="zoomOnHover"
                    width={wrapper}
                    height={wrapper}
                    margin="0 0.5em"
                    justify="center"
                    align="center"
                    background="red"
                  >
                    <a href={linktToYoutube} target="_blank" rel="noopener noreferrer" style={a}>
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
            <Dialog
              showDialog={dialog ? true : false}
              closeDialog={() => setDialog(null)}
              isMobile={isMobile}
            >
              {dialog && footer && footer.imprint && footer.datasecurity && (
                <>
                  <Box height="25%">
                    <Headline
                      title={
                        dialog === 'imprint' ? footer.imprint.title : footer.datasecurity.title
                      }
                    />
                  </Box>

                  <Box
                    height={
                      dialog === 'datasecurity' || (dialog === 'imprint' && !footer.imprint.data)
                        ? '75%'
                        : '60%'
                    }
                    style={{ overflowY: 'scroll', overflowX: 'hidden' }}
                  >
                    {dialog === 'imprint' &&
                      footer.imprint.chapters.map((chapter: TChapter, index: number) => {
                        return (
                          <React.Fragment key={'Imprint-Chapter-' + index}>
                            <Heading
                              level="2"
                              size="1.25em"
                              color="black"
                              style={{ fontFamily: 'Roboto Mono' }}
                              margin="0"
                            >
                              {chapter.title}
                            </Heading>
                            <Paragraph noPadding margin="0.5em 0 2em 0" size="1em">
                              {chapter.paragraph}
                            </Paragraph>
                          </React.Fragment>
                        )
                      })}

                    {dialog === 'datasecurity' &&
                      footer.datasecurity.chapters.map((chapter: TChapter, index: number) => {
                        return (
                          <React.Fragment key={'Datasecurity-Chapter-' + index}>
                            <Heading
                              level="2"
                              size="1.25em"
                              color="black"
                              style={{ fontFamily: 'Roboto Mono' }}
                              margin="0"
                            >
                              {chapter.title}
                            </Heading>
                            <Paragraph noPadding margin="0.5em 0 2em 0" size="1em">
                              {chapter.paragraph}
                            </Paragraph>
                          </React.Fragment>
                        )
                      })}
                  </Box>

                  {dialog === 'imprint' && footer.imprint.data && (
                    <Box width="30%" height="15%" justify="end">
                      <Button link={footer.imprint.data.url} textAlign="center">
                        {footer.imprint.data.title}
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Dialog>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Footer
