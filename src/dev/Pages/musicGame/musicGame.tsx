import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import headerState from "State/headerState";
import musicList from "Config/musicList.json"

import style from "./musicGame.scss";



const MusicGame: React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);

    React.useEffect(() => {
        //update title
        setTitle("");
        //add shortcut
        window.addEventListener("keydown", (e) => {
            if (e.code == "Escape") navigate("/settings");
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") navigate("/settings");
            })
        }
    }, [])

    return (
        <div className={style.musicGame}>
        </div>
    )
}

export default MusicGame;