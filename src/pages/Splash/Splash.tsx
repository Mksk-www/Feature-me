import FullPageFrame from "Global/components/frame/fullPageFrame/FullPageFrame.tsx";

import style from "./Splash.module.scss";
import {createSignal, Match, onCleanup, onMount, Switch} from "solid-js";
import Logo from "Pages/Splash/elements/logo/Logo.tsx";
import Notice from "Pages/Splash/elements/notice/Notice.tsx";
import useAnimatedNavigate from "Global/hooks/animatedNavigation/useAnimatedNavigate.ts";

export default () =>{
    
    const [element,setElement] = createSignal(0);
    let animationTimeout:NodeJS.Timeout;
    const navigate = useAnimatedNavigate()
    
    onMount(()=>{
        animationTimeout = setTimeout(next,4000);
    });
    
    onCleanup(()=>{
        clearTimeout(animationTimeout);
    });
    
    function next(){
        if (element() == 0){
            setElement(1);
            animationTimeout = setTimeout(next,12000);
            
        }else {
            navigate("/title")
        }
    }
    
    return (
        <FullPageFrame class={style.splash}>
            <Switch>
                <Match when={element() == 0}>
                    <Logo />
                </Match>
                <Match when={element() == 1}>
                    <Notice {...{next}} />
                </Match>
            </Switch>
        </FullPageFrame>
    )
}