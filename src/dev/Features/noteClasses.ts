import * as PIXI from "pixi.js";
import degToRad from "Utils/degreeToRadian/degreeToRadian";

class note {
    judged: boolean = false;
    active: boolean = false;
    constructor() { }
}

class tapNote extends note {
    visual = new PIXI.Graphics().beginFill(0xf5f5f5).drawRect(0, 0, 240, 8)
    constructor(track: number, count: number) {
        super()
        this.visual.x = 240 * track
    }
}

class brightNote extends note {
    visual = new PIXI.Graphics().beginFill(0xeabc02).drawRect(0, 0, 240, 12)
    constructor(track: number, count: number) {
        super();
        this.visual.x = 0;

    }
}

class seedNote extends note {
    visual = new PIXI.Graphics().beginFill(0x02f768).drawRect(0, 0, 80, 80)
    constructor(track: number, count: number) {
        super();
        this.visual.pivot.set(40);
        this.visual.rotation = degToRad(45);
        this.visual.x = 60;

    }
}


export { tapNote, brightNote, seedNote };