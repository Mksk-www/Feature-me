interface graphicsSettings {
    fps:number
    resolution:number
    antialias:boolean
    vsync:boolean
}

interface audioSettings {
    master:number
    music:number
    effect:number
    menuAudio:boolean
}

interface gameplaySettings {
    keybinds:Array<string>
    VFX:boolean
    fastLate:boolean
    vLine:boolean
    scrollSpeed:number
}