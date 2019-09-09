import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Grommet, ResponsiveContext } from 'grommet'
import * as Sentry from '@sentry/browser'

// Context:
import Context from './contentful-context'

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
Sentry.init({ dsn: 'https://1d28a670ef5d470da5b18d8b755e9b10@sentry.io/1515723' })

// Contentful:
const contentfulClient = require('contentful').createClient({
  space: '10jt7as4i4e5',
  accessToken: '1c9eac010cd45571963852bd6738cb948824951476babefb45b0b6e5d0f14cd9'
})

// Consts:
const NAVIGATION = 200
const TOLERANCE = 25

// ===============================================
const App = () => {
  const [client] = useState(contentfulClient)
  const [scroll, setScroll] = useState<boolean>(false)

  return (
    <Context.Provider value={{ contentful: client }}>
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
    </Context.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
