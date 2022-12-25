import LinkWrapper from "Components/linkWrapper/linkWrapper";
import { useSetAtom } from "jotai";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingsRouter from "Routes/settingsRouter/settingsRouter";
import headerState from "State/headerState";

import style from "./settings.scss";

const SettingsPage: React.FC = () => {

    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const [currentTab,setCurrentTab] = React.useState("./");

    const settingsTab = [
        { label: "General", to: "./" },
        { label: "Graphics", to: "./graphics" },
        { label: "Audio", to: "./audio" },
        { label: "Gameplay", to: "./gameplay" },

    ]

    React.useEffect(() => {
        //update title
        setTitle("Settings")
        window.addEventListener("keydown", (e) => {
            if (e.code == "Escape") navigate("/");
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") navigate("/settings");
            })
        }
    }, [])

    return (
        <div className={style.settingsPage}>
            <div className={style.tabs}>
                {
                    settingsTab.map(t=>{
                        const isActive = t.to == currentTab;
                        return(
                            <LinkWrapper to={t.to} className={`${style.tab} ${isActive&&style.active}`} onClick={()=>setCurrentTab(t.to)} key={t.label}>{t.label}</LinkWrapper>
                        )
                    })
                }
            </div>
            <SettingsRouter />
        </div>
    )
}

export default SettingsPage;