import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Grommet, ResponsiveContext } from 'grommet'
import * as Sentry from '@sentry/browser'

// Styles:
import './styles/global.css'
import theme from './styles/theme'

// Pages:
import Home from './pages/home/'
import Training from './pages/training'
import Opinions from './pages/opinions'
import Gallery from './pages/gallery'
import Position from './pages/position'

// Components:
import Navigation from './components/navigation/'
import Footer from './components/footer/'
import Spacer from './components/spacer'

// Sentry Init
Sentry.init({ dsn: process.env.REACT_APP_SENTRY_URL })

// Consts:
const NAVIGATION = window.innerHeight / 3
const TOLERANCE = 25

// ===============================================
const App = () => {
  const [scroll, setScroll] = useState<boolean>(false)

  return (
    <Grommet
      id="grommet"
      theme={theme}
      full
      onScroll={event => {
        //@ts-ignore
        if (event.target.id === 'grommet') {
          //@ts-ignore
          if (event.target.scrollTop > NAVIGATION + TOLERANCE) setScroll(true)
          //@ts-ignore
          else if (event.target.scrollTop < NAVIGATION - TOLERANCE) setScroll(false)
        }
      }}
    >
      <ResponsiveContext.Consumer>
        {size => {
          const isMobile = size.includes('small')

          return (
            <>
              <Navigation scrolled={scroll} />
              <Home />
              <Training />
              <Opinions />
              <Gallery isMobile={isMobile} />
              <Position />
              <Footer />
              {isMobile && <Spacer height="8em" />}
            </>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
