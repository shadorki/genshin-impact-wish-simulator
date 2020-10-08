import React from 'react'
import { Row, Col } from 'reactstrap';

export default function Table(props) {
  const { items } = props
  const itemComponents = []
  for(let i = 0; i < items.length; i+=2) {
    const item1 = items[i]
    const item2 = items[i + 1]
    if(item2) {
      itemComponents.push((
        <tr key={item1.name}>
          <td>{item1.type}</td>
          <td>{item1.name}</td>
          <td>{item2.type}</td>
          <td>{item2.name}</td>
        </tr>
      ))
    } else {
      itemComponents.push((
        <tr key={item1.name}>
          <td>{item1.type}</td>
          <td>{item1.name}</td>
        </tr>
      ))
    }
  }
  return (
    <Row className="mt-4">
      <Col xs="12">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Item Type</th>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Item Name</th>
              </tr>
            </thead>
            <tbody>
              {itemComponents}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  )
}
