import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import * as PIXI from "pixi.js";
import { Howl } from "howler";

import gameDataState from "State/gameState";
import gameRendererState from "State/gameRendererState";

import arrayBufferToBase64 from "Utils/ArrayBuffertoBase64/ArrayBuffertoBase64";
import easings from "Utils/easing/easing";
import sleep from "Utils/sleep/sleep";
import scrollSpeedToTime from "Utils/scrollSpeedToTime/scrollSpeedToTime";

import { BrightNoteGroup, Character, judgeLineY, LaneGroup, SeedLeftNoteGroup, SeedRightNoteGroup, TapNoteGroup } from "Features/GameRendererElements";
import parseChart from "Features/parseChart";
import { brightNote, note, seedNote } from "Features/noteClasses";

import effectSound from "Assets/Sounds/default.mp3";

import style from "./musicGame.scss";
import judgeTable from "Features/judgeTable";
import { createJudgeText, UIGroup, updateChainText, updateScoreText } from "Features/GameUIElements";
import gameResultState from "State/gameResultState";

const GameRenderer: React.FC = () => {
    const navigate = useNavigate();
    const gameRendererRef = React.useRef<HTMLDivElement>(null);
    const gameData = useAtomValue(gameDataState);
    const setGameRenderer = useSetAtom(gameRendererState);
    const setResult = useSetAtom(gameResultState);
    const graphicsSettings: graphicsSettings = JSON.parse(localStorage.getItem("graphicsSettings") || "{}")
    const audioSettings: audioSettings = JSON.parse(localStorage.getItem("audioSettings") || "{}")
    const gameplaySettings: gameplaySettings = JSON.parse(localStorage.getItem("gameplaySettings") || "{}")

    let musicAudio: Howl;
    //let effectAudio: Howl;

    let App: PIXI.Application = new PIXI.Application({
        height: 873,
        width: 1920,
        backgroundAlpha: 0,
        antialias: graphicsSettings.antialias,
        resolution: graphicsSettings.resolution,
        autoStart: false,
    });
    let gameVariables: gameVariables = {
        characterPosition: "left",
        startedTime: 0,
        notes: [],
        scorePerNotes: 0,
        score: 0,
        judges: {
            stunningBloom: 0,
            bloom: 0,
            miss: 0
        },
        timing: {
            fast: 0,
            late: 0
        },
        chain: 0,
        maxChain: 0,
    }

    //initialize function
    function init() {
        //append game canvas
        gameRendererRef.current?.appendChild(App.view);
        App.ticker.maxFPS = graphicsSettings.fps
        //parse chart and create instances
        gameVariables.notes = parseChart(gameData.chart.notes, gameData.chart.BPM);
        gameVariables.scorePerNotes = 1000000 / gameVariables.notes.length;
        //run setup functions
        setAudio();
        setScene();
        initializeUi();
    }

    //set music instance
    function setAudio() {
        musicAudio = new Howl({
            src: `data:audio/mp3;base64,${arrayBufferToBase64(gameData.audio)}`,
            volume: audioSettings.master * audioSettings.music
        })
        musicAudio.once("end", endGame)
    }

    function endGame() {
        setResult(r => {
            return {
                ...r,
                score: gameVariables.score,
                judges: gameVariables.judges,
                timing: gameVariables.timing,
                maxChain: gameVariables.maxChain
            }
        })
        setTimeout(() => {
            navigate("/result");
        }, 1000)
    }

    //setup scene
    function setScene() {
        App.stage.addChild(LaneGroup);
        App.stage.addChild(UIGroup);
        App.ticker.add(update, PIXI.UPDATE_PRIORITY.HIGH);
        //wait and play assist
        setTimeout(() => {
            musicAudio.play();
        }, 4000 + ((60 / gameData.chart.BPM) * 1000 * 4))
        //set started time
        gameVariables.startedTime = performance.now()
        //start ticker and rendering
        App.start()


        //hide title overlay
        setGameRenderer(true);
    }

    function initializeUi() {
        updateChainText(0);
        updateScoreText(0);
    }

    //update function is added PIXI ticker
    function update() {
        const elapsedTime = performance.now() - gameVariables.startedTime;
        const gameTime = elapsedTime - 4000 - ((60 / gameData.chart.BPM) * 1000 * 4) + gameData.chart.offset;
        updateActive(gameTime);
        updateNotes(gameTime);
    }

    //note add or remove from visual group
    function updateActive(gameTime: number) {
        for (let i = 0; i < gameVariables.notes.length; i++) {
            const note = gameVariables.notes[i];
            if (note.judged && note.active) {
                note.active = false;
                removeGroup(note);
            }
            if (note.active || note.judged) continue;
            else {
                const appearance = note.scrollTime || scrollSpeedToTime(gameplaySettings.scrollSpeed);
                if (Math.abs(note.targetTime - gameTime) < appearance) {
                    addGroup(note)
                    note.active = true
                }
            }

        }
    }

    //add to visual group
    function addGroup(note: note) {
        if (note instanceof seedNote) {
            if (note.LR == "left") SeedLeftNoteGroup.addChild(note.visual);
            else SeedRightNoteGroup.addChild(note.visual);
        } else if (note instanceof brightNote) BrightNoteGroup.addChild(note.visual);
        else TapNoteGroup.addChild(note.visual)
    }

    //remove from visual group
    function removeGroup(note: note) {
        if (note instanceof seedNote) {
            if (note.LR == "left") SeedLeftNoteGroup.removeChild(note.visual);
            else SeedRightNoteGroup.removeChild(note.visual);
        } else if (note instanceof brightNote) BrightNoteGroup.removeChild(note.visual);
        else TapNoteGroup.removeChild(note.visual)
    }

    function updateNotes(gameTime: number) {
        //get scroll time from scroll speed
        const scrollTime = scrollSpeedToTime(gameplaySettings.scrollSpeed);

        for (let i = 0; i < gameVariables.notes.length; i++) {
            const note = gameVariables.notes[i];
            if (note.judged || !note.active) continue;
            //some notes' scroll time are overridden by chart
            const noteScrollTime = note.scrollTime || scrollTime
            //closer to 1, the smaller the time difference
            const progress = (gameTime - (note.targetTime - noteScrollTime)) / noteScrollTime;
            note.visual.y = judgeLineY * progress;

            //judge seed note
            if (note instanceof seedNote && !note.judged && gameTime > note.targetTime) judgeSeedNote(note);

            //lost note
            const relativeTime = note.targetTime - gameTime;
            if (-relativeTime > judgeTable.miss.range) {
                judge(note, gameTime);
            }
        }

    }

    //keydown event handler
    function keyDown(pos: number) {
        if (pos > 4) moveCharacter(pos);
        else findNote(pos)
    }

    function moveCharacter(pos: number) {
        new Promise<void>(async (resolve, reject) => {
            const newPos = pos == 5 ? "left" : "right";
            const newPosX = newPos == "left" ? 60 : 1140;
            const currentPos = Character.x
            if (gameVariables.characterPosition == newPos) return;
            //change variables first
            gameVariables.characterPosition = newPos;
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

    function findNote(position: number) {
        const elapsedTime = performance.now() - gameVariables.startedTime;
        const gameTime = elapsedTime - 4000 - ((60 / gameData.chart.BPM) * 1000 * 4) + gameData.chart.offset;
        const judgeTime = gameTime;

        const note: Array<note> = gameVariables.notes.filter((n) => n.keyId == position && Math.abs(n.targetTime - gameTime) < judgeTable.miss.range);
        if (note.length > 1) {
            //find an oldest note
            let min = Infinity;
            for (let i = 0; i < note.length; i++) {
                const element = note[i];
                if (element.targetTime < min) min = element.targetTime;
            }
            const judgeNote = note.find(n => n.targetTime == min);
            if (judgeNote) judge(judgeNote, gameTime);
        } else if (note.length == 1) {
            judge(note[0], judgeTime);
        }
    }

    function judge(note: note, judgeTime: number) {
        if (note.judged || !note.active) return;
        const accuracy = judgeTime - note.targetTime;
        const absAccuracy = Math.abs(accuracy);
        let judgeData: table;
        //decide judge data
        if (judgeTable.stunningBloom.range > absAccuracy) judgeData = judgeTable.stunningBloom;
        else if (judgeTable.bloom.range > absAccuracy) judgeData = judgeTable.bloom;
        else judgeData = judgeTable.miss;

        //play sound
        if (judgeData.key != "miss") {
            playEffectSound();
        }

        //update variables
        gameVariables.judges[judgeData.key as judgeText] += 1;
        gameVariables.score += gameVariables.scorePerNotes * judgeData.scoreMultiplier;
        if (accuracy > 0) gameVariables.timing.late += 1;
        else gameVariables.timing.fast += 1;

        //update chain
        if (judgeData.key != "miss") gameVariables.chain += 1;
        else gameVariables.chain = 0;

        //update max chain
        if (gameVariables.maxChain < gameVariables.chain) gameVariables.maxChain = gameVariables.chain;

        //update UI and VFX
        if (!(note instanceof seedNote)) createJudgeText(judgeData.label, judgeData.color, accuracy, note.keyId);
        updateVisualEffect();

        note.judged = true;
    }

    function judgeSeedNote(note: seedNote) {
        let judgeData: table;
        if (note.LR == gameVariables.characterPosition) judgeData = judgeTable.stunningBloom;
        else judgeData = judgeTable.miss;

        //play sound
        if (judgeData.key != "miss") {
            playEffectSound();
        }
        
        //update variables
        gameVariables.judges[judgeData.key as judgeText] += 1;
        gameVariables.score += gameVariables.scorePerNotes * judgeData.scoreMultiplier;

        //update max chain
        if (gameVariables.maxChain < gameVariables.chain) gameVariables.maxChain = gameVariables.chain;

        updateVisualEffect();

        note.judged = true;
    }


    function playEffectSound() {
        //move another thread and play audio
        setTimeout(() => {
            const effectAudio = new Howl({
                src: effectSound,
                volume: audioSettings.master * audioSettings.effect
            })
            effectAudio.play();
            effectAudio.once("end", () => effectAudio.unload());
        })
    }

    function updateVisualEffect() {
        updateChainText(gameVariables.chain);
        updateScoreText(gameVariables.score);
    }

    React.useEffect(() => {
        if (gameData.ready) init();
        window.addEventListener("keydown", (e) => {
            if (gameplaySettings.keybinds.includes(e.code)) {
                const index = gameplaySettings.keybinds.findIndex(k => k == e.code);
                setTimeout(() => keyDown(index))
            }
        })
        return () => {
            window.removeEventListener("keydown", (e) => {
                if (gameplaySettings.keybinds.includes(e.code)) {
                    const index = gameplaySettings.keybinds.findIndex(k => k == e.code);
                    setTimeout(() => keyDown(index))
                }
            })
            if (musicAudio) {
                musicAudio.stop();
            }
            if (gameVariables.notes) {
                for (let i = 0; i < gameVariables.notes.length; i++) {
                    const note = gameVariables.notes[i];
                    if (note.visual) note.visual.destroy();
                }
            }
            App.stage.destroy();
            App.destroy();

        }
    }, [gameData.ready])

    return (
        <div className={style.gameRenderer} ref={gameRendererRef} />
    )
}

export default GameRenderer;