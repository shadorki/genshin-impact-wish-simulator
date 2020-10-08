import React from 'react'
import { Row, Col } from 'reactstrap';

export default function Title(props) {
  return (
    <Row className="py-4">
      <Col xs="12" className="text-left dark-gray-bg pl-5">
        {props.children}
      </Col>
    </Row>
  )
}
