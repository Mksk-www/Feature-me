import * as solid from "solid-js";

import style from "./App.module.scss";
import { MemoryRouter, Router as SolidRouter } from "@solidjs/router";
import Router from "global/router/Router";


export default () => {

    solid.onMount(() => {
        document.getElementById("cover")!.remove();
    })
    return (
        <div class={style.app}>
            <SolidRouter>
                <Router>
                </Router>
            </SolidRouter>
        </div>
    )
}