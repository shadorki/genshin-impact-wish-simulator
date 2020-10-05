import React from 'react'

export default function BannerButton(props) {
  const {isSelected, className, onClick} = props;
  return (
    <div
    className={`banner-button ${className} ${isSelected ? 'selected': ''}`}
    onClick={onClick}
    ></div>
  )
}
