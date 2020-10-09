import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
import Wish from './wish'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'details',
      currentDetails: 'wanderlust-invocation'
    }
    this.setView = this.setView.bind(this)
  }
  setView(view) {
    this.setState({view})
  }
  backToHome() {
    this.setState({
      view: 'banners',
      currentDetails: 'beginners-wish'
    })
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  render () {
    const {currentDetails} = this.state
        switch(this.state.view) {
          case 'banners':
            return <Banners
              setView={this.setView}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
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
        }
  }
}
