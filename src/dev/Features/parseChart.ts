import { brightNote, note, seedNote, tapNote } from "./noteClasses";

import { match } from "ts-pattern";
import scrollSpeedToTime from "Utils/scrollSpeedToTime/scrollSpeedToTime";


const gameplaySettings: gameplaySettings = JSON.parse(localStorage.getItem("gameplaySettings") || "{}")

function parseChart(chart: Array<chartnote>, BPM: number) {
    let notes: Array<note> = [];

    for (const note of chart) {
        if (note.track == 4) {
            const instance = new brightNote(BPM, note.count);
            if (note.speed) {
                setSpeed(instance, note.speed)
            }
            notes.push(instance)
        } else if (note.track > 4) {
            const instance = new seedNote(note.track, BPM, note.count);
            if (note.speed) {
                setSpeed(instance, note.speed)
            }
            notes.push(instance)
        } else {
            const instance = new tapNote(note.track, BPM, note.count);;
            if (note.speed) {
                setSpeed(instance,note.speed);
            }
            notes.push(instance);
        }
    }

    return notes;
}


function setSpeed(instance: note, speed: { type: "absolute" | "relative" | "fixed"; value: number; }) {
    return match(speed.type)
        .with("absolute", () => instance.scrollTime = scrollSpeedToTime(speed.value))
        .with("relative", () => { instance.scrollTime = scrollSpeedToTime(gameplaySettings.scrollSpeed + speed.value) })
        .with("fixed", () => { instance.scrollTime = speed.value })
        .exhaustive()
}

export default parseChart