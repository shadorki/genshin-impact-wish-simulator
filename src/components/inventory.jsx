import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Title from './details-components/title'
import Navbar from './details-components/navbar'
import ListView from './inventory-components/list-view'
import sadPaimon from '../assets/images/sad-paimon.png'
import IconView from './inventory-components/icon-view';

export default class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'listView',
      orderBy: 'rating',
      showOnly: 'all'
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({target: {name, value}}) {
    this.setState({[name]: value})
  }
  calculateAmountSpent(list) {
    let wishes = list.reduce((acc, curr) => acc + curr.quantity, 0)
    return `$${((0.0129 * 160) * wishes).toFixed(2)}`
  }
  render() {
    const { backToHome, inventory } = this.props
    const { orderBy, view, showOnly } = this.state
    const inventoryList = Object.values(inventory)
    const sorting = {
      rating: (item1, item2) => item2.rating - item1.rating,
      quantity: (item1, item2) => item2.quantity - item1.quantity,
      name: (item1, item2) => item1.name.localeCompare(item2.name),
    }
    const showFilter = {
      all: item => item,
      characters: item => item.type === 'character',
      weapons: item => item.type === 'weapon',
      fiveStars: item => item.rating === 5,
      fourStars: item => item.rating === 4,
      threeStars: item => item.rating === 3
    }
    // est cost per primogen, 1600 gems per 10 wishes
    const amountSpent = this.calculateAmountSpent(inventoryList)
    return (
      <>
        <Navbar
          backToHome={backToHome}
        />
        <div className="details pt-5 min-vh-100">
          <Container>
            <Title>
              <h1>| Inventory</h1>
            </Title>
            <Form
            onSubmit={e => e.preventDefault()}
            >
              <Row>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="orderBy">Order By</Label>
                    <Input
                      type="select"
                      name="orderBy"
                      id="orderBy"
                      onChange={this.onChange}
                    >
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                      <option value="quantity">Quantity</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="showOnly">Show Only</Label>
                    <Input
                      type="select"
                      name="showOnly"
                      id="showOnly"
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
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label for="view">View</Label>
                    <Input
                    type="select"
                    name="view"
                    id="view"
                    onChange={this.onChange}
                    >
                      <option value="listView">List</option>
                      <option value="iconView">Icons</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="6" sm="3">
                  <FormGroup>
                    <Label>Spent</Label>
                      <Badge
                        color="warning"
                        className="amount-spent-badge"
                      >
                        {amountSpent}
                      </Badge>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Row className='justify-content-center'>
              {
                inventoryList.length
                ? (
                  inventoryList
                  .sort(sorting[orderBy])
                  .filter(showFilter[showOnly])
                  .map(item => (
                    view === 'listView'
                    ? (
                        <ListView
                          key={item.name}
                          item={item}
                        />
                    )
                    : (
                      <IconView
                        key={item.name}
                        item={item}
                      />
                    )
                  ))
                )
                : (
                  <Col xs='12' className="card p-4 d-flex justify-content-center align-items-center">
                    <h4 className="text-center mb-5">No Items :(</h4>
                    <img src={sadPaimon} alt="Sad paimon" className="mw-50"/>
                  </Col>
                )
              }
            </Row>
          </Container>
        </div>
      </>
    )
  }
}
