import React from 'react'
import { Row, Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import weaponBackground from '../../assets/images/details/weapon-backgrounds/background.jpg'
import characterBackground from '../../assets/images/details/character-backgrounds/background.png'

const characterDetailsThumbs = require.context('../../assets/images/characters/thumbnails')
const weaponDetailsThumbs = require.context('../../assets/images/weapons')
const backgroundElements = require.context('../../assets/images/details/character-icons')

export default function IconView(props) {
  const { name, type, rating, src, quantity } = props.item
  const backgroundStyle = type === 'weapon'
    ? {
      backgroundImage: `url('${weaponBackground}')`
     }
    : {
      background: `url('${backgroundElements(`./${name}-Icon.png`).default}') right / 20% no-repeat, url('${characterBackground}') no-repeat center / contain`
    }

  return(
    <Col
      lg="6"
      xl="4"
      className="m-2 p-3 text-center icon-item"
      style={backgroundStyle}
    >
        <Row className="h-100">
          <Col
          xs='6'
          className="d-flex justify-content-center align-items-center">
            <Row>
            <Col xs='12' className='d-flex justify-content-center align-items-center'>
              <img
                src={type === 'weapon' ? weaponDetailsThumbs(`./${src}`).default : characterDetailsThumbs(`./${name.toLowerCase()}.png`).default}
                className="img-fluid"
                style={{
                  maxHeight: '64px'
                }}
              />
              </Col>
            <Col xs='12' className="d-flex justify-content-center align-items-center mt-2">
              {name}
            </Col>
            </Row>
          </Col>
          <Col
          xs='6'
          >
          <Row className='justify-content-center align-items-center h-100'>
            <Col
              xs='12'
              className="d-flex justify-content-center align-items-center p-0">
              <ReactStars
                count={rating}
                size={16}
                edit={false}
                color="#ffd700"
              />
            </Col>
            <Col
              xs='12'
              className="d-flex justify-content-center align-items-center">
              X {quantity}
            </Col>
            </Row>
          </Col>
        </Row>
    </Col>
  )
}
