import React from "react";

import musicList from "Config/musicList.json";

import style from "./home.scss";

import * as  path from "path-browserify"

import thumbnail from "Assets/Images/music.png";

const MusicListCard: React.FC<{ content: musicListContent }> = (props) => {

    const thumbnailImage = path.join("musics", props.content.dir, "thumbnail.png");

    return (
        <div className={style.card}>
            <img draggable="false" src={thumbnailImage} onError={(e) => e.currentTarget.src = thumbnail} />
            <h1>{props.content.name}</h1>
            <h4> //By {props.content.artist}</h4>
            <div>
                Time : {props.content.duration} <br />
                BPM : {props.content.bpm} <br />
                Chart Designer : {props.content.nd}
            </div>
            <div className={`${style.diff} ${style[props.content.diff]}`}>
                <span className={style.label}>
                    //{props.content.diff}
                    </span>
                <h3 className={style.text}>
                    {props.content.lev}
                </h3>
            </div>
        </div>
    )
}

export default MusicListCard;