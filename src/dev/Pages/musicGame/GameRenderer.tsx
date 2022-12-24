import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import selectedMusicState from "State/selectedMusicState";

import musicList from "Config/musicList.json"

import style from "./musicGame.scss";

import MusicLoadError from "Utils/Error/musicLoadError";
import gameDataState from "State/gameState";
import gameRendererState from "State/gameRendererState";

const GameRenderer: React.FC = () => {
    const gameRendererRef = React.useRef<HTMLDivElement>(null);
    const gameData = useAtomValue(gameDataState)
    const setGameRenderer = useSetAtom(gameRendererState)

    function init(){

        setGameRenderer(true);
    }

    React.useEffect(()=>{
        if(gameData.ready) init()
    },[gameData.ready])

    return (
        <div className={style.gameRenderer} ref={gameRendererRef} >
            
        </div>
    )
}

export default GameRenderer;