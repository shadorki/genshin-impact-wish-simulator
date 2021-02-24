import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterBanner: this.props.selectedCharacterEventWish,
      language: 'English'
    }
    this.banners = {
      'ballad-in-goblets': 'Ballad In Goblets',
      'sparkling-steps': 'Sparkling Steps',
      'farewell-of-snezhnaya': 'Farewell of Snezhnaya',
      'invitation-to-mundane-life': 'Invitation to Mundane Life',
      'adrift-in-the-harbor': 'Adrift in the Harbor'
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => console.log(this.state))
  }
  renderBannerOptions() {
    const bannerArray = []
    for(const banner in this.banners) {
      bannerArray.push((
        <option
          key={banner}
          value={banner}
          selected={banner === this.state.characterBanner}
        >
          {this.banners[banner]}
        </option>
      ))
    }
    return bannerArray
  }
  render() {
    const {
      reset,
      selectedCharacterEventWish,
      updateCharacterEventWish,
      closeSettings
    } = this.props
    console.log({
      reset,
      selectedCharacterEventWish,
      updateCharacterEventWish,
      closeSettings
    })
    return (
      <div
        onClick={closeSettings}
        className="modal-container">
        <div
          onClick={e => e.stopPropagation()}
          className="settings-modal">
          <div className="settings-modal-content p-2">
            <div
              onClick={closeSettings}
              className="close-button"></div>
            <h2>Settings</h2>
            <Form>
              <Container>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                    <Label for="characterBanner">Character Banner</Label>
                    <Input
                      type="select"
                      name="characterBanner"
                      id="characterBanner"
                      onChange={this.onChange}
                    >
                      {
                        this.renderBannerOptions()
                      }
                    </Input>
                  </FormGroup>
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
