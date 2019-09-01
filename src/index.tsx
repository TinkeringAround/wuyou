import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Grommet } from 'grommet'
import * as Sentry from '@sentry/browser'

// Pages:
import Home from './pages/home/'

// Components:
import Navigation from './components/navigation'

// Styles:
import './styles/global.css'
import theme from './styles/theme'

// Sentry Init
Sentry.init({ dsn: 'https://1d28a670ef5d470da5b18d8b755e9b10@sentry.io/1515723' })

// Contentful:
const contentfulClient = require('contentful').createClient({
  space: '10jt7as4i4e5',
  accessToken: '1c9eac010cd45571963852bd6738cb948824951476babefb45b0b6e5d0f14cd9'
})

// ===============================================
const App = () => {
  const [client] = useState(contentfulClient)

  // ===============================================
  return (
    <Grommet theme={theme} full>
      <Navigation />
      <Home />
    </Grommet>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
