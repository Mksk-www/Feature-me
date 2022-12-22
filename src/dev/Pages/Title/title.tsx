import React from "react"
import style from "./title.scss";

import {motion,useAnimation} from "framer-motion";
import sleep from "Utils/sleep/sleep";
import { useNavigate } from "react-router-dom";

const Title: React.FC = () => {

    const [hideTitle,setShowTitle] = React.useReducer(()=>true,false)

    const BlueAnimationController = useAnimation();
    const GreenAnimationController = useAnimation();
    const titleAnimationController = useAnimation();

    const BlueAnimationOpen = { x: "-100%", transition: { duration: 0.2, ease: "easeIn" } };
    const GreenAnimationOpen = { x: "100%", transition: { duration: 0.2, ease: "easeIn" } };
    const fadeOut = {opacity:0, transition: {duration:0.2}}

    async function handleClick(){
        BlueAnimationController.start(BlueAnimationOpen);
        GreenAnimationController.start(GreenAnimationOpen);
        titleAnimationController.start(fadeOut);

        await sleep(500);
        setShowTitle();
        
    }

    return (
        <motion.div className={`${style.titlepage} ${hideTitle&&style.hidden}`} onClick={handleClick} animate={titleAnimationController}>
            <div className={style.background}>
                <motion.div className={style.blue} animate={BlueAnimationController}  />
                <motion.div className={style.green} animate={GreenAnimationController} />
            </div>
            <div className={style.titleText}>
                <h1>Feature Me</h1>
                <h2>Alpha</h2>
                <p>Click to Begin</p>
            </div>
        </motion.div>
    )
}

export default Title;