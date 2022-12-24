import { atom } from "jotai";

const gameDataState = atom({
    ready:false,
    audio:new ArrayBuffer(0),
    chart:{}
});

export default gameDataState