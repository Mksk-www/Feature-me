import {createStore} from "solid-js/store";
import {createSignal} from "solid-js";

export const [initialized,setInitialized] = createSignal(false);

export const [LS,setLS] = createStore();