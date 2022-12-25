interface chart {
    BPM: number
    offset: number
    duration: number
    title: string
    nd: string
    diff: string
    lev: number
    music: string // music path but this is not used in this version
    artist: string
    backgroundColor: string // to set bg color but this is not used in this version
    notes: Array<notes>
}

interface chartnote {
    track: 0|1|2|3|4|5|6
    count:number
    speed?:{
        type:"absolute"|"relative"|"fixed"
        value:number
    }
}