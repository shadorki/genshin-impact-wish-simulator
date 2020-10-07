import React, {Component} from 'react'
import { Container, Row, Col } from 'reactstrap';

export default class Details extends Component {
  render() {
    return (
      <div className="container details">
        <Container>
          <Row >
            <Col xs="12">
              | Event Wish "Ballad in Goblets"
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
