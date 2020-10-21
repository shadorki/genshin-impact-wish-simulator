import React from 'react';

export default function Modal(props) {
  const { hideModal } = props
  return(
    <div
    onClick={hideModal}
    className="modal-container">
      <div className="disclaimer-modal m-2"
      onClick={e => e.stopPropagation()}
      >
        <div className="disclaimer-modal-content p-2">
        <div
        onClick={hideModal}
        className="close-button"></div>
          <h2>Disclaimer</h2>
          <p>
            This Genshin Impact Wish Simulator was only created for fun and absolutely no monetary gain.
          </p>
          <p>
            I am someone who enjoys playing Genshin Impact and enjoys building applications for fun.
            I am not affiliated with Mihoyo, all assets in this application were taken from third party websites and some screenshotted from the game itself.
          </p>
          <p>
            If you are someone from Mihoyo and would like this website taken down please email me <a href="mailto:uzinatorcl@gmail.com">here</a> and I shall do so.
          </p>
          <p>
            Pls don't get me in trouble this was just for fun T_T
          </p>
          <p>
            The source code is available <a href="https://github.com/uzair-ashraf/genshin-impact-wish-simulator" target="_blank">here</a>, please give it a star if you like it!
          </p>
          <p>
            All product names, logos, and brands are property of their respective owners in the United States and/or other countries.
          </p>
        </div>
      </div>
    </div>
  )
}
