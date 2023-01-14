import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { BiPointer } from "react-icons/bi";

import MusicListCard from "./musicListCard";
import headerState from "State/headerState";

import musicList from "Config/musicList.json";

import selectedMusicState from "State/selectedMusicState";
import gameDataState, { initialChart } from "State/gameState";
import footerState from "State/footerState";

import style from "./home.scss";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const setSelectedMusic = useSetAtom(selectedMusicState);
    const setGameData = useSetAtom(gameDataState);
    const setFooter = useSetAtom(footerState);

    //delete game cache
    function initializeCache() {
        setGameData({
            ready: false,
            audio: new ArrayBuffer(0),
            chart: initialChart
        })
    }

    React.useEffect(() => {
        //update title
        initializeCache();
        setTitle("Home");
        //set footer
        setFooter([{ icon: <BiPointer />, value: "Select" }])
        //add shortcut
        setSelectedMusic("");
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
        <div className={style.home}>
            {
                musicList.musicList.map((c) => {
                    return (
                        <MusicListCard content={c} key={c.name} />
                    )
                })
            }
        </div>
    )
}

export default Home;