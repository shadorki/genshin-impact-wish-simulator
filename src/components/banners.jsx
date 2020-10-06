import React, { Component } from 'react';
import BannerButton from './banner-button';
import { Carousel } from 'react-responsive-carousel';
export default class Banners extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBanner: 'novice-wishes',
    }
    this.banners = {
      'novice-wishes': 'Novice Wishes',
      'character-event-wish': 'Character Event Wish',
      'weapon-event-wish': 'Weapon Event Wish',
      'standard-wish': 'Standard Wish'
    }
  }
  switchBanner(selectedBanner) {
    this.setState({selectedBanner})
  }
  get bannerText() {
    return this.banners[this.state.selectedBanner]
  }
  render() {
    const { selectedBanner } = this.state
    return (
      <div className="container banners">
        <div className="heading">
          <div className="current-banner">
            <div>{this.bannerText}</div>
          </div>
          <div className="select-banner">
            {
              Object.keys(this.banners).map(banner => (
                <BannerButton
                key={banner}
                isSelected={banner === selectedBanner}
                className={banner}
                onClick={() => this.switchBanner(banner)}
                />
              ))
            }
          </div>
          <div className="close-window"></div>
        </div>
        <div className="carousel-container">
          <Carousel
            className={"carousel"}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            swipeable={true}
            emulateTouch={true}
            dynamicHeight={true}
            infiniteLoop={true}
          >
            <div>
              <img src="../assets/images/banners/beginners-wish.png" />
            </div>
            <div>
              <img src="../assets/images/banners/ballad-in-goblets.png" />
            </div>
            <div>
              <img src="../assets/images/banners/epitome-invocation.png" />
            </div>
            <div>
              <img src="../assets/images/banners/wanderlust-invocation.png" />
            </div>
          </Carousel>
        </div>
      </div>
    )
  }
}
