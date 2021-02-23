import React, { Component } from 'react'

export default function Settings(props) {
  const {
    reset,
    selectedCharacterEventWish,
    updateCharacterEventWish,
    closeSettings
  } = props
  console.log({
    reset,
    selectedCharacterEventWish,
    updateCharacterEventWish,
    closeSettings
  })
  return (
    <div
    onClick={closeSettings}
    className="modal-container">
      <div
      onClick={e => e.stopPropagation()}
      className="settings-modal">
        <div className="settings-modal-content p-2">
          <div
          onClick={reset}
          className="close-button"></div>
          <h2>Settings</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto incidunt rem similique consequatur dicta aspernatur vero. Aspernatur quos non neque velit sequi, iusto officia ab omnis eligendi? Non, distinctio quaerat.
          </p>
        </div>
      </div>
    </div>
  )
}
