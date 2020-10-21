import React from 'react'
import { Row, Col } from 'reactstrap';

const characterBackgrounds = require.context('../../assets/images/details/character-backgrounds');
const weaponBackgrounds = require.context('../../assets/images/details/weapon-backgrounds');
const characterDetailsThumbs = require.context('../../assets/images/details/characters')
const weaponDetailsThumbs = require.context('../../assets/images/details/weapons')
export default function DetailsBox(props) {
  const {src, title, isWeapon, element} = props
  return (
    <Col
    xs="12"
    sm="6"
    md="4"
    className="details-box my-3"
    style={{
      backgroundImage: `url('${isWeapon ? weaponBackgrounds('./background.jpg').default : characterBackgrounds(`./background-${element}.png`).default}')`
    }}
    >
      <Row className="h-100 align-items-center p-4">
        <Col xs="4">
          <img src={isWeapon ? weaponDetailsThumbs(`./${src}`).default : characterDetailsThumbs(`./${title}.png`).default} className="img-fluid" />
        </Col>
        <Col xs="8">
          <h5 className="text-white text-capitalize">
            {title}
          </h5>
          <hr className="text-white"/>
        </Col>
      </Row>
    </Col>
  )
}
