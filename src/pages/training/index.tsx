import React, { useState, useEffect, useContext } from 'react'

// Types:
import { TTraining } from '../../types'

// Context
import context from '../../contentful-context'

// Partials:
import Articles from './articles'
import Trainerteam from './trainers'

// Components
import Spacer from '../../components/spacer'
import { ResponsiveContext } from 'grommet'

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
                  paragraph: article.fields['content'],
                  url: 'https:' + article.fields['image'].fields['file'].url
                }
              }),
              trainers: results.items[0].fields['trainers'].map((trainer: any) => {
                return {
                  name: trainer.fields['name'],
                  addition: trainer.fields['age'],
                  description: trainer.fields['description'],
                  url: 'https:' + trainer.fields['image'].fields['file'].url
                }
              })
            })
          }
        })
        .catch((error: any) => console.log(error))
    }
  }, [contentful])

  return (
    <>
      {training && (
        <ResponsiveContext.Consumer>
          {size => (
            <>
              <Spacer height={size.includes('small') ? '2em' : '6em'} />
              <Articles articles={training.articles} />
              <Trainerteam trainers={training.trainers} />
            </>
          )}
        </ResponsiveContext.Consumer>
      )}
    </>
  )
}

export default Training
