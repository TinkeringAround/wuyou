import React from 'react'

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
      <Spacer id="training" height="0" />
      <Articles articles={training.articles} />
      <Trainerteam trainers={training.trainers} />
    </>
  )
}

export default Training
