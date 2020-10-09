import React from 'react'
import { Container, Row, Col } from 'reactstrap';

export default function WishResults(props) {
  const { wishData } = props
  console.log(wishData)
  return (
    <div className="wish-results vh-100">
      <Container>
        <Row>
          <Col xs="12">
            <div className="d-flex justify-content-end">
              <div className="close-button"></div>
            </div>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  )
}
