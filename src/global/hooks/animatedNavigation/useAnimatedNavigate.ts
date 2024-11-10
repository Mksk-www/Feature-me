import {createEffect, createSignal, onCleanup, onMount, Signal} from "solid-js";
import {NavigateOptions, useIsRouting, useNavigate} from "@solidjs/router";
import {setShowNavigator, showNavigator} from "Global/states/animatedNavigation/navigatorDisplayState.ts";
import task from "Global/utils/task/task.ts";

interface animatedNavigateOption {
    autoReveal?: boolean;
    signal?: Signal<boolean>;
    navigateDelay?: number;

}

export default (option?: animatedNavigateOption) => {
    const navigation = useNavigate();
    const isRouting = useIsRouting();
    let [display, setDisplay] = [undefined, undefined];
    let navigationTimeout: NodeJS.Timeout;

    if (option?.signal) [display, setDisplay] = option.signal;
    else [display, setDisplay] = [showNavigator, setShowNavigator];

    onCleanup(() => {
        //clearTimeout(navigationTimeout);
        
    })

    const navigate = async (to: string | number, routeOptions?: Partial<NavigateOptions<unkown>>) => {
        setDisplay(true);
        await task.sleep(option?.navigateDelay || 2000);
        if (typeof to === "number") navigation(to);
        else navigation(to, routeOptions);
        await task.sleep(0);
        if(option?.autoReveal !==false){
            await task.waitUntil(()=>!isRouting());
            setDisplay(false);
        }

    }
    return navigate;
}