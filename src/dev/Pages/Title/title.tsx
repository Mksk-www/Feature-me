import React from "react"
import style from "./title.scss";

const Title: React.FC = () => {
    return (
        <div className={style.titlepage} >
            <div className={style.background}>
                <div className={style.blue}></div>
                <div className={style.green}></div>
            </div>
                Feature Me
        </div>
    )
}

export default Title;