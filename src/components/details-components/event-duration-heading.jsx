import React from 'react'
import { Row, Col } from 'reactstrap';

export default function EventDurationHeading(props) {
  const { content } = props
  return (
    <Row className="my-2">
      <Col xs="12" className="py-1" style={{
        color: 'white',
        backgroundColor: '#a38052'
      }}>
        <h4>
          {content}
        </h4>
      </Col>
    </Row>
  )
}
