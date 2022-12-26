import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import MusicListCard from "./musicListCard";
import headerState from "State/headerState";

import musicList from "Config/musicList.json";

import style from "./home.scss";
import selectedMusicState from "State/selectedMusicState";
import gameDataState, { initialChart } from "State/gameState";

const Home:React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const setSelectedMusic = useSetAtom(selectedMusicState);
    const setGameData = useSetAtom(gameDataState);
    
    //delete game cache
    function initializeCache() {
        setGameData({
            ready: false,
            audio: new ArrayBuffer(0),
            chart: initialChart
        })
    }

    React.useEffect(()=>{
        //update title
        initializeCache();
        setTitle("Home");
        //add shortcut
        setSelectedMusic("");
        window.addEventListener("keydown",(e)=>{
            if(e.code=="Escape") navigate("/settings");
        })

        return()=>{
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") navigate("/settings");
            })
        }
    },[])

    return(
        <div className={style.home}>
            {
                musicList.musicList.map((c)=>{
                    return(
                        <MusicListCard content={c} key={c.name} />
                    )
                })
            }
        </div>
    )
}

export default Home;