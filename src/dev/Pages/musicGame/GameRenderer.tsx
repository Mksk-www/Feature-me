import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import * as PIXI from "pixi.js";

import selectedMusicState from "State/selectedMusicState";

import style from "./musicGame.scss";

import gameDataState from "State/gameState";
import gameRendererState from "State/gameRendererState";
import { Character, LaneGroup } from "Features/GameRendererElements";
import easings from "Utils/easing/easing";
import sleep from "Utils/sleep/sleep";

const GameRenderer: React.FC = () => {
    const gameRendererRef = React.useRef<HTMLDivElement>(null);
    const gameData = useAtomValue(gameDataState)
    const setGameRenderer = useSetAtom(gameRendererState);
    const graphicsSettings:graphicsSettings = JSON.parse(localStorage.getItem("graphicsSettings") || "{}")
    const audioSettings:audioSettings = JSON.parse(localStorage.getItem("audioSettings") || "{}")
    const gameplaySettings: gameplaySettings = JSON.parse(localStorage.getItem("gameplaySettings") || "{}")
    let App: PIXI.Application = new PIXI.Application({
        height: 873,
        width: 1920,
        backgroundAlpha: 0,
        antialias: graphicsSettings.antialias,
        resolution: graphicsSettings.resolution,
        autoStart: false,
    });
    let gameVariables:gameVariables = {
        characterPosition:"left",
        startedTime:0
    }
    

    function init(){
        gameRendererRef.current?.appendChild(App.view);
        App.ticker.maxFPS = graphicsSettings.fps
        setScene()
    }

    function setScene(){
        App.stage.addChild(LaneGroup);
        App.ticker.add(update,PIXI.UPDATE_PRIORITY.HIGH)
        App.start()
        gameVariables.startedTime = Date.now()
        setGameRenderer(true);
    }

    function update () {
        const elapsedTime = Date.now() - gameVariables.startedTime;
        const gameTime = elapsedTime - 3000 - ((60/gameData.chart.BPM)*1000*4);
    }

    function updateNotes(){

    }


    function keyDown(pos:number){
        if(pos>4) moveCharacter(pos);
    }

    function moveCharacter(pos:number){
        new Promise<void>(async (resolve,reject)=>{
            const newPos = pos == 5 ? "left" : "right";
            const newPosX = newPos == "left" ? 60 : 1140;
            const currentPos = Character.x
            if (gameVariables.characterPosition == newPos) return;
            const moveDistance = -(Character.x - newPosX);
            for (let i = 0; i < 100; i++) {
                const pos = easings.easeOutExpo(i / 100) * (moveDistance) + currentPos;
                Character.x = pos;
                await sleep(5);
            }
            gameVariables.characterPosition = newPos;
            resolve();
        })
    }

    React.useEffect(()=>{
        if(gameData.ready) init();
        window.addEventListener("keydown",(e)=>{
            if(gameplaySettings.keybinds.includes(e.code)){
                const index = gameplaySettings.keybinds.findIndex(k=>k==e.code);
                keyDown(index)
            }
        })
        return () =>{

        }
    },[gameData.ready])

    return (
        <div className={style.gameRenderer} ref={gameRendererRef} />
    )
}

export default GameRenderer;