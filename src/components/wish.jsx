import React from 'react';
import fourStarClip from '../assets/images/ui/4starwish.mp4'
import fiveStarClip from '../assets/images/ui/5starwish.mp4'

export default function Wish(props) {
  const { setView, is5StarItem } = props
  return (
    <>
    <button
    onClick={() => setView('wish-results')}
    className="skip-button">Skip</button>
    <video
    autoPlay={true}
    className="min-vh-100 w-100 overflow-hidden"
    onEnded={() => setView('wish-results')}
    playsInline={true}
    >
      <source
        src={is5StarItem ? fiveStarClip : fourStarClip}
        type="video/mp4"/>
    </video>
    </>
  )
}
