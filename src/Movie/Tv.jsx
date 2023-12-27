import React from 'react'
import Home from './Home'
import { useParams } from 'react-router-dom'

function Tv() {

  const {type} = useParams()
  return (
    <Home type={type}/>
  )
}

export default Tv