import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Title from './details-components/title'
import Navbar from './details-components/navbar'
import ListView from './inventory-components/list-view'

export default class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'listView',
      orderBy: 'rating'
    }
  }
  render() {
    const { backToHome, inventory } = this.props
    const { orderBy } = this.state
    const inventoryList = Object.values(inventory)
    const sorting = {
      rating: (item1, item2) => item2.rating - item1.rating
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
                  'No Items'
                )
              }
            </Row>
          </Container>
        </div>
      </>
    )
  }
}
