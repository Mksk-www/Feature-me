import footerState from "State/footerState";
import gameRendererState from "State/gameRendererState";
import { Howl } from "howler";
import { useAtom, useAtomValue } from "jotai";
import { cloneDeep } from "lodash";
import React, { useEffect } from "react";

import thumbnail from "Assets/Images/music.png";


const MenuAudioPlayer: React.FC = () => {

    const AudioList = ["BGS","feat_you","ours","to_summer","らえるのうた"];

    const AudioRef = React.useRef<Howl>();

    const gameRendererValue = useAtomValue(gameRendererState);
    const [footer,setFooter] = useAtom(footerState)

    React.useEffect(()=>{
        if(gameRendererValue) {
            AudioRef.current?.fade(AudioRef.current.volume(),0,1000);
            setTimeout(() => {
                AudioRef.current?.stop();
            }, 1000);
            return;
        }

        const audioTitle = Math.floor(Math.random() * AudioList.length);
        const audioSettings: audioSettings = JSON.parse(localStorage.getItem("audioSettings") || "{}");

        console.log(audioTitle);
        

        if(!audioSettings.menuAudio) return console.log(false);

        AudioRef.current = new Howl({
            src: "./musics/" + AudioList[audioTitle] + "/audio.mp3",
            volume: audioSettings.master * audioSettings.music,
            autoplay:true
        });

        AudioRef.current.on("play",()=>{
            if(AudioRef.current){
                AudioRef.current.fade(0,audioSettings.master * audioSettings.music,5000);
                setFooter(f=>{
                    let newArray = cloneDeep(f);
                    newArray.push({
                        icon: <img src={thumbnail} />,
                        value: "Playing "+AudioList[audioTitle]
                    });
                    return newArray;
                })
            }
        });

    },[gameRendererValue])

    return (
        <>
        </>
    )
}

export default MenuAudioPlayer;