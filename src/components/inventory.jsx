import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Title from './details-components/title'
import Navbar from './details-components/navbar'
import ListView from './inventory-components/list-view'
import sadPaimon from '../assets/images/sad-paimon.png'

export default class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'listView',
      orderBy: 'rating'
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange({target: {name, value}}) {
    this.setState({[name]: value})
  }
  render() {
    const { backToHome, inventory } = this.props
    const { orderBy } = this.state
    const inventoryList = Object.values(inventory)
    const sorting = {
      rating: (item1, item2) => item2.rating - item1.rating,
      quantity: (item1, item2) => item2.quantity - item1.quantity,
      name: (item1, item2) => item1.name.localeCompare(item2.name),
    }
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
                <Col xs="6">
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
                <Col xs="6">
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
              </Row>
            </Form>
            <Row>
              {
                inventoryList.length
                ? (
                  inventoryList.sort(sorting[orderBy]).map(item => (
                    <ListView
                    key={item.name}
                    item={item}
                    />
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
