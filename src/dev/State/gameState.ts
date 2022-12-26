import { atom } from "jotai";

const initialChart: chart = {
    BPM: 0,
    offset: 0,
    duration: 0,
    title: "",
    nd: "",
    diff: "",
    lev: 0,
    music: "",
    artist: "",
    backgroundColor: "",
    notes: []
}


const gameDataState = atom<{ ready: boolean, audio: ArrayBuffer, chart: chart }>({
    ready: false,
    audio: new ArrayBuffer(0),
    chart: initialChart
});

export default gameDataState
export { initialChart }