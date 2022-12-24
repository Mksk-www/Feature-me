import React from "react";
import { audioSettings, gameplaySettings, graphicsSettings } from "./defaultValue";

function initLocalStorage(): void {
    try {
        
        localStorage.setItem("graphicsSettings", JSON.stringify({...graphicsSettings, ...JSON.parse(localStorage.getItem("graphicsSettings")||"{}")}));
        localStorage.setItem("audioSettings", JSON.stringify({ ...audioSettings, ...JSON.parse(localStorage.getItem("audioSettings") || "{}") }));
        localStorage.setItem("gameplaySettings", JSON.stringify({ ...gameplaySettings, ...JSON.parse(localStorage.getItem("gameplaySettings") || "{}") }));
        //localStorage.setItem("musicSelect", JSON.stringify({ ...musicSelect, ...(JSON.parse(localStorage.getItem("musicSelect") || "{}")) }));
    
} catch (error) {
    console.error(error);
    }
}

export default initLocalStorage;