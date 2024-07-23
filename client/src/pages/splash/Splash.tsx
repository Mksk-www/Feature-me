import FullPageFrame from "global/components/frame/fullPageFrame/FullPageFrame";
import * as solid from "solid-js";
import Logo from "./displays/logo/Logo";

import style from "./Splash.module.scss";

export default () => {

    const [display, setDisplay] = solid.createSignal(0);

    return (
        <FullPageFrame class={style.splash}>
            <solid.Switch>
                <solid.Match when={display() == 0}>
                    <Logo />
                </solid.Match>
            </solid.Switch>
        </FullPageFrame>
    )

}