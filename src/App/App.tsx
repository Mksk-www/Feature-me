import {MemoryRouter, Router} from "@solidjs/router";
import PageRouter from "Global/routes/PageRouter.tsx";
import {createSignal, Match, onMount, Switch} from "solid-js";
import {isDev} from "solid-js/web";

import "Global/styles/style.scss";
import FullPageFrame from "Global/components/frame/fullPageFrame/FullPageFrame.tsx";
import TypesafeI18n from "@/i18n/i18n-solid.ts";
import {loadAllLocales} from "@/i18n/i18n-util.sync.ts";

export default () =>{
    
    const [isReady,setIsReady] = createSignal(false);
    
    onMount(()=>{
        loadAllLocales();
        setIsReady(true);
    })
    
    return (
        <Switch>
            <Match when={isReady()}>
                <FullPageFrame>
                    <TypesafeI18n locale={"ja"}>
                        <Switch>
                            <Match when={isDev}><Router>{PageRouter}</Router></Match>
                            <Match when={!isDev}><MemoryRouter>{PageRouter}</MemoryRouter></Match>
                        </Switch>
                    </TypesafeI18n>
                </FullPageFrame>
                <Match when={!isReady()}>
                    Loading...
                </Match>
            </Match>
        </Switch>
    )
}