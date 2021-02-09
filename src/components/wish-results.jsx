import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import WishItem from './wish-item'
import WishItemSingle from './wish-item-single'
import characters from '../data/characters.json'
export default class WishResults extends Component {
  isNewItem(key) {
    return !this.props.inventory[key]
  }
  getPercentX(item) {
    if (item.type === 'character') {
      let matches = characters.filter(c => c.name === item.name);
      if (matches.length === 1) {
        return matches[0].percentX || 50;
      } else {
        console.log('Cannot find character '+item.name+' in characters.json');
        return 50;
      }
    } else {
      return 50;
    }
  }
  render() {
    const { wishes, setView, updateInventory } = this.props
    const isSingleItem = wishes.length === 1
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
              isSingleItem
              ? (
                <WishItemSingle
                item={wishes[0]}
                isNewItem={this.isNewItem(wishes[0].name)}
                />
              )
              : (
                wishes.sort((item1, item2) => item2.rating - item1.rating).map((item, index) => (
                  <WishItem
                    key={index}
                    item={item}
                    isNewItem={this.isNewItem(item.name)}
                    characterPercentX={this.getPercentX(item)}
                  />
                  ))
              )
            }
          </Row>
        </Container>
      </div>
    )
  }
}
