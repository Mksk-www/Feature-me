import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import path from "path-browserify";
import easings from "Utils/easing/easing";

import selectedMusicState from "State/selectedMusicState";
import gameDataState from "State/gameState";

import musicList from "Config/musicList.json"

import style from "./musicGame.scss";

import thumbnail from "Assets/Images/music.png";
import MusicLoadError from "Utils/Error/musicLoadError";
import { motion, useAnimation } from "framer-motion";
import sleep from "Utils/sleep/sleep";



const MusicTitle: React.FC = () => {
    const gameData = useAtomValue(gameDataState);
    const selectedMusic = useAtomValue(selectedMusicState);
    const titleRef = React.useRef<HTMLDivElement>(null);
    const currentMusic = musicList.musicList.find(m => m.name == selectedMusic)

    const animationController = useAnimation()

    const fadeIn = { opacity: 1, transition: { duration: 0.2 } }
    const fadeOut = { opacity: 0, transition: { duration: 0.2 } }
    const innerAnimation = { scale: 1, transition: { duration: 0.5, ease: [0, 1.2, 0.4, 1] } };
    const innerAnimationInitial = { scale: 0 };

    if (!currentMusic) throw new MusicLoadError(`Music name : ${selectedMusic}`)

    const thumbnailImage = path.join("musics", currentMusic?.dir, "thumbnail.png");

    React.useEffect(() => {
        if (titleRef.current) titleRef.current.style.visibility = "";
        animationController.start(fadeIn);
    }, [])

    React.useEffect(() => {
        let timeout:NodeJS.Timeout
        if (gameData.ready) {
            timeout = setTimeout(async()=>{
                animationController.start(fadeOut);
                await sleep(200);
                if (titleRef.current) titleRef.current.style.visibility="none";
            },3000)
        }
        return ()=>{
            clearTimeout(timeout)
        }
    }, [gameData.ready])

    return (
        <motion.div className={style.musicTitle} animate={animationController} ref={titleRef}>
            <motion.div className={style.inner} animate={innerAnimation} initial={innerAnimationInitial}>
                <img draggable="false" src={thumbnailImage} onError={(e) => e.currentTarget.src = thumbnail} />
                <h1>{currentMusic.name}</h1>
                <div className={style.details}>
                    <div className={`${style.diff} ${style[currentMusic.diff]}`}>
                        <h3 className={style.text}>
                            {currentMusic.lev}
                        </h3>
                    </div>
                    <h3>Artist: {currentMusic.artist}</h3>
                    <div className={style.details}>
                        Time : {currentMusic.duration} <br />
                        BPM : {currentMusic.bpm} <br />
                        Chart Designer : {currentMusic.nd}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default MusicTitle;