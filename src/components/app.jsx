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
  }
  setView(view) {
    this.setState({view})
  }
  setCurrentDetails(currentDetails) {
    this.setState({currentDetails})
  }
  render () {
    {currentDetails} = this.state
        switch(this.state.view) {
          case 'banners':
            return <Banners
              setView={this.setView.bind(this)}
              setCurrentDetails={this.setCurrentDetails.bind(this)}
            />
          case 'details':
            return <Details
            setView={this.setView.bind(this)}
            currentDetails={currentDetails}
            />
        }
  }
}
