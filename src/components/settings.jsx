import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characterBanner: this.props.selectedCharacterEventWish,
      language: 'English'
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
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
                      <option value="all">All</option>
                      <option value="characters">Characters</option>
                      <option value="weapons">Weapons</option>
                      <option value="fiveStars">5 Stars</option>
                      <option value="fourStars">4 Stars</option>
                      <option value="threeStars">3 Stars</option>
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
