import HorizonalSelectFromArray from "Components/horizonalSelectFromArray/horizonalSelectFromArray";
import NumberInput from "Components/numberInput/numberInput";
import { useSetAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import headerState from "State/headerState";

import style from "./contents.scss";
import KeybindSettings from "./keybindSettings/keybindSettings";

const GameplaySettings: React.FC = () => {

    const [gameplaySettings, setGameplaySettings] = React.useState<gameplaySettings>(JSON.parse(localStorage.getItem("gameplaySettings") || "{}"))
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);

    const selector = [
        { label: "Enabled", value: true },
        { label: "Disabled", value: false },
    ]

    React.useEffect(() => {
        //update title
        setTitle("Settings - Gameplay")

    }, [])

    React.useEffect(() => {
        localStorage.setItem("gameplaySettings", JSON.stringify(gameplaySettings))
    }, [gameplaySettings])

    return (
        <div className={style.page}>
            <h1>Gameplay</h1>
            <div className={style.setting}>
                <h2>Keybinds</h2>
                <KeybindSettings />
            </div>
            <div className={style.setting}>
                <h2>Scroll Speed</h2>
                <NumberInput min={1} max={20} value={gameplaySettings.scrollSpeed} onChange={(value) => setGameplaySettings((s: gameplaySettings) => { return { ...s, scrollSpeed: value } })} />
            </div>
            <div className={style.setting}>
                <h2>Show judge VFX</h2>
                <HorizonalSelectFromArray contents={selector} value={selector.find(s => s.value == gameplaySettings.VFX) || selector[0]} onChange={(value:selectContents<boolean>) => setGameplaySettings((s: gameplaySettings) => { return { ...s, VFX: value.value } })} />
            </div>
            <div className={style.setting}>
                <h2>Show FAST/LATE</h2>
                <HorizonalSelectFromArray contents={selector} value={selector.find(s => s.value == gameplaySettings.fastLate) || selector[0]} onChange={(value: selectContents<boolean>) => setGameplaySettings((s: gameplaySettings) => { return { ...s, fastLate: value.value } })} />
            </div>
            <div className={style.setting}>
                <h2>Show Vertical Line</h2>
                <HorizonalSelectFromArray contents={selector} value={selector.find(s => s.value == gameplaySettings.vLine) || selector[0]} onChange={(value: selectContents<boolean>) => setGameplaySettings((s: gameplaySettings) => { return { ...s, vLine: value.value } })} />
            </div>
            {/* add judge timing settings */}
        </div>
    )
}

export default GameplaySettings;