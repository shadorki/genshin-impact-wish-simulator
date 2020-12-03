import React, { Component } from 'react';
import BannerButton from './banner-button';
import { Carousel } from 'react-responsive-carousel';
import Modal from './modal';
const banners = require.context('../assets/images/banners', true);
export default class Banners extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBanner: 'beginners-wish',
      banners: {
        'beginners-wish': 'Novice Wishes',
        'gentry-of-hermitage': 'Character Event Wish',
        'epitome-invocation': 'Weapon Event Wish',
        'wanderlust-invocation': 'Standard Wish'
      },
      wishes: {
        'beginners-wish': 'beginnersWish',
        'gentry-of-hermitage': 'gentryOfHermitage',
        'epitome-invocation': 'epitomeInvocation',
        'wanderlust-invocation': 'wanderlustInvocation'
      },
      wasBeginnersWishDisabled: false
    }
  }
  componentDidMount() {
      this.toggleBeginnersWish(this.props.isBeginnersWishLimited)
      this.setState({selectedBanner: this.props.selectedBanner})
  }
  componentDidUpdate(prevProps) {
    if(prevProps.isBeginnersWishLimited !== this.props.isBeginnersWishLimited) {
      this.toggleBeginnersWish(this.props.isBeginnersWishLimited)
    }
  }
  onCarouselChange(index) {
    this.switchBanner(Object.keys(this.state.banners)[index])
  }
  switchBanner(selectedBanner) {
    this.setState({selectedBanner}, () => this.props.setCurrentDetails(selectedBanner))
  }
  get bannerText() {
    return this.state.banners[this.state.selectedBanner]
  }

  toggleBeginnersWish(isLimited) {
    if(isLimited) {
      this.setState({
        selectedBanner: 'gentry-of-hermitage',
        banners: {
          'gentry-of-hermitage': 'Character Event Wish',
          'epitome-invocation': 'Weapon Event Wish',
          'wanderlust-invocation': 'Standard Wish'
        },
        wishes: {
          'gentry-of-hermitage': 'gentryOfHermitage',
          'epitome-invocation': 'epitomeInvocation',
          'wanderlust-invocation': 'wanderlustInvocation'
        },
        wasBeginnersWishDisabled: isLimited
      })
    } else {
      this.setState({
        banners: {
          'beginners-wish': 'Novice Wishes',
          'gentry-of-hermitage': 'Character Event Wish',
          'epitome-invocation': 'Weapon Event Wish',
          'wanderlust-invocation': 'Standard Wish'
        },
        wishes: {
          'beginners-wish': 'beginnersWish',
          'gentry-of-hermitage': 'gentryOfHermitage',
          'epitome-invocation': 'epitomeInvocation',
          'wanderlust-invocation': 'wanderlustInvocation'
        },
        wasBeginnersWishDisabled: isLimited
      })
    }
  }
  render() {
    const { selectedBanner } = this.state
    const {
      wasDisclaimerSeen,
      setView,
      setSelectedWish,
      hideModal,
      reset,
      wish
      } = this.props
    const bannerKeys = Object.keys(this.state.banners);
    const selectedBannerIndex = bannerKeys.findIndex(b => b === selectedBanner)
    return (
      <>
      {
        wasDisclaimerSeen
        ? null
        : <Modal hideModal={hideModal}/>
      }
      <div className="wrapper banners">
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
            emulateTouch={false}
            showArrows={false}
            infiniteLoop={true}
            selectedItem={selectedBannerIndex}
            onChange={this.onCarouselChange.bind(this)}
          >
          {
            bannerKeys.map(banner => {
             return (
                <div key={banner}>
                  <img src={banners(`./${banner}.png`).default} />
                </div>
              )
            })
          }
          </Carousel>
        </div>
        <div className="action-container">
            <div className="button-container">
              <button
              onClick={() => setView('details')}
              >Details</button>
              <button
              onClick={() => setView('inventory')}
              >Inventory</button>
            </div>
            <div className="wish-container d-flex justify-content-center">
              <div
              className="wish-button"
              onClick={() => {
                wish(this.state.wishes[selectedBanner])
              }}
              >
                Wish x10
              </div>
              <div
                onClick={() => {
                  reset(selectedBanner);
                }}
                className="wish-button"
                >Reset</div>
            </div>
        </div>
      </div>
      </>
    )
  }
}
