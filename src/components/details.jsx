import React, {Component} from 'react'
import BalladInGobletsDetails from './ballad-in-goblets-details'
import EpitomeInvocationDetails from './epitome-invocation-details'
import Navbar from './details-components/navbar'
import WanderlustInvocationDetails from './wanderlust-invocation-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'ballad-in-goblets': <BalladInGobletsDetails/>,
    'epitome-invocation': <EpitomeInvocationDetails/>,
    'wanderlust-invocation': <WanderlustInvocationDetails/>
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
