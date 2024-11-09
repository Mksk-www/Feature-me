import {MemoryRouter, Router} from "@solidjs/router";
import PageRouter from "Global/routes/PageRouter.tsx";
import {Match, Switch} from "solid-js";
import {isDev} from "solid-js/web";

export default () =>{
    return (
        <div>
            <Switch>
                <Match when={isDev}><Router>{PageRouter}</Router></Match>
                <Match when={!isDev}><MemoryRouter>{PageRouter}</MemoryRouter></Match>
            </Switch>
            
        </div>
    )
}