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
import DanceOfLanterns from '../models/dance-of-lanterns'
import MomentOfBloom from '../models/moment-of-bloom'
import BalladInGoblets2 from '../models/ballad-in-goblets-2'
import FarewellOfSnezhnaya2 from '../models/farewell-of-snezhnaya-2'
import GentryOfHermitage2 from '../models/gentry-of-hermitage-2'
import BornOfOceanSwell from '../models/born-of-ocean-swell'
import SparklingSteps2 from '../models/sparkling-steps-2'
import LeavesInTheWind from '../models/leaves-in-the-wind'
import TheHeronsCourt from '../models/the-herons-court'
import TapestryOfGoldenFlames from '../models/tapestry-of-golden-flames'
import ReignOfSerenity from '../models/reign-of-serenity'
import DriftingLuminescence from '../models/drifting-luminescence'
import MomentOfBloom2 from '../models/moment-of-bloom-2'
import BeginnersWish from '../models/beginners-wish'
import EpitomeInvocation from '../models/epitome-invocation'
import WanderlustInvocation from '../models/wanderlust-invocation'
import { version } from '../../package.json';


export default class App extends Component {
  constructor(props) {
    super(props)
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
    this.danceOfLanterns = new DanceOfLanterns()
    this.beginnersWish = new BeginnersWish(this.setBeginnersWishDisable, this.setBeginnersWishOver10)
    this.epitomeInvocation = new EpitomeInvocation()
    this.wanderlustInvocation = new WanderlustInvocation()
    this.momentOfBloom = new MomentOfBloom()
    this.balladInGoblets2 = new BalladInGoblets2()
    this.farewellOfSnezhnaya2 = new FarewellOfSnezhnaya2()
    this.gentryOfHermitage2 = new GentryOfHermitage2()
    this.bornOfOceanSwell = new BornOfOceanSwell()
    this.sparklingSteps2 = new SparklingSteps2()
    this.leavesInTheWind = new LeavesInTheWind()
    this.theHeronsCourt = new TheHeronsCourt()
    this.tapestryOfGoldenFlames = new TapestryOfGoldenFlames()
    this.reignOfSerenity = new ReignOfSerenity()
    this.driftingLuminescence = new DriftingLuminescence()
    this.momentOfBloom2 = new MomentOfBloom2()
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
      selectedCharacterEventWish: 'moment-of-bloom-2',
      userWishes: {
        'beginners-wish': 0,
        'invitation-to-mundane-life': 0,
        'wanderlust-invocation': 0,
        'epitome-invocation': 0,
        'ballad-in-goblets': 0,
        'sparkling-steps': 0,
        'gentry-of-hermitage': 0,
        'farewell-of-snezhnaya': 0,
        'secretum-secretorum': 0,
        'adrift-in-the-harbor': 0,
        'dance-of-lanterns': 0,
        'moment-of-bloom': 0,
        'ballad-in-goblets-2': 0,
        'farewell-of-snezhnaya-2': 0,
        'gentry-of-hermitage-2': 0,
        'born-of-ocean-swell': 0,
        'sparkling-steps-2': 0,
        'leaves-in-the-wind': 0,
        'the-herons-court': 0,
        'tapestry-of-golden-flames': 0,
        'reign-of-serenity': 0,
        'drifting-luminescence': 0,
        'moment-of-bloom-2': 0,
      }
    }
  }
  componentDidMount() {
    this.clearLocalStorageEveryNewBuild();
    this.loadData()
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
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
  syncWishCountersWithState() {
    this.setState({
      userWishes: {
        'beginners-wish': this.beginnersWish.getState().attemptsCount,
        'invitation-to-mundane-life': this.invitationToMundaneLife.getState().attemptsCount,
        'wanderlust-invocation': this.wanderlustInvocation.getState().attemptsCount,
        'epitome-invocation': this.epitomeInvocation.getState().attemptsCount,
        'ballad-in-goblets': this.balladInGoblets.getState().attemptsCount,
        'sparkling-steps': this.sparklingSteps.getState().attemptsCount,
        'gentry-of-hermitage': this.gentryOfHermitage.getState().attemptsCount,
        'farewell-of-snezhnaya': this.farewellOfSnezhnaya.getState().attemptsCount,
        'secretum-secretorum': this.secretumSecretorum.getState().attemptsCount,
        'adrift-in-the-harbor': this.adriftInTheHarbor.getState().attemptsCount,
        'dance-of-lanterns': this.danceOfLanterns.getState().attemptsCount,
        'moment-of-bloom': this.momentOfBloom.getState().attemptsCount,
        'ballad-in-goblets-2': this.balladInGoblets2.getState().attemptsCount,
        'farewell-of-snezhnaya-2': this.farewellOfSnezhnaya2.getState().attemptsCount,
        'gentry-of-hermitage-2': this.gentryOfHermitage2.getState().attemptsCount,
        'born-of-ocean-swell': this.bornOfOceanSwell.getState().attemptsCount,
        'sparkling-steps-2': this.sparklingSteps2.getState().attemptsCount,
        'leaves-in-the-wind': this.leavesInTheWind.getState().attemptsCount,
        'the-herons-court': this.theHeronsCourt.getState().attemptsCount,
        'tapestry-of-golden-flames': this.tapestryOfGoldenFlames.getState().attemptsCount,
        'reign-of-serenity': this.reignOfSerenity.getState().attemptsCount,
        'drifting-luminescence': this.driftingLuminescence.getState().attemptsCount,
        'moment-of-bloom-2': this.momentOfBloom2.getState().attemptsCount,
      }
    })
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
    this.danceOfLanterns.reset()
    this.momentOfBloom.reset()
    this.balladInGoblets2.reset()
    this.farewellOfSnezhnaya2.reset()
    this.gentryOfHermitage2.reset()
    this.bornOfOceanSwell.reset()
    this.sparklingSteps2.reset()
    this.leavesInTheWind.reset()
    this.theHeronsCourt.reset()
    this.tapestryOfGoldenFlames.reset()
    this.reignOfSerenity.reset()
    this.driftingLuminescence.reset()
    this.momentOfBloom2.reset()
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
      adriftInTheHarbor: this.adriftInTheHarbor.getState(),
      danceOfLanterns: this.danceOfLanterns.getState(),
      momentOfBloom: this.momentOfBloom.getState(),
      balladInGoblets2: this.balladInGoblets2.getState(),
      farewellOfSnezhnaya2: this.farewellOfSnezhnaya2.getState(),
      gentryOfHermitage2: this.gentryOfHermitage2.getState(),
      bornOfOceanSwell: this.bornOfOceanSwell.getState(),
      sparklingSteps2: this.sparklingSteps2.getState(),
      leavesInTheWind: this.leavesInTheWind.getState(),
      theHeronsCourt: this.theHeronsCourt.getState(),
      tapestryOfGoldenFlames: this.tapestryOfGoldenFlames.getState(),
      reignOfSerenity: this.reignOfSerenity.getState(),
      driftingLuminescence: this.driftingLuminescence.getState(),
      momentOfBloom2: this.momentOfBloom2.getState(),
    }
    localStorage.setItem('data', JSON.stringify(data))
    this.syncWishCountersWithState()
  }
  loadData(){
    const data = JSON.parse(localStorage.getItem('data'))
    if(!data) return;
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
      this.danceOfLanterns.attemptsCount = data.danceOfLanterns || 0
      this.momentOfBloom.attemptsCount = data.momentOfBloom || 0
      this.balladInGoblets2.attemptsCount = data.balladInGoblets2 || 0
      this.farewellOfSnezhnaya2.attemptsCount = data.farewellOfSnezhnaya2 || 0
      this.gentryOfHermitage2.attemptsCount = data.gentryOfHermitage2 || 0
      this.bornOfOceanSwell.attemptsCount = data.bornOfOceanSwell || 0
      this.sparklingSteps2.attemptsCount = data.sparklingSteps2 || 0
      this.leavesInTheWind.attemptsCount = data.leavesInTheWind || 0
      this.theHeronsCourt.attemptsCount = data.theHeronsCourt || 0
      this.tapestryOfGoldenFlames.attemptsCount = data.tapestryOfGoldenFlames || 0
      this.reignOfSerenity.attemptsCount = data.reignOfSerenity || 0
      this.driftingLuminescence.attemptsCount = data.driftingLuminescence || 0
      this.momentOfBloom2.attemptsCount = data.momentOfBloom2 || 0
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
      this.danceOfLanterns.setState(data.danceOfLanterns)
      this.momentOfBloom.setState(data.momentOfBloom)
      this.balladInGoblets2.setState(data.balladInGoblets2)
      this.farewellOfSnezhnaya2.setState(data.farewellOfSnezhnaya2)
      this.gentryOfHermitage2.setState(data.gentryOfHermitage2)
      this.bornOfOceanSwell.setState(data.bornOfOceanSwell)
      this.sparklingSteps2.setState(data.sparklingSteps2)
      this.leavesInTheWind.setState(data.leavesInTheWind)
      this.theHeronsCourt.setState(data.theHeronsCourt)
      this.tapestryOfGoldenFlames.setState(data.tapestryOfGoldenFlames)
      this.reignOfSerenity.setState(data.reignOfSerenity)
      this.driftingLuminescence.setState(data.driftingLuminescence)
      this.momentOfBloom2.setState(data.momentOfBloom2)
      this.setState({
        isBeginnersWishLimited,
        isBeginnersWishOver10,
        inventory,
        selectedCharacterEventWish
      }, () => {
          this.backToHome()
          this.syncWishCountersWithState()
        if(data.beginnersWish.attemptsCount >= 20) {
          this.setBeginnersWishDisable(true)
        }
        if (data.beginnersWish.attemptsCount > 10) {
          this.setBeginnersWishOver10()
        }
      })

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
          selectedCharacterEventWish,
          userWishes
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
              userWishes={userWishes}
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
