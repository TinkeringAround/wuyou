import React from 'react'
import { ResponsiveContext } from 'grommet'

// Partials:
import Articles from './articles'
import Trainerteam from './trainers'

// Components
import Spacer from '../../components/spacer'

// Assets
import * as training from '../../assets/training.json'

// ===============================================
const Training = () => {
  return (
    <>
      {training && (
        <ResponsiveContext.Consumer>
          {size => (
            <>
              <Spacer id="training" height={size.includes('small') ? '2em' : '6em'} />
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
