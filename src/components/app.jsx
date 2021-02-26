import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
import WishResults from './wish-results'
import Inventory from './inventory'
import BalladInGoblets from '../models/ballad-in-goblets'
import SparklingSteps from '../models/sparkling-steps'
import GentryOfHermitage from '../models/gentry-of-hermitage'
import FarewellOfSnezhnaya from '../models/farewell-of-snezhnaya'
import SecretumSecretorum from '../models/secretum-secretorum'
import AdriftInTheHarbor from '../models/adrift-in-the-harbor'
import InvitationToMundaneLife from '../models/invitation-to-mundane-life'
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
      isBeginnersWishOver10: false,
      inventory: {},
      wasDisclaimerSeen: false,
      isSettingsPageVisible: false,
      currentWishes: [],
      selectedCharacterEventWish: 'invitation-to-mundane-life'
    }
    this.setView = this.setView.bind(this)
    this.setBeginnersWishDisable = this.setBeginnersWishDisable.bind(this)
    this.setBeginnersWishOver10 = this.setBeginnersWishOver10.bind(this)
    this.balladInGoblets = new BalladInGoblets()
    this.sparklingSteps = new SparklingSteps()
    this.gentryOfHermitage = new GentryOfHermitage()
    this.farewellOfSnezhnaya = new FarewellOfSnezhnaya()
    this.secretumSecretorum = new SecretumSecretorum()
    this.adriftInTheHarbor = new AdriftInTheHarbor()
    this.invitationToMundaneLife = new InvitationToMundaneLife()
    this.beginnersWish = new BeginnersWish(this.setBeginnersWishDisable, this.setBeginnersWishOver10)
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
  wish(selectedWish, isOneWish = false) {
    this.setState({
      currentWishes: isOneWish ? [this[selectedWish].rollOnce()] : this[selectedWish].roll(),
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
  updateCharacterEventWish(selectedCharacterEventWish) {
    this.setState({
      selectedCharacterEventWish
    }, this.saveData)
  }
  getFormattedCharacterEventWish(format, selectedCharacterEventWish) {
    if(!selectedCharacterEventWish) {
      selectedCharacterEventWish = this.state.selectedCharacterEventWish
    }
    const options = {
      camelCase() {
        return this.formatter(true)
      },
      pascalCase() {
        return this.formatter(false)
      },
      formatter(isCamel) {
        const words = selectedCharacterEventWish.split('-')
        for (let i = 0; i < words.length; i++) {
          if(isCamel && !i) continue
          const word = words[i]
          words[i] = word[0].toUpperCase() + word.slice(1)
        }
        return words.join('')
      },
      kebabCase() {
        return selectedCharacterEventWish
      }
    }
    return options[format]()
  }
  reset(previouslySelectedWish) {
    this.beginnersWish.reset()
    this.invitationToMundaneLife.reset()
    this.wanderlustInvocation.reset()
    this.epitomeInvocation.reset()
    this.balladInGoblets.reset()
    this.sparklingSteps.reset()
    this.gentryOfHermitage.reset()
    this.farewellOfSnezhnaya.reset()
    this.secretumSecretorum.reset()
    this.adriftInTheHarbor.reset()
    this.setState({
      isBeginnersWishLimited: false,
      isBeginnersWishOver10: false,
      selectedWish: previouslySelectedWish,
      inventory: {}
    }, this.saveData)
  }
  saveData() {
    const {
      isBeginnersWishLimited,
      isBeginnersWishOver10,
      inventory,
      selectedCharacterEventWish
    } = this.state
    console.log(selectedCharacterEventWish)
    const data = {
      version: 1,
      isBeginnersWishLimited,
      isBeginnersWishOver10,
      inventory,
      selectedCharacterEventWish,
      beginnersWish: this.beginnersWish.getState(),
      invitationToMundaneLife: this.invitationToMundaneLife.getState(),
      wanderlustInvocation: this.wanderlustInvocation.getState(),
      epitomeInvocation: this.epitomeInvocation.getState(),
      balladInGoblets: this.balladInGoblets.getState(),
      sparklingSteps: this.sparklingSteps.getState(),
      gentryOfHermitage: this.gentryOfHermitage.getState(),
      farewellOfSnezhnaya: this.farewellOfSnezhnaya.getState(),
      secretumSecretorum: this.secretumSecretorum.getState(),
      adriftInTheHarbor: this.adriftInTheHarbor.getState()
    }
    localStorage.setItem('data', JSON.stringify(data))
  }
  loadData(){
    const data = JSON.parse(localStorage.getItem('data'))
    if(!data) return;
    console.log(data)
    if (!data.version) {
      // Load original version (without softPity4 and softPity5)
      const {
        isBeginnersWishLimited,
        isBeginnersWishOver10,
        inventory
      } = data
      this.beginnersWish.attemptsCount = data.beginnersWishCount || 0
      this.invitationToMundaneLife.attemptsCount = data.invitationToMundaneLife || 0
      this.wanderlustInvocation.attemptsCount = data.wanderlustInvocationCount || 0
      this.epitomeInvocation.attemptsCount = data.epitomeInvocationCount || 0
      this.balladInGoblets.attemptsCount = data.balladInGoblets || 0
      this.sparklingSteps.attemptsCount = data.sparklingSteps || 0
      this.gentryOfHermitage.attemptsCount = data.gentryOfHermitage || 0
      this.farewellOfSnezhnaya.attemptsCount = data.farewellOfSnezhnaya || 0
      this.secretumSecretorum.attemptsCount = data.secretumSecretorum || 0
      this.adriftInTheHarbor.attemptsCount = data.adriftInTheHarbor || 0
      this.setState({
        isBeginnersWishLimited,
        isBeginnersWishOver10,
        inventory
      }, this.backToHome)
    } else {
      // Load version 1 with softPity4 and softPity5
      const {
        isBeginnersWishLimited,
        isBeginnersWishOver10,
        inventory,
        selectedCharacterEventWish
      } = data
      this.beginnersWish.setState(data.beginnersWish);
      this.invitationToMundaneLife.setState(data.invitationToMundaneLife);
      this.wanderlustInvocation.setState(data.wanderlustInvocation);
      this.epitomeInvocation.setState(data.epitomeInvocation);
      this.balladInGoblets.setState(data.balladInGoblets)
      this.sparklingSteps.setState(data.sparklingSteps)
      this.gentryOfHermitage.setState(data.gentryOfHermitage)
      this.farewellOfSnezhnaya.setState(data.farewellOfSnezhnaya)
      this.secretumSecretorum.setState(data.secretumSecretorum)
      this.adriftInTheHarbor.setState(data.adriftInTheHarbor)
      this.setState({
        isBeginnersWishLimited,
        isBeginnersWishOver10,
        inventory,
        selectedCharacterEventWish
      }, this.backToHome)
    }

  }
  setBeginnersWishDisable(isBeginnersWishLimited) {
    const { selectedCharacterEventWish } = this.state
    this.setState({
      isBeginnersWishLimited,
      currentDetails: isBeginnersWishLimited ? selectedCharacterEventWish : 'beginners-wish'
    })
  }
  setBeginnersWishOver10() {
    this.setState({isBeginnersWishOver10: true})
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
          isBeginnersWishOver10,
          inventory,
          wasDisclaimerSeen,
          selectedDetail,
          currentWishes,
          selectedCharacterEventWish
        } = this.state
        switch(view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
              setSelectedWish={this.setSelectedWish.bind(this)}
              selectedBanner={currentDetails}
              getFormattedCharacterEventWish={this.getFormattedCharacterEventWish.bind(this)}
              updateCharacterEventWish={this.updateCharacterEventWish.bind(this)}
              isBeginnersWishLimited={isBeginnersWishLimited}
              isBeginnersWishOver10={isBeginnersWishOver10}
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
            is4StarItem={currentWishes.some(item => item.rating === 4)}
            is5StarItem={currentWishes.some(item => item.rating === 5)}
            isSingleItem={currentWishes.length === 1}
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
