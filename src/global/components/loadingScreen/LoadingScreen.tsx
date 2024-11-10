import style from './LoadingScreen.module.scss';
import FullPageFrame from "Global/components/frame/fullPageFrame/FullPageFrame.tsx";
import {Show} from "solid-js";
import {showNavigator} from "Global/states/animatedNavigation/navigatorDisplayState.ts";
import {Transition} from "solid-transition-group";

export default () =>{
    return (
        <Transition enterToClass={style.enter} exitToClass={style.exit}>
            <Show when={showNavigator()}>
                <FullPageFrame class={style.loadingScreen}>
                <div class={style.content}>
                    <span class={style.baseText}>
                        Loading...
                    </span>
                    <span class={style.overlayText}>
                        Loading...
                    </span>
                </div>
                </FullPageFrame>
            </Show>    
        </Transition>
        
        
    )
}