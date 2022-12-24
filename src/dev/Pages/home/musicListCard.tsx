import React from "react";
import path from "path-browserify";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import selectedMusicState from "State/selectedMusicState";

import style from "./home.scss";

import thumbnail from "Assets/Images/music.png";


const MusicListCard: React.FC<{ content: musicListContent }> = (props) => {

    const setMusic = useSetAtom(selectedMusicState);
    const navigate = useNavigate()

    const thumbnailImage = path.join("musics", props.content.dir, "thumbnail.png");

    function handleClick() {
        setMusic(props.content.name);
        navigate("/play")
    }

    return (
        <div className={style.card} onClick={handleClick}>
            <img draggable="false" src={thumbnailImage} onError={(e) => e.currentTarget.src = thumbnail} />
            <h1>{props.content.name}</h1>
            <h4> //By {props.content.artist}</h4>
            <div className={style.details}>
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