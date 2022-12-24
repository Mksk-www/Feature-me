import NumberInput from "Components/numberInput/numberInput";
import { useSetAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import headerState from "State/headerState";

import style from "./contents.scss";

const AudioSettings: React.FC = () => {

    const [audioSettings, setAudioSettings] = React.useState<audioSettings>(JSON.parse(localStorage.getItem("audioSettings") || "{}"))
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);

    React.useEffect(() => {
        //update title
        setTitle("Settings - Audio")

    }, [])

    React.useEffect(() => {
        localStorage.setItem("audioSettings", JSON.stringify(audioSettings))
    }, [audioSettings])

    return (
        <div className={style.page}>
            <h1>Audio</h1>
            <div className={style.setting}>
                <h2>Master Audio Volume</h2>
                <NumberInput min={1} max={100} value={audioSettings.master*100} onChange={(value) => setAudioSettings((s: audioSettings) => { return { ...s, master: value/100 } })} />
            </div>
            <div className={style.setting}>
                <h2>Music Volume</h2>
                <NumberInput min={1} max={100} value={audioSettings.music * 100} onChange={(value) => setAudioSettings((s: audioSettings) => { return { ...s, music: value / 100 } })} />
            </div>
            <div className={style.setting}>
                <h2>Effect Volume</h2>
                <NumberInput min={1} max={100} value={audioSettings.effect * 100} onChange={(value) => setAudioSettings((s: audioSettings) => { return { ...s, effect: value / 100 } })} />
            </div>
        </div>
    )
}

export default AudioSettings;