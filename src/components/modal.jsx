import React from "react";
import sponsor from '../assets/images/sponsor.png'

export default function Modal(props) {
  const { hideModal } = props;
  return (
    <div onClick={hideModal} className="modal-container">
      <div
        className="disclaimer-modal m-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="disclaimer-modal-content p-2">
          <div onClick={hideModal} className="close-button"></div>
          <h2>Disclaimer</h2>
          <p>
            I am not affiliated with Mihoyo, all assets in this application were
            taken from third party websites and some screenshotted from the game
            itself.
          </p>
          <p>
            If you are someone from Mihoyo and would like this website taken
            down please email me <a href="mailto:uzinatorcl@gmail.com">here</a>{" "}
            and I shall do so.
          </p>
          <p>
            The source code is available{" "}
            <a
              href="https://github.com/uzair-ashraf/genshin-impact-wish-simulator"
              target="_blank"
            >
              here
            </a>
            , please give it a star if you like it!
          </p>
          <p>
            All product names, logos, and brands are property of their
            respective owners in the United States and/or other countries.
          </p>
          <p>
            Sponsored By:
          </p>
          <a href="https://chrome.google.com/webstore/detail/coupon-cat/ndpmdcidjakfglhdplgnkncjhcfdoglm" target="_blank">
            <img
              height="40"
              className="my-2"
              style={{ border: "0px", height: "40px" }}
              src={sponsor}
              border="0"
              alt="Coupon Cat"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
