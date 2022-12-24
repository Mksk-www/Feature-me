import React from "react";
import {BsWrench} from "react-icons/bs";

import style from "./head.scss";
import { useAtomValue } from "jotai";
import headerState from "State/headerState";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const title = useAtomValue(headerState);

    function navigateSettings(){
        if(location.pathname.includes("/settings")) navigate("/");
        else navigate("/settings");
    }

    return (
        <header className={style.header}>
            <h1>{title||"Home"}</h1>

            <div className={style.icons}>
                <div className={style.icon} onClick={navigateSettings}>
                    <BsWrench />
                </div>
            </div>
        </header>
    )
}

export default Header;
