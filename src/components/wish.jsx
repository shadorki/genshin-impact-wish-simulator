import React from 'react';
import gachaClip from '../assets/images/ui/gacha.mp4'

export default function Wish(props) {
  const { setView } = props
  return (
    <video
    autoPlay={true}
    className="min-vh-100 w-100 overflow-hidden"
    onEnded={() => setView('banners')}
    >
      <source
        src={gachaClip}
        type="video/mp4"/>
    </video>
  )
}
