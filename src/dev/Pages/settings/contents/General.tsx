import { useSetAtom } from "jotai";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingsRouter from "Routes/settingsRouter/settingsRouter";
import headerState from "State/headerState";

import style from "./contents.scss";

const GeneralSettings: React.FC = () => {

    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);

    React.useEffect(() => {
        //update title
        setTitle("Settings - General")
 
    }, [])

    return (
        <div className={style.page}>
            <h1>General</h1>
            <h2>Game information</h2>
            <h3>Feature Me Alpha 0.4.0</h3>
        
            <h2>Links</h2>
            <a href="https://feature-me.github.io/Feature-me-Alpha-v0.x/">Alpha 0.3.7</a>
            <a href="https://feature-me-v1.onrender.com/">Feature Me</a>
        </div>
    )
}

export default GeneralSettings;