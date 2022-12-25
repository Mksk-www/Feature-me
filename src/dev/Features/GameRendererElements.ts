import * as PIXI from "pixi.js";

import character from "Assets/Images/Characters/Shiori-back.png";

const gameplaySettings: gameplaySettings = JSON.parse(localStorage.getItem("gameplaySettings") || "{}");

const width = 1920
const height = 873

const areaWidth = 1200;

const judgeLineY = 800;

const noteWidth = 240;
const seedNoteWidth = 120;

const accentColor = 0x03a7eb;
const backgroundColor = 0x07080e;
const lineColor = 0xa0a0a0

const LaneGroup = new PIXI.Container();
LaneGroup.height = height;
LaneGroup.width = areaWidth;
LaneGroup.x = (width - areaWidth) / 2;
LaneGroup.y = 0;

const background = new PIXI.Graphics()
    .beginFill(backgroundColor, 0.7)
    .drawRect(0, 0, areaWidth, height)
    .endFill();

const judgeLine = new PIXI.Graphics()
    .beginFill(accentColor)
    .drawRect(0, judgeLineY, 1200, 8);

const LineGroup = new PIXI.Container();
LineGroup.height = height;
LineGroup.width = areaWidth;
LineGroup.x = 0;
LineGroup.y = 0

if (gameplaySettings.vLine) {
    for (let i = 0; i < 5; i++) {
        if (i == 0) {
            LineGroup.addChild(
                new PIXI.Graphics()
                    .beginFill(lineColor)
                    .drawRect(120, 0, 2, 873)
                    .endFill()
            )
        } else {
            LineGroup.addChild(
                new PIXI.Graphics()
                    .beginFill(lineColor)
                    .drawRect(240 * i + 120, 0, 2, 873)
                    .endFill()
            )
        }

    }
}

const NoteGroup = new PIXI.Container();
NoteGroup.width = areaWidth;
NoteGroup.height = height;
NoteGroup.x = 0;
NoteGroup.y = 0;

const TapNoteGroup = new PIXI.Container();
TapNoteGroup.width = areaWidth - 2 * seedNoteWidth
TapNoteGroup.height = height;
TapNoteGroup.x = seedNoteWidth;
TapNoteGroup.y = 0;

const SeedLeftNoteGroup = new PIXI.Container();
SeedLeftNoteGroup.width = seedNoteWidth
SeedLeftNoteGroup.height = height;
SeedLeftNoteGroup.x = 0;
SeedLeftNoteGroup.y = 0;

const SeedRightNoteGroup = new PIXI.Container();
SeedRightNoteGroup.width = seedNoteWidth
SeedRightNoteGroup.height = height;
SeedRightNoteGroup.x = areaWidth - seedNoteWidth;
SeedRightNoteGroup.y = 0;

const BrightNoteGroup = new PIXI.Container();
BrightNoteGroup.width = areaWidth - 2 * seedNoteWidth
BrightNoteGroup.height = height;
BrightNoteGroup.x = seedNoteWidth
BrightNoteGroup.y = 0;

const Character = PIXI.Sprite.from(character);
Character.anchor.y = 1
Character.anchor.x = 0.5
Character.height = 266;
Character.width = 150;
Character.x = 60
Character.y = judgeLineY - 32

NoteGroup.addChild(
    TapNoteGroup,
    SeedLeftNoteGroup,
    SeedRightNoteGroup,
    BrightNoteGroup
);

LaneGroup.addChild(
    background,
    judgeLine,
    LineGroup,
    Character,
    NoteGroup
);

export { 
    LaneGroup,
    Character,
    TapNoteGroup,
    SeedLeftNoteGroup,
    SeedRightNoteGroup,
    BrightNoteGroup,
    judgeLineY
}