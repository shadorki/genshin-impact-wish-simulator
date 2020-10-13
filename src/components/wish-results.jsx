import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import WishItem from './wish-item'
export default class WishResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishData: []
    }
  }
  componentDidMount() {
    const wishData = this.props.wish()
    this.setState({ wishData })
  }
  render() {
    const { wish, setView } = this.props
    const { wishData } = this.state
    console.log(wishData)
    return (
      <div className="wish-results">
        <Container>
          <Row className="vh-10">
            <Col xs="12">
              <div className="d-flex justify-content-end mt-2">
                <div onClick={() => setView('banners')} className="close-button"></div>
              </div>
            </Col>
          </Row>
          <Row className="vh-90 justify-content-center align-items-center">
            {
              wishData.sort((item1, item2) => item2.rating - item1.rating).map((item, index) => (
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
}
