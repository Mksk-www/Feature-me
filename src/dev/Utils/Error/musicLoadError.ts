class MusicLoadError extends Error {
    constructor(e: string | undefined){
        super(e)
        this.name = "MusicLoadError";
        this.message = `Could not load music. It may be offline or resources not found. \n${e}`
    }
}

export default MusicLoadError;