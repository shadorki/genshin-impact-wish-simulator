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
          <h2>免责声明(Disclaimer)</h2>
          <p>
            这个原神祈愿模拟器只是为了好玩，绝对没有金钱收益。
          </p>
          <p>
            This Genshin Impact Wish Simulator was only created for fun and absolutely no monetary gain.
          </p>
          <p>
            我是一个喜欢玩原神的人，喜欢为乐趣而构建应用程序。
          </p>
          <p>
            I am someone who enjoys playing Genshin Impact and enjoys building applications for fun.
          </p>
          <p>
            我不隶属于米哈游，在这个应用程序中的所有资产是从第三方网站和一些游戏本身截图。
          </p>
          <p>
            I am not affiliated with Mihoyo, all assets in this application were taken from third party websites and some screenshotted from the game itself.
          </p>
          <p>
            如果您是来自米哈游的人，希望关闭此网站，请给我发电子邮件<a href="mailto:uzinatorcl@gmail.com">这里</a>我会这么做的。
          </p>
          <p>
            If you are someone from Mihoyo and would like this website taken down please email me <a href="mailto:uzinatorcl@gmail.com">here</a> and I shall do so.
          </p>
          <p>
            请不要给我惹麻烦这只是为了好玩T_T
          </p>
          <p>
            Pls don't get me in trouble this was just for fun T_T
          </p>
          <p>
            源代码可用<a href="https://github.com/uzair-ashraf/genshin-impact-wish-simulator" target="_blank">这里</a>，如果您喜欢，请给它一颗星星！
          </p>
          <p>
            The source code is available <a href="https://github.com/uzair-ashraf/genshin-impact-wish-simulator" target="_blank">here</a>, please give it a star if you like it!
          </p>
          <p>
            所有产品名称、徽标和品牌均为其各自所有者在美国和/或其他国家的财产。
          </p>
          <p>
            All product names, logos, and brands are property of their respective owners in the United States and/or other countries.
          </p>
          <p>
            （所有翻译均为机翻）
          </p>
        </div>
      </div>
    </div>
  )
}
