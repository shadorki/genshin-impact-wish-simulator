import React from 'react';
import { Row, Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";

export default function StarsBar(props) {
  const { starCount, content, bgColor} = props
  return (
    <Row>
      <Col xs="12" className="mt-3" style={{
        backgroundColor: bgColor
      }}>
        <Row className="align-items-center">
          <Col
            xs="5"
            md="2"
            className="react-stars-container">
            <ReactStars
              count={starCount}
              size={24}
              edit={false}
              color="#ffd700"
            />
          </Col>
          <Col
            xs="7"
            md="10"
            className="text-left">
            {content}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
