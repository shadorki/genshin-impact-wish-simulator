import React from 'react'
import { Row, Col } from 'reactstrap';

export default function SubheadingSeparator(props) {
  const { content } = props
  return (
    <Row className="mt-4">
      <Col xs="4">
        <h3>{content}</h3>
      </Col>
      <Col xs="8">
        <hr />
      </Col>
    </Row>
  )
}
