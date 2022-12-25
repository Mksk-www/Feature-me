import React from "react";

import style from "./musicGame.scss";

import background from "Assets/Images/wallpaper.png";

const Background: React.FC = () => {

    return (
        <div className={style.background}  >
            <img src={background} alt="" />
        </div>
    )
}

export default Background;