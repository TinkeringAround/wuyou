import React, { FC } from 'react'
import { Box, Heading } from 'grommet'

// Types
import { TDocument, TChapter } from '../../types'

// Atoms
import Headline from '../../atoms/headline'
import Paragraph from '../../atoms/paragraph'
import Button from '../../atoms/button'

// Components
import Dialog from '../dialog'

// ===============================================
interface Props {
  close: any
  dialog: string | null
  isMobile: boolean
  imprint: TDocument | null
  datasecurity: TDocument | null
}

// ===============================================
const FooterDialog: FC<Props> = ({ close, dialog, isMobile, imprint, datasecurity }) => {
  return (
    <Dialog showDialog={dialog ? true : false} closeDialog={close} isMobile={isMobile}>
      {dialog && imprint && datasecurity && (
        <>
          <Box height="25%">
            <Headline title={dialog === 'imprint' ? imprint.title : datasecurity.title} />
          </Box>

          <Box
            height={
              dialog === 'datasecurity' || (dialog === 'imprint' && !imprint.data) ? '75%' : '60%'
            }
            style={{ overflowY: 'scroll', overflowX: 'hidden' }}
          >
            {dialog === 'imprint' &&
              imprint.chapters.map((chapter: TChapter, index: number) => {
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
                    {chapter.paragraph && (
                      <Paragraph noPadding margin="0.5em 0 2em 0" size="1em">
                        {chapter.paragraph}
                      </Paragraph>
                    )}
                  </React.Fragment>
                )
              })}

            {dialog === 'datasecurity' &&
              datasecurity.chapters.map((chapter: TChapter, index: number) => {
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
                    {chapter.paragraph && (
                      <Paragraph noPadding margin="0.5em 0 2em 0" size="1em">
                        {chapter.paragraph}
                      </Paragraph>
                    )}
                  </React.Fragment>
                )
              })}
          </Box>

          {dialog === 'imprint' && imprint.data && (
            <Box width="30%" height="15%" justify="end">
              <Button link={imprint.data.url} textAlign="center">
                {imprint.data.title}
              </Button>
            </Box>
          )}
        </>
      )}
    </Dialog>
  )
}

export default FooterDialog
