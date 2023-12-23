import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import headerState from "State/headerState";
import selectedMusicState from "State/selectedMusicState";
import { BiPointer } from "react-icons/bi";

import MusicTitle from "./musicTitle";
import GameLoader from "./GameLoader";
import GameRenderer from "./GameRenderer";
import Background from "./background";
import footerState from "State/footerState";

import style from "./musicGame.scss";
import trimKeyCode from "Utils/trimKeyCode/trimKeyCode";
import gameRendererState from "State/gameRendererState";

const MusicGame: React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const setFooter = useSetAtom(footerState);
    const selectedMusic = useAtomValue(selectedMusicState);
    const setGameRenderer = useSetAtom(gameRendererState);

    function setFooterContent() {
        let keysArray = [];
        const { keybinds } = JSON.parse(localStorage.getItem("gameplaySettings") || "{}")
        for (const key of keybinds) {
            keysArray.push({ icon: <h2>{trimKeyCode(key)}</h2>, value: "" })
        }
        keysArray.push({ icon: <BiPointer />, value: "Play" });
        setFooter(keysArray.reverse());
    }

    React.useEffect(() => {
        //update title
        setTitle(selectedMusic);
        //set footer
        setFooterContent();
        //add shortcut
        window.addEventListener("keydown", (e) => {
            if (e.code == "Escape") {
                navigate("/");
                setGameRenderer(false);
            }
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") {
                    navigate("/");
                    setGameRenderer(false);
                }
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