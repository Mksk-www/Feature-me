import React from "react";

import style from "./head.scss";
import { useAtomValue } from "jotai";
import headerState from "State/headerState";

const Header: React.FC = () => {

    const title = useAtomValue(headerState);

    return (
        <header className={style.header}>
                <h1>{title||"Home"}</h1>
        </header>
    )
}

export default Header;
