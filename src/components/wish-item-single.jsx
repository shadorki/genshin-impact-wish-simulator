import React from 'react'
import { Col, Row } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import { withTranslation } from 'react-i18next';

const characterImages = require.context('../assets/images/characters');
const weaponImages = require.context('../assets/images/weapons');
const characterIcons = require.context('../assets/images/details/character-icons');
function WishItemSingle(props) {
  const { isNewItem, t } = props
  const {src, name, rating, type} = props.item
  const isCharacter = type === 'character'
  const backgroundImage = `url('${isCharacter ? characterImages('./' + src).default : weaponImages('./' + src).default}')`
  return (
      <Col
      xs="12"
      className="h-100 p-4"
      >
        <Row
        className="wish-item-single-container h-100 p-2"
        >
        {
          isNewItem && <span className="new-badge">New</span>
        }
          <Col
            className="h-100 d-flex flex-column justify-content-center align-items-center wish-item-single-content"
            style={{
              background: isCharacter && `url('${characterIcons(`./${name}-Icon.png`).default}') left / 20% no-repeat`
            }}
            sm="12"
            md="3"
            >
            <div
              className="text-center text-wrap pb-1">{t(name)}</div>
            <ReactStars
              count={rating}
              size={24}
              edit={false}
              color="#ffd700"
              classNames={"justify-content-center"}
            />
          </Col>
          <Col
            className="wish-item-single h-100 w-100"
            style={{
              backgroundImage,
              backgroundSize: isCharacter ? 'contain' : 'inherit'
            }}
            sm="12"
            md="9"
            >
          </Col>
        </Row>
      </Col>
  )
}
export default withTranslation()(WishItemSingle);