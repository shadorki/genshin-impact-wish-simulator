import React from 'react';
import fourStarClip from '../assets/images/ui/4starwish.mp4'
import fourStarClipSingle from '../assets/images/ui/4starwish-single.mp4'
import fiveStarClip from '../assets/images/ui/5starwish.mp4'
import fiveStarClipSingle from '../assets/images/ui/5starwish-single.mp4'

export default function Wish(props) {
  const { setView, is5StarItem, isSingleItem } = props
  return (
    <>
    <button
    onClick={() => setView('wish-results')}
    className="skip-button">Skip</button>
    <video
    className="min-vh-100 w-100 overflow-hidden"
    onEnded={() => setView('wish-results')}
    playsInline
    autoPlay
    muted
    >
      <source
        src={
          isSingleItem
          ? (
            is5StarItem ? fiveStarClipSingle : fourStarClipSingle
          )
          : (
            is5StarItem ? fiveStarClip : fourStarClip
          )
        }
        type="video/mp4"/>
    </video>
    </>
  )
}
