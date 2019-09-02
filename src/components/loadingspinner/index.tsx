import React, { FC } from 'react'

// Style:
import './style.css'

// ===============================================
interface Props {
  size: 'xsmall' | 'small' | 'medium' | 'normal'
}

// ===============================================
const LoadingSpinner: FC<Props> = ({ size }) => {
  const xsmall = size.includes('xsmall')
  const small = size.includes('small')
  const medium = size.includes('medium')

  const spinner = {
    width: xsmall ? 25 : small ? 50 : medium ? 100 : 200,
    height: xsmall ? 20 : small ? 40 : medium ? 70 : 100
  }

  const rectangle = {
    width: xsmall ? 5 : small ? 10 : medium ? 20 : 40
  }

  return (
    <div className="spinner" style={spinner}>
      <div className="rect1" style={rectangle} />
      <div className="rect2" style={rectangle} />
      <div className="rect3" style={rectangle} />
      <div className="rect4" style={rectangle} />
      <div className="rect5" style={rectangle} />
    </div>
  )
}

export default LoadingSpinner
