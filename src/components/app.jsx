import React, { Component } from 'react'
import Banners from './banners'
import Details from './details'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'banners',
      currentDetails: null
    }
    this.setView = this.setView.bind(this)
  }
  setView(view) {
    this.setState({view})
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
            backToHome={() => this.setView('banners')}
            selectedDetail={currentDetails}
            />
        }
  }
}
