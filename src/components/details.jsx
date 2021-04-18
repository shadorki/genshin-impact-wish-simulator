import React, {Component} from 'react'
import BalladInGobletsDetails from './ballad-in-goblets-details'
import BalladInGoblets2Details from './ballad-in-goblets-2-details'
import FarewellOfSnezhnaya2Details from './farewell-of-snezhnaya-2-details'
import SparklingStepsDetails from './sparkling-steps-details'
import GentryOfHermitageDetails from './gentry-of-hermitage-details'
import FarewellOfSnezhnayaDetails from './farewell-of-snezhnaya-details'
import SecretumSecretorumDetails from './secretum-secretorum-details'
import AdriftInTheHarborDetails from './adrift-in-the-harbor-details'
import InvitationToMundaneLifeDetails from './invitation-to-mundane-life-details'
import MomentOfBloomDetails from './moment-of-bloom-details'
import DanceOfLanternsDetails from './dance-of-lanterns-details'
import EpitomeInvocationDetails from './epitome-invocation-details'
import Navbar from './details-components/navbar'
import WanderlustInvocationDetails from './wanderlust-invocation-details'
import BeginnersWishDetails from './beginners-wish-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'ballad-in-goblets': <BalladInGobletsDetails />,
    'ballad-in-goblets-2': <BalladInGoblets2Details />,
    'farewell-of-snezhnaya-2': <FarewellOfSnezhnaya2Details />,
    'sparkling-steps': <SparklingStepsDetails/>,
    'gentry-of-hermitage': <GentryOfHermitageDetails/>,
    'farewell-of-snezhnaya': <FarewellOfSnezhnayaDetails/>,
    'secretum-secretorum': <SecretumSecretorumDetails/>,
    'adrift-in-the-harbor': <AdriftInTheHarborDetails/>,
    'invitation-to-mundane-life': <InvitationToMundaneLifeDetails />,
    'moment-of-bloom': <MomentOfBloomDetails />,
    'dance-of-lanterns': <DanceOfLanternsDetails />,
    'epitome-invocation': <EpitomeInvocationDetails/>,
    'wanderlust-invocation': <WanderlustInvocationDetails/>,
    'beginners-wish': <BeginnersWishDetails/>,
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
