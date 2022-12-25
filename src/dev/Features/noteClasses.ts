import * as PIXI from "pixi.js";
import degToRad from "Utils/degreeToRadian/degreeToRadian";

class note {
    judged: boolean = false;
    active: boolean = false;
    targetTime: number = 0;
    visual: PIXI.Graphics = new PIXI.Graphics();
    scrollTime?: number;
    keyId: number;
    constructor(track: number, BPM: number, count: number) {
        this.targetTime = (60 / BPM * count) * 1000;
        this.keyId = track;
    }
}

class tapNote extends note {
    constructor(track: number, BPM: number, count: number) {
        super(track, BPM, count);
        this.visual = new PIXI.Graphics().beginFill(0xf5f5f5).drawRect(0, 0, 240, 8);
        this.visual.x = 240 * track;
    }
}

class brightNote extends note {
    keyId = 4;
    constructor(BPM: number, count: number) {
        super(4, BPM, count);
        this.visual = new PIXI.Graphics().beginFill(0xeabc02).drawRect(0, 0, 960, 12)
        this.visual.x = 0;
    }
}

class seedNote extends note {
    LR: "left" | "right";
    constructor(track: number, BPM: number, count: number) {
        super(track, BPM, count);
        this.visual = new PIXI.Graphics().beginFill(0x02f768, 0.75).drawRect(0, 0, 60, 60);
        this.visual.pivot.set(40);
        this.visual.rotation = degToRad(45);
        this.visual.x = 60;
        this.LR = track == 5 ? "left" : "right";
    }
}


export { note, tapNote, brightNote, seedNote };