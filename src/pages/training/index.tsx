import React, {FC, Fragment} from 'react'

// Partials:
import Articles from './articles'
import Trainerteam from './trainers'

// Components
import Spacer from '../../components/spacer'

// Assets
import * as training from '../../assets/training.json'

// ===============================================
const Training: FC = () => (
    <Fragment>
        <Spacer id="training" height="0"/>
        <Articles articles={training.articles}/>
        <Trainerteam trainers={training.trainers}/>
    </Fragment>
)

export default Training
