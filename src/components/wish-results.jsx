import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import WishItem from './wish-item'
export default function WishResults(props) {
  const { wishData } = props
  console.log(wishData)
  return (
    <div className="wish-results">
      <Container>
        <Row className="vh-10">
          <Col xs="12">
            <div className="d-flex justify-content-end mt-2">
              <div className="close-button"></div>
            </div>
          </Col>
        </Row>
        <Row className="vh-90 justify-content-center align-items-center">
        {
          wishData.map((item, index) => (
            <WishItem
            key={index}
            item={item}
            />
          ))
        }
        </Row>
      </Container>
    </div>
  )
}
