import React from "react";

import style from "./head.scss";
import { useAtomValue } from "jotai";
import headerState from "State/headerState";

const Header: React.FC = () => {

    const title = useAtomValue(headerState);

    return (
        <header className={style.header}>
            <div className={style.titleBar}>
                Feature Me Alpha 0.4.0
            </div>
            <div className={style.headerContent}>
                <h1>{title||"Home"}</h1>
            </div>
        </header>
    )
}

export default Header;
