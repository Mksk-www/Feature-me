function trimKeyCode(key:string){
    if(key == "Space") return "␣";
    else if(key.includes("Shift")) return "⇑";
    else if(key.includes("Alt")) return "Alt";
    else if (key.includes("Control")) return "Ctrl";
    else if (key == "Comma") return ",";
    else if(key == "Period") return ".";
    else if(key == "Escape") return "Esc";
    else if(key == "Insert") return "Ins";
    else if (key == "Delete") return "Del";
    else if(key.includes("Key")) return key.replace("Key","");
    else return "?";
}

export default trimKeyCode;