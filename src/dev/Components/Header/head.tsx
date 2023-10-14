import React from "react";
import { BsWrench, BsCameraVideo } from "react-icons/bs";

import style from "./head.scss";
import { useAtomValue } from "jotai";
import headerState from "State/headerState";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const title = useAtomValue(headerState);

    function navigateTo(target:string){
        if (location.pathname.includes(target)) navigate("/");
        else navigate(target);
    }

    React.useEffect(() => {
        document.title = `${title} - Feature Me Alpha`;
    }, [title])

    return (
        <header className={style.header}>
            <h1>{title || "Home"}</h1>

            <div className={style.icons}>
                <div className={style.icon} onClick={()=>navigateTo("/settings")}>
                    <BsWrench />
                </div>
                <div className={style.icon} onClick={()=>navigateTo("/replay")}>
                    <BsCameraVideo />
                </div>
            </div>
        </header>
    )
}

export default Header;
