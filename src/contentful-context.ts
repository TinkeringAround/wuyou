import React from 'react'

const context = React.createContext({
  contentful: require('contentful').createClient
})

export default context
