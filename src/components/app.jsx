import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import BalladInGoblets from '../models/ballad-in-goblets'
import BeginnersWish from '../models/beginners-wish'
import EpitomeInvocation from '../models/epitome-invocation'
import WanderlustInvocation from '../models/wanderlust-invocation'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'banners',
      currentDetails: 'beginners-wish',
      selectedWish: 'beginnersWish',
      isBeginnersWishLimited: false
    }
    this.setView = this.setView.bind(this)
    this.setBeginnersWishDisable = this.setBeginnersWishDisable.bind(this)
    this.balladInGoblets = new BalladInGoblets()
    this.beginnersWish = new BeginnersWish(this.setBeginnersWishDisable)
    this.epitomeInvocation = new EpitomeInvocation()
    this.wanderlustInvocation = new WanderlustInvocation()
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
    const { isBeginnersWishLimited } = this.state
    this.setState({
      view: 'banners',
      currentDetails: this.beginnersWish.attemptsCount === 20 ? 'ballad-in-goblets' : 'beginners-wish'
    })
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  setSelectedWish(selectedWish) {
    this.setState({selectedWish})
  }
  wish() {
    return this[this.state.selectedWish].roll()
  }
  setBeginnersWishDisable(isBeginnersWishLimited) {
    this.setState({
      isBeginnersWishLimited,
      currentDetails: 'ballad-in-goblets'
    })
  }
  render () {
    const {currentDetails, view, isBeginnersWishLimited} = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              isBeginnersWishLimited={isBeginnersWishLimited}
            />
          case 'details':
            return <Details
            backToHome={this.backToHome.bind(this)}
            selectedDetail={currentDetails}
            />
          case 'wish':
            return <Wish
            setView={this.setView}
            />
          case 'wish-results':
            return <WishResults
            wish={this.wish.bind(this)}
            setView={this.setView}
            />
        }
  }
}
