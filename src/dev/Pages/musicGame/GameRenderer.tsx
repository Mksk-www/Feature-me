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

import { BrightNoteGroup, Character, judgeLineY, LaneGroup, SeedLeftNoteGroup, SeedRightNoteGroup, TapNoteGroup, updateRendererElementSettings } from "Features/GameRendererElements";
import parseChart from "Features/parseChart";
import { brightNote, note, seedNote } from "Features/noteClasses";

import effectSound from "Assets/Sounds/default.mp3";
import assistSound from "Assets/Sounds/assist.mp3"

import judgeTable from "Features/judgeTable";
import { createJudgeText, UIGroup, updateChainText, updateJudgeValues, updateScoreText, updateUIElementSettings } from "Features/GameUIElements";
import gameResultState from "State/gameResultState";

import Stats from "stats.js";

import style from "./musicGame.scss";

const GameRenderer: React.FC = () => {
    const navigate = useNavigate();
    const gameRendererRef = React.useRef<HTMLDivElement>(null);

    //load data and settings
    const gameData = useAtomValue(gameDataState);
    const setGameRenderer = useSetAtom(gameRendererState);
    const setResult = useSetAtom(gameResultState);
    const graphicsSettings: graphicsSettings = JSON.parse(localStorage.getItem("graphicsSettings") || "{}");
    const audioSettings: audioSettings = JSON.parse(localStorage.getItem("audioSettings") || "{}");
    const gameplaySettings: gameplaySettings = JSON.parse(localStorage.getItem("gameplaySettings") || "{}");

    const replayData: replayData = {
        audio: gameData.audio,
        chart: gameData.chart,
        input: []
    }

    //status monitor
    const stats = new Stats();
    stats.dom.style.position = "absolute";
    stats.dom.style.left = "auto";
    stats.dom.style.right = "0";

    //howlerjs sound instances
    let musicAudio: Howl;
    let assistAudio = new Howl({
        src: assistSound,
        volume: audioSettings.master * audioSettings.effect
    })

    let App: PIXI.Application = new PIXI.Application({
        height: 873,
        width: 1920,
        backgroundAlpha: 0,
        antialias: graphicsSettings.antialias,
        resolution: graphicsSettings.resolution,
        autoStart: false,
    });

    //game variables
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
        if (!graphicsSettings.vsync)
            App.ticker.maxFPS = graphicsSettings.fps;
        //parse chart and create instances
        gameVariables.notes = parseChart(gameData.chart.notes, gameData.chart.BPM);
        gameVariables.scorePerNotes = 1000000 / gameVariables.notes.length;
        //run setup functions
        updateSettings();
        initializeUi();
        setAudio();
        setScene();
        moveCharacter(5);
        attachEvent();

    }

    //set music instance
    function setAudio() {
        musicAudio = new Howl({
            src: `data:audio/mp3;base64,${arrayBufferToBase64(gameData.audio)}`,
            volume: audioSettings.master * audioSettings.music
        })
        musicAudio.once("end", endGame)
    }

    async function playAssistSound() {
        for (let i = 0; i < 4; i++) {
            assistAudio.play();
            await sleep((60 / gameData.chart.BPM) * 1000)
        }
    }

    function endGame() {
        setResult(r => {
            return {
                ...r,
                score: gameVariables.score,
                judges: gameVariables.judges,
                timing: gameVariables.timing,
                maxChain: gameVariables.maxChain,
                replay: replayData
            }
        })
        setTimeout(() => {
            navigate("/result");
        }, 1000)
    }

    function updateSettings() {
        updateRendererElementSettings();
        updateUIElementSettings();
    }

    //setup scene
    function setScene() {
        App.stage.addChild(LaneGroup);
        App.stage.addChild(UIGroup);

        console.log(graphicsSettings.vsync);

        if (graphicsSettings.vsync) {
            requestAnimationFrame(update);
        } else {
            App.ticker.add(update, PIXI.UPDATE_PRIORITY.HIGH);
        }

        //play assist sound and wait
        setTimeout(playAssistSound, 4000);
        setTimeout(() => {
            musicAudio.play();
        }, 4000 + ((60 / gameData.chart.BPM) * 1000 * 4));
        //set started time
        gameVariables.startedTime = performance.now();
        //start ticker and rendering
        App.start();
        //hide title overlay
        setGameRenderer(true);
    }

    //add tap event
    function attachEvent() {
        LaneGroup.on("pointerdown", handleEvent)
    }

    //remove tap event
    function detachEvent() {
        //remove touch event
        LaneGroup.removeAllListeners();
    }

    function handleEvent(e: PIXI.InteractionEvent) {
        //tap input
        tapInput(e);
        //pointer entered data
        const now = performance.now();
        const fromY = e.data.global.y;
        //check flick input
        LaneGroup.once("pointerup", (e: PIXI.InteractionEvent) => {
            const delay = performance.now() - now;
            const toY = e.data.global.y;
            if (Math.abs(fromY - toY) > 100) findNote(4, delay);
        })
    }

    //parse position and judge
    function tapInput(e: PIXI.InteractionEvent) {
        const posX = e.data.global.x - e.target.x;
        if (posX < 120) {
            moveCharacter(5);
            captureInput(5);
        }
        else if (posX > 1079) {
            moveCharacter(6);
            captureInput(6);
        }
        else {
            findNote(Math.floor((posX - 120) / 240));
            captureInput(Math.floor((posX - 120) / 240));
        }
    }

    //init ui values
    function initializeUi() {
        updateChainText(0);
        updateScoreText(0);
        updateJudgeValues(gameVariables.judges, 0);
    }

    //update function is added PIXI ticker
    function update() {
        stats.begin();
        const elapsedTime = performance.now() - gameVariables.startedTime;
        const gameTime = elapsedTime - 4000 - ((60 / gameData.chart.BPM) * 1000 * 4) + gameData.chart.offset;
        updateActive(gameTime);
        updateNotes(gameTime);
        App.render();
        if (graphicsSettings.vsync) {
            requestAnimationFrame(update);
        }
        stats.end()
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
        else findNote(pos);

        captureInput(pos);
    }

    //move character to left / right
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

    //find an oldest note from same as input lane
    function findNote(position: number, delay: number = 0) {
        const elapsedTime = performance.now() - gameVariables.startedTime;
        const gameTime = elapsedTime - 4000 - ((60 / gameData.chart.BPM) * 1000 * 4) + gameData.chart.offset;
        const judgeTime = gameTime - delay - gameplaySettings.offset - gameplaySettings.judgeTiming;

        const note: Array<note> = gameVariables.notes.filter((n) => !n.judged && n.keyId == position && Math.abs(n.targetTime - gameTime) < judgeTable.miss.range);
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

    //judge and update values
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

    //judge for seed notes
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

        //update chain
        if (judgeData.key != "miss") gameVariables.chain += 1;
        else gameVariables.chain = 0;

        //update max chain
        if (gameVariables.maxChain < gameVariables.chain) gameVariables.maxChain = gameVariables.chain;

        updateVisualEffect();

        note.judged = true;
    }

    //tap effect sound
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

    //update ui text
    function updateVisualEffect() {
        updateChainText(gameVariables.chain);
        updateScoreText(gameVariables.score);
        updateJudgeValues(gameVariables.judges, gameVariables.maxChain)
    }

    function captureInput(pos: number) {
        const time = performance.now() - gameVariables.startedTime;
        replayData.input.push({ time, key: pos });
    }

    React.useEffect(() => {
        if (gameData.ready) init();
        if (gameRendererRef.current) gameRendererRef.current.appendChild(stats.dom);
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

            //remove stats
            if (gameRendererRef.current) gameRendererRef.current.removeChild(stats.dom);

            //stop audio
            if (musicAudio) {
                musicAudio.stop();
                musicAudio.unload();
            }

            detachEvent();

            //destroy notes
            if (gameVariables.notes) {
                for (let i = 0; i < gameVariables.notes.length; i++) {
                    const note = gameVariables.notes[i];
                    if (note.visual) note.visual.destroy();
                }
            }

            //destroy renderer
            App.stage.destroy();
            App.destroy();

        }
    }, [gameData.ready])

    return (
        <div className={style.gameRenderer} ref={gameRendererRef} />
    )
}

export default GameRenderer;