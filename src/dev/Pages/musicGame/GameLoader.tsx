import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import path, { resolve } from "path-browserify"
import { useNavigate } from "react-router-dom";

import selectedMusicState from "State/selectedMusicState";

import musicList from "Config/musicList.json"

import MusicLoadError from "Utils/Error/musicLoadError";
import gameDataState from "State/gameState";


const GameLoader: React.FC = () => {
    const navigate = useNavigate()
    const selectedMusic = useAtomValue(selectedMusicState);
    const currentMusic = musicList.musicList.find(m => m.name == selectedMusic)
    if (!currentMusic) throw new MusicLoadError(`Music name : ${selectedMusic}`)

    const baseDir = path.join("musics", currentMusic?.dir);

    const setGameData = useSetAtom(gameDataState);

    function loadData() {
        Promise.all([loadMusic, loadChart])
        .then((result) => {
            const music = result[0];
            const chart = result[1];
            
            if (!music || !chart) throw new MusicLoadError(`Music name : ${selectedMusic}`);

            setGameData({
                ready:true,
                audio:music,
                chart
            })
        })
        .catch(()=>{
            navigate("/")
        })
    }

    const loadMusic = new Promise<ArrayBuffer>((resolve, reject) => {
        fetch(path.join(baseDir, "audio.mp3"))
            .then(res => res.arrayBuffer())
            .then(res => resolve(res))
            .catch(reject)
    })

    const loadChart = new Promise<chart>((resolve, reject) => {
        fetch(path.join(baseDir, "beatmap.json"))
            .then(res => res.json())
            .then(resolve)
            .catch(reject)
    })

    React.useEffect(loadData, [])

    return (
        <></>
    )
}

export default GameLoader;