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
  onCarouselChange(index) {
    this.switchBanner(Object.keys(this.banners)[index])
  }
  switchBanner(selectedBanner) {
    this.setState({selectedBanner})
  }
  get bannerText() {
    return this.banners[this.state.selectedBanner]
  }
  render() {
    const { selectedBanner } = this.state
    const bannerKeys = Object.keys(this.banners);
    const selectedBannerIndex = bannerKeys.findIndex(b => b === selectedBanner)
    return (
      <div className="container banners">
        <div className="heading">
          <div className="current-banner">
            <div>{this.bannerText}</div>
          </div>
          <div className="select-banner">
            {
              bannerKeys.map(banner => (
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
            emulateTouch={true}
            showArrows={false}
            infiniteLoop={true}
            selectedItem={selectedBannerIndex}
            onChange={this.onCarouselChange.bind(this)}
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
        <div className="action-container">
            <div className="button-container">
              <button
              onClick={() => this.props.setView('details')}
              >Details</button>
              <button>History</button>
            </div>
            <div className="wish-container">
              <div className="wish-button">
                Wish x10
              </div>
            </div>
        </div>
      </div>
    )
  }
}
