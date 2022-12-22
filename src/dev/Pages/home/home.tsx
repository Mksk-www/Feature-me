import React from "react";

import musicList from "Config/musicList.json";

import style from "./home.scss";
import MusicListCard from "./musicListCard";

const Home:React.FC = () => {
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