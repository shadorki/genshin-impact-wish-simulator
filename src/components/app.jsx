import React, { Component } from 'react'
import Banners from './banners'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'banners'
    }
  }
  render () {
    return (
      <Banners/>
    )
  }
}
