import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

export default function Navbar(props) {
  return (
    <div className="navbar">
      <FontAwesomeIcon icon={faUndo} onClick={props.backToHome} />
    </div>
  )
}
