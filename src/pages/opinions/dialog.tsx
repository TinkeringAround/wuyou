import React, {FC} from 'react'
import {Box, Text} from 'grommet'

// Types
import {TPricing, TPDF} from '../../types/'

// Atoms
import Headline from '../../atoms/headline'
import Paragraph from '../../atoms/paragraph'
import Button from '../../atoms/button'

// Components
import Dialog from '../../components/dialog'

// Utility
import {shuffle} from '../../utility'

// ===============================================
interface Props {
    show: boolean
    close: any
    isMobile: boolean
    isMedium: boolean
    prices: Array<TPricing>
    pdf: TPDF
}

// ===============================================
const OptionsDialog: FC<Props> = ({show, close, isMobile, isMedium, prices, pdf}) => (
    <Dialog showDialog={show} closeDialog={close} isMobile={isMobile}>
        <Box width="100%">
            <Headline title="Preise." subtitle="Monatliche Abrechnung. Kostenloses Probetraining."/>
        </Box>
        <Box
            width="100%"
            height={isMobile ? '80%' : ''}
            direction={isMobile ? 'column' : 'row'}
            margin={(isMobile ? '0 ' : '2em ') + 'auto'}
            style={{minHeight: '60%'}}
        >
            <Box
                width={isMobile ? '100%' : '50%'}
                height={isMobile ? '50%' : ''}
                direction="row"
                justify="center"
                align="center"
                margin="1.5em 0"
                wrap
            >
                {shuffle(prices).map((pricing: TPricing, index: number) => {
                    return (
                        <Box
                            key={'Pricing-' + index}
                            className="card"
                            width="46%"
                            height="46%"
                            margin="2%"
                            background="white"
                            justify="center"
                            align="center"
                        >
                            <Box width="90%" height="90%" justify="center">
                                <Text
                                    color="black"
                                    size={isMobile ? '2em' : isMedium ? '3em' : '4em'}
                                    textAlign="center"
                                    style={{fontFamily: 'Roboto Mono', fontWeight: 600}}
                                >
                                    {pricing.price + '€'}
                                </Text>
                                <Box width="100%" height="50%" justify="center" align="center" background="white">
                                    <Box width="90%">
                                        <Text
                                            size={isMobile ? '1em' : isMedium ? '1em' : '1.5em'}
                                            textAlign="center"
                                            style={{fontFamily: 'Roboto Mono'}}
                                        >
                                            {pricing.title}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box width={isMobile ? '100%' : '50%'} margin="0" pad={isMobile ? '0 1%' : '0 1em'}>
                <Paragraph size={isMobile ? '0.8em' : '1.2em'} margin={isMobile ? '0' : '1.5em 0'}>
                    {pdf.description}
                </Paragraph>
                <Box width="70%" margin={isMobile ? '0.5em 0 0 0' : '0.5em 0 0 0'}>
                    <Button link={pdf.fileURL} textAlign="center">
                        Anmeldeformular
                    </Button>
                </Box>
            </Box>
        </Box>
    </Dialog>
)

export default OptionsDialog
