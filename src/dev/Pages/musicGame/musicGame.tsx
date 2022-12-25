import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import headerState from "State/headerState";
import selectedMusicState from "State/selectedMusicState";

import musicList from "Config/musicList.json"

import style from "./musicGame.scss";
import MusicTitle from "./musicTitle";
import GameLoader from "./GameLoader";
import gameDataState from "State/gameState";
import GameRenderer from "./GameRenderer";
import Background from "./background";



const MusicGame: React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const selectedMusic = useAtomValue(selectedMusicState);

    React.useEffect(() => {
        //update title
        setTitle(selectedMusic);
        //add shortcut
        window.addEventListener("keydown", (e) => {
            if (e.code == "Escape") navigate("/");
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") navigate("/");
            })
        }
    }, [])


    return (
        <div className={style.musicGame}>
            <Background />
            <GameLoader />
            <GameRenderer />
            <MusicTitle />
        </div>
    )
}

export default MusicGame;