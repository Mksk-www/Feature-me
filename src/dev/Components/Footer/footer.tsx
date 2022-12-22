import React from "react";
import { BiPointer } from "react-icons/bi";

import version from "Config/versions.json";

import style from "./footer.scss";


const Footer: React.FC = () => {

    return (
        <footer className={style.footer}>
            <div className={style.credit}>
                VERSION:{version.build} <br />
                2021 - {new Date().getFullYear()} Mksk & Rae the Feature Me Project
            </div>
            <div className={style.keyhint}>

                <div className={style.keyhintContent}>
                    <div className={style.icon}>
                        <BiPointer />
                    </div>
                    Select
                </div>
            </div>
        </footer>
    )
}

export default Footer;
