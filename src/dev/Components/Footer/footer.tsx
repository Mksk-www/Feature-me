import React from "react";

import version from "Config/versions.json";

import style from "./footer.scss";
import { useAtomValue } from "jotai";
import footerState from "State/footerState";


const Footer: React.FC = () => {
    const footer = useAtomValue(footerState);

    return (
        <footer className={style.footer}>
            <div className={style.credit}>
                VERSION:{version.build} <br />
                ©2021 - {new Date().getFullYear()} Mksk & Rae the Feature Me Project
            </div>
            <div className={style.keyhint}>

                {
                    footer.map((content, index) => {
                        return (
                            <div className={style.keyhintContent} key={index}>
                                <div className={style.icon}>
                                    {content.icon}
                                </div>
                                <span>{content.value}</span>
                            </div>
                        )
                    })
                }
            </div>
        </footer>
    )
}

export default Footer;
