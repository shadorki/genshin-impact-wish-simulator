import React from 'react'
import { Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import { withTranslation } from 'react-i18next';

const characterImages = require.context('../assets/images/characters');
const weaponImages = require.context('../assets/images/weapons');
function WishItem(props) {
  const { isNewItem, t } = props
  const {src, name, rating, type} = props.item

  return (
    <Col
    xs="2"
    md="1"
    style={{
      backgroundImage: `url('${type === 'character' ? characterImages('./' + src).default : weaponImages('./' + src).default}')`
    }}
    className={`wish-item ${type} mx-1 px-0`}>
      {
        isNewItem && <span className="new-badge">New</span>
      }
      <div
      className="h-100 react-stars-container d-flex flex-column align-content-center justify-content-end pb-2">
        <div className="text-center text-wrap pb-1">{t(name)}</div>
        <ReactStars
          count={rating}
          size={12}
          edit={false}
          color="#ffd700"
          classNames={"justify-content-center"}
        />
      </div>
    </Col>
  )
}
export default withTranslation()(WishItem);
