import React, { useState, useEffect, useContext } from 'react'
import { Box, ResponsiveContext } from 'grommet'

// Types:
import { TTraining } from '../../types'

// Context
import context from '../../contentful-context'

// Custom Components
import LoadingSpinner from '../../components/loadingspinner'

// Partials:
import Articles from './articles'
import Trainerteam from './trainers'

// ===============================================
const Training = () => {
  const { contentful } = useContext(context)
  const [training, setTraining] = useState<TTraining | null>(null)

  // Life Cycle Methods
  useEffect(() => {
    if (training == null) {
      contentful
        .getEntries({
          content_type: 'training',
          include: 2
        })
        .then((results: any) => {
          if (results.hasOwnProperty('items')) {
            setTraining({
              articles: results.items[0].fields['articles'].map((article: any) => {
                return {
                  title: article.fields['title'],
                  subtitle: article.fields['subtitle'] != null ? article.fields['subtitle'] : '',
                  paragraph: article.fields['content']
                  // image: "https:" + article.fields['image]
                }
              }),
              trainers: results.items[0].fields['trainers'].map((trainer: any) => {
                return {
                  name: trainer.fields['name'],
                  age: trainer.fields['age'],
                  description: trainer.fields['description'],
                  image: 'https:' + trainer.fields['image'].fields['file'].url
                }
              })
            })
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
            {training == null ? (
              <Box height="100vh">
                <LoadingSpinner size={isMobile ? 'medium' : 'normal'} />
              </Box>
            ) : (
              <>
                <Articles articles={training.articles} />
                <Trainerteam trainers={training.trainers} />
              </>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Training
