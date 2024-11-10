import audio from "Assets/defaultLocalStorage/audio.ts";
import environment from "Assets/defaultLocalStorage/environment.ts";
import database from "Assets/defaultLocalStorage/database.ts";
import {setInitialized} from "Global/states/localStorage/localStorage.ts";

const storageItem:{[key:string]:unkown} = {
    audio,
    database,
    environment
}
function init(){
    for (const item in storageItem) {
        if (storageItem.hasOwnProperty(item)) {
            localStorage.setItem(item, JSON.stringify({...storageItem[item],...(JSON.parse(localStorage.getItem(item)||"{}"))}));
        }
    }
    setInitialized(true);
}

export default init;