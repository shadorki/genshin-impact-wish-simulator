import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterBanner: this.props.getFormattedCharacterEventWish('kebabCase'),
      language: 'English'
    }
    this.banners = {
      'ballad-in-goblets': 'Ballad In Goblets',
      'sparkling-steps': 'Sparkling Steps',
      'gentry-of-hermitage': 'Gentry Of Hermitage',
      'farewell-of-snezhnaya': 'Farewell of Snezhnaya',
      'secretum-secretorum': 'Secretum Secretorum',
      'adrift-in-the-harbor': 'Adrift in the Harbor',
      'invitation-to-mundane-life': 'Invitation to Mundane Life',
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }
  submitChanges(e) {
    e.preventDefault()
    const {
      closeSettings,
      updateCharacterEventWish,
      saveData
    } = this.props
    const { characterBanner } = this.state
    updateCharacterEventWish(characterBanner)
    closeSettings()
    saveData()
  }
  renderBannerOptions() {
    const bannerArray = []
    for(const banner in this.banners) {
      bannerArray.push((
        <option
          key={banner}
          value={banner}
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
      updateCharacterEventWish,
      closeSettings
    } = this.props
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
            <Form
            onSubmit={this.submitChanges.bind(this)}
            >
              <Container>
                <Row>
                  <Col xs="12">
                    <FormGroup className="text-left">
                      <Label for="characterBanner" className="pb-1 pl-1 h5">Character Banner</Label>
                      <Input
                        type="select"
                        name="characterBanner"
                        id="characterBanner"
                        defaultValue={this.state.characterBanner}
                        onChange={this.onChange}
                      >
                        {
                          this.renderBannerOptions()
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <div className="button-container justify-content-around my-2">
                      <button
                      onClick={() => {
                          reset()
                          closeSettings()
                      }}
                      type="button">Reset Inventory</button>
                      <button>Apply Changes</button>
                    </div>
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
