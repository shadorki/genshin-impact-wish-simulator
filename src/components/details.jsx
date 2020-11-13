import React, {Component} from 'react'
import FarewellOfSnezhnayaDetails from './farewell-of-snezhnaya-details'
import EpitomeInvocationDetails from './epitome-invocation-details'
import Navbar from './details-components/navbar'
import WanderlustInvocationDetails from './wanderlust-invocation-details'
import BeginnersWishDetails from './beginners-wish-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'farewell-of-snezhnaya': <FarewellOfSnezhnayaDetails/>,
    'epitome-invocation': <EpitomeInvocationDetails/>,
    'wanderlust-invocation': <WanderlustInvocationDetails/>,
    'beginners-wish': <BeginnersWishDetails/>
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
