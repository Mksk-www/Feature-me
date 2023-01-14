import React from "react";
import { cloneDeep } from "lodash"

import style from "./keybindSettings.scss";

const KeybindSettings: React.FC = () => {

    const [gameplaySettings, setGameplaySettings] = React.useState<gameplaySettings>(JSON.parse(localStorage.getItem("gameplaySettings") || "{}"))

    function setKeybind(index: number, key: string) {
        setGameplaySettings(c => {
            let newKeybinds = cloneDeep(c.keybinds);
            newKeybinds[Number(index)] = key
            return {
                ...c,
                keybinds: newKeybinds
            }
        });
    }
    React.useEffect(() => {
        localStorage.setItem("gameplaySettings", JSON.stringify(gameplaySettings))
    }, [gameplaySettings])

    return (
        <div className={style.keylist}>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(0, e.code) }}><span>Left : </span>{gameplaySettings.keybinds[0]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(1, e.code) }}><span>Center Left : </span>{gameplaySettings.keybinds[1]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(2, e.code) }}><span>Center Right : </span>{gameplaySettings.keybinds[2]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(3, e.code) }}><span>Right : </span>{gameplaySettings.keybinds[3]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(4, e.code) }}><span>SPACE Note : </span>{gameplaySettings.keybinds[4]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(5, e.code) }}><span>Move Character to Left : </span>{gameplaySettings.keybinds[5]}</span>
            <span className={style.input} tabIndex={-1} onKeyDown={(e) => { setKeybind(6, e.code) }}><span>Move Character to Right : </span>{gameplaySettings.keybinds[6]}</span>
        </div>

    )
}

export default KeybindSettings;