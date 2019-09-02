import React, { useContext, useState, useEffect } from 'react'
import { ResponsiveContext, Box } from 'grommet'

// Types:
import { TOpinions, TQuote, TPricing, TPDF } from '../../types'

// Context
import context from '../../contentful-context'

// Custom Components
import LoadingSpinner from '../../components/loadingspinner'

// Utility
import { shuffle } from '../../utility'

// ===============================================
interface Props {}

// ===============================================
const Opinions: React.FC<Props> = () => {
  const { contentful } = useContext(context)
  const [opinions, setOpinions] = useState<TOpinions | null>(null)

  useEffect(() => {
    if (opinions == null && contentful != null) {
      contentful
        .getEntries({
          content_type: 'opinions'
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            const quotes: Array<TQuote> = results.items[0].fields['quotes'].map((quote: any) => {
              return {
                author: quote.fields['author'],
                age: quote.fields['age'],
                quote: quote.fields['quote']
              }
            })

            const prices: Array<TPricing> = results.items[0].fields['prices'].map(
              (pricing: any) => {
                return {
                  title: pricing.fields['title'],
                  price: pricing.fields['price']
                }
              }
            )

            const pdf: TPDF = {
              description: results.items[0].fields['pdf'].fields['description'],
              fileTitle: results.items[0].fields['pdf'].fields['data'].fields['title'],
              fileURL: 'https:' + results.items[0].fields['pdf'].fields['data'].fields['file'].url
            }

            const opinions = {
              quotes: shuffle(quotes),
              prices: shuffle(prices),
              pdf: pdf
            }
            setOpinions(opinions)
          }
        })
        .catch((error: any) => console.log(error))
    }
  }, [contentful])

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <>
            {opinions == null ? (
              <Box width="100%" height="100vh">
                <LoadingSpinner size={isMobile ? 'medium' : 'normal'} />
              </Box>
            ) : (
              <>{/* TODO: Add Quotes */}</>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Opinions
