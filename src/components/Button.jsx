import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({title, link, styling}) => {
  return (
    <button className={styling}><Link to={link}>{title}</Link></button>
  )
}

export default Button