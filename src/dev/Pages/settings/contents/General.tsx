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
        </div>
    )
}

export default GeneralSettings;