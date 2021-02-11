import React from 'react';
import fourStarClip from '../assets/images/ui/4starwish.mp4'
import fourStarClipSingle from '../assets/images/ui/4starwish-single.mp4'
import threeStarClipSingle from '../assets/images/ui/3starwish-single.mp4'
import fiveStarClip from '../assets/images/ui/5starwish.mp4'
import fiveStarClipSingle from '../assets/images/ui/5starwish-single.mp4'
import { useTranslation } from 'react-i18next';

export default function Wish(props) {
  const { t, i18n } = useTranslation();
  const { setView, is4StarItem, is5StarItem, isSingleItem } = props
  return (
    <>
    <button
    onClick={() => setView('wish-results')}
    className="skip-button">{t("Skip")}</button>
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
            is5StarItem ? fiveStarClipSingle : (is4StarItem ? fourStarClipSingle : threeStarClipSingle)
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
