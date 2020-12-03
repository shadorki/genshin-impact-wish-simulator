import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import Inventory from './inventory'
import GentryOfHermitage from '../models/gentry-of-hermitage'
import BeginnersWish from '../models/beginners-wish'
import EpitomeInvocation from '../models/epitome-invocation'
import WanderlustInvocation from '../models/wanderlust-invocation'
import { version } from '../../package.json';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'banners',
      currentDetails: 'beginners-wish',
      selectedWish: 'beginnersWish',
      isBeginnersWishLimited: false,
      inventory: {},
      wasDisclaimerSeen: false,
      currentWishes: []
    }
    this.setView = this.setView.bind(this)
    this.setBeginnersWishDisable = this.setBeginnersWishDisable.bind(this)
    this.gentryOfHermitage = new GentryOfHermitage()
    this.beginnersWish = new BeginnersWish(this.setBeginnersWishDisable)
    this.epitomeInvocation = new EpitomeInvocation()
    this.wanderlustInvocation = new WanderlustInvocation()
  }
  componentDidMount() {
    this.clearLocalStorageEveryNewBuild();
    this.loadData()
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
    const { isBeginnersWishLimited } = this.state
    this.setState({
      view: 'banners'
    })
  }
  hideModal() {
    this.setState({
      wasDisclaimerSeen: true
    })
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  setSelectedWish(selectedWish) {
    this.setState({selectedWish})
  }
  wish(selectedWish) {
    this.setState({
      currentWishes: this[selectedWish].roll(),
      selectedWish
    }, () => this.setView('wish'))
  }
  updateInventory(items) {
    // Deep copy inventory
    let { inventory } = this.state
    inventory = Object.assign({}, inventory)
    for(const item in inventory) {
      inventory[item] = Object.assign({}, inventory[item])
    }
    // Organize the items to update quantity
    for(let i = 0; i < items.length; i++) {
      if(inventory[items[i].name]) {
        inventory[items[i].name].quantity++
      } else {
        inventory[items[i].name] = items[i]
        inventory[items[i].name].quantity = 1
      }
    }
    this.setState({inventory, currentWishes: []}, this.saveData)
  }
  reset(previouslySelectedWish) {
    this.beginnersWish.attemptsCount = 0
    this.beginnersWish.guaranteedNoelle = true
    this.gentryOfHermitage.attemptsCount = 0
    this.wanderlustInvocation.attemptsCount = 0
    this.epitomeInvocation.attemptsCount = 0
    this.setState({
      isBeginnersWishLimited: false,
      selectedWish: previouslySelectedWish,
      inventory: {}
    }, this.saveData)
  }
  saveData() {
    const {
      isBeginnersWishLimited,
      inventory
    } = this.state
    const data = {
      isBeginnersWishLimited,
      inventory,
      beginnersWishCount: this.beginnersWish.attemptsCount,
      gentryOfHermitage: this.gentryOfHermitage.attemptsCount,
      wanderlustInvocationCount: this.wanderlustInvocation.attemptsCount,
      epitomeInvocationCount: this.epitomeInvocation.attemptsCount,
    }
    localStorage.setItem('data', JSON.stringify(data))
  }
  loadData(){
    const data = JSON.parse(localStorage.getItem('data'))
    if(!data) return;
    const {
      isBeginnersWishLimited,
      inventory,
    } = data
    this.beginnersWish.attempts = data.beginnersWishCount
    this.gentryOfHermitage.attempts = data.gentryOfHermitage
    this.wanderlustInvocation.attempts = data.wanderlustInvocationCount
    this.epitomeInvocation.attempts = data.epitomeInvocationCount
    this.setState({
      isBeginnersWishLimited,
      inventory
    }, this.backToHome)
  }
  setBeginnersWishDisable(isBeginnersWishLimited) {
    this.setState({
      isBeginnersWishLimited,
      currentDetails: isBeginnersWishLimited ? 'gentry-of-hermitage' : 'beginners-wish'
    })
  }
  clearLocalStorageEveryNewBuild() {
    // If there is a new update or the user does not have the 'appVersion', we'll give one.
    // We will also reset the local storage every time a new build occurs to avoid cache problems.
    // We have to make sure to always bump the version number every time a new banner comes out, though.
    if (!localStorage.getItem("appVersion") || localStorage.getItem("appVersion") !== version) {
      localStorage.clear();
      localStorage.setItem("appVersion", version);
    }
  }
  render () {
    const {
          currentDetails,
          view,
          isBeginnersWishLimited,
          inventory,
          wasDisclaimerSeen,
          selectedDetail,
          currentWishes
        } = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              selectedBanner={currentDetails}
              isBeginnersWishLimited={isBeginnersWishLimited}
              wasDisclaimerSeen={wasDisclaimerSeen}
              wish={this.wish.bind(this)}
              hideModal={this.hideModal.bind(this)}
              reset={this.reset.bind(this)}
            />
          case 'details':
            return <Details
            backToHome={this.backToHome.bind(this)}
            selectedDetail={currentDetails}
            />
          case 'wish':
            return <Wish
            setView={this.setView}
            is5StarItem={currentWishes.some(item => item.rating === 5)}
            />
          case 'wish-results':
            return <WishResults
            wishes={currentWishes}
            updateInventory={this.updateInventory.bind(this)}
            setView={this.setView}
            inventory={inventory}
            />
          case 'inventory':
            return <Inventory
            inventory={inventory}
            backToHome={this.backToHome.bind(this)}
            />
        }
  }
}
