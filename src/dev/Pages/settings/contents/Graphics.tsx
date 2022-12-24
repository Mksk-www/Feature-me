import NumberInput from "Components/numberInput/numberInput";
import { useSetAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import headerState from "State/headerState";

import style from "./contents.scss";

const GraphicsSettings: React.FC = () => {

    const [graphicsSettings, setGraphicsSettings] = React.useState<graphicsSettings>(JSON.parse(localStorage.getItem("graphicsSettings") || "{}"))

    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);

    React.useEffect(()=>{
        localStorage.setItem("graphicsSettings",JSON.stringify(graphicsSettings))
    },[graphicsSettings])

    React.useEffect(() => {
        //update title
        setTitle("Settings - Graphics")

    }, [])

    return (
        <div className={style.page}>
            <h1>Graphics</h1>
            <div className={style.setting}>
                <h2>Rendering Framerate</h2>
                <NumberInput min={30} max={480} step={30} value={graphicsSettings.fps} onChange={(value)=>setGraphicsSettings((s: graphicsSettings)=>{return{...s,fps:value}})} />
            </div>
            <div className={style.setting}>
                <h2>Rendering Resolution</h2>
                <NumberInput min={10} max={200} value={graphicsSettings.resolution*100} onChange={(value) => setGraphicsSettings((s: graphicsSettings) => { return { ...s, resolution: value/100 } })} />
            </div>
        </div>
    )
}

export default GraphicsSettings;