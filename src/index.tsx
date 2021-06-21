import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {Grommet} from 'grommet'
import * as Sentry from '@sentry/browser'

// Styles
import './styles/colors.css'
import './styles/global.css'
import './styles/effects.css'
import './styles/components.css'
import theme from './styles/theme'

// Hooks
import {useBreakpoint} from "./hooks/useBreakpoint";

// Pages
import Home from './pages/home/'
import Training from './pages/training'
import Opinions from './pages/opinions'
import Gallery from './pages/gallery'
import Position from './pages/position'

// Components
import Navigation from './components/navigation/'
import Footer from './components/footer/'
import Spacer from './components/spacer'

// Sentry Init
Sentry.init({dsn: process.env.REACT_APP_SENTRY_URL})

// Const
const NAVIGATION = window.innerHeight / 3
const TOLERANCE = 25

// ===============================================
const App = () => {
    const {isMobile} = useBreakpoint();

    const [scroll, setScroll] = useState<boolean>(false)

    return (
        <Grommet
            id="grommet"
            theme={theme}
            full
            onScroll={({target}) => {
                const {id, scrollTop} = (target as HTMLDivElement);

                if (id === 'grommet') {
                    if (scrollTop > NAVIGATION + TOLERANCE) setScroll(true)
                    else if (scrollTop < NAVIGATION - TOLERANCE) setScroll(false)
                }
            }}
        >
            <Navigation scrolled={scroll}/>
            <Home/>
            <Training/>
            <Opinions/>
            <Gallery isMobile={isMobile}/>
            <Position/>
            <Footer/>
            {isMobile && <Spacer height="8em"/>}
        </Grommet>
    )
}

// ===============================================
ReactDOM.render(<App/>, document.getElementById('root'))
serviceWorker.unregister()
