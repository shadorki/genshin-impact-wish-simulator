import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import WishItem from './wish-item'
export default class WishResults extends Component {
  isNewItem(key) {
    return !this.props.inventory[key]
  }
  render() {
    const { wishes, setView, updateInventory } = this.props
    return (
      <div className="wish-results">
        <Container>
          <Row className="vh-10">
            <Col xs="12">
              <div className="d-flex justify-content-end mt-2">
                <div onClick={() => {
                  setView('banners');
                  updateInventory(wishes.map(item => Object.assign({}, item)));
                }} className="close-button"></div>
              </div>
            </Col>
          </Row>
          <Row className="vh-90 justify-content-center align-items-center">
            {
              wishes.sort((item1, item2) => item2.rating - item1.rating).map((item, index) => (
                <WishItem
                  key={index}
                  item={item}
                  isNewItem={this.isNewItem(item.name)}
                />
              ))
            }
          </Row>
        </Container>
      </div>
    )
  }
}
