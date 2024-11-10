import style from "./Title.module.scss";
import FullPageFrame from "Global/components/frame/fullPageFrame/FullPageFrame.tsx";
import GlitchImage from "Global/components/glitchImage/GlitchImage.tsx";

import farCameraBg from "Assets/images/tidal_wreck_far_camera.png";
import {onMount} from "solid-js";
import useAnimatedNavigate from "Global/hooks/animatedNavigation/useAnimatedNavigate.ts";

export default () => {
    
    const navigate = useAnimatedNavigate();
    
    let firstShowTime = 0;
    
    onMount(()=>{
        firstShowTime = performance.now();
    })

    function handleClick(e: MouseEvent & { currentTarget: HTMLDivElement, target: Element }) {
        if(e.target.classList.contains(style.show) || performance.now() - firstShowTime > 5000){
            navigate("/update");
        }else{
            e.target.classList.add(style.show);
        }
        

    }

    return (
        <FullPageFrame class={style.title}>
            <GlitchImage src={farCameraBg} class={style.background}/>
            <div class={style.content} onClick={handleClick}>
                <h1 class={style.title}>Feature Me</h1>
                <h2 class={style.subtitle}>Alpha</h2>
                <p class={style.start}>Click to start</p>
                <footer>
                    Copyright &copy; 2024 - {new Date().getFullYear()} Mksk and Rae, the Feature me Project all rights. reserved.
                </footer>
            </div>
        </FullPageFrame>
    )
}