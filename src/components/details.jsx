import React, {Component} from 'react'
import BalladInGobletsDetails from './ballad-in-goblets-details'
import Navbar from './details-components/navbar'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'ballad-in-goblets': <BalladInGobletsDetails/>
  }
  return (
    <>
    <Navbar
    backToHome={backToHome}
    />
    {pages[selectedDetail]}
    </>
  )
}
