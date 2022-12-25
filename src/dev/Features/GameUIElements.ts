import * as PIXI from "pixi.js";
import sleep from "Utils/sleep/sleep";

const width = 1920;
const height = 873;

const areaWidth = 1200;

const judgeLineY = 800

const UIGroup = new PIXI.Container();
UIGroup.x = 0;
UIGroup.y = 0;

const ScoreGroup = new PIXI.Container();
ScoreGroup.x = 24;
ScoreGroup.y = 64;

const JudgesGroup = new PIXI.Container();
JudgesGroup.x = 4;
JudgesGroup.y = 240;

const ChainTextGroup = new PIXI.Container();
ChainTextGroup.x = width / 2;
ChainTextGroup.y = 240;

const JudgeTextGroup = new PIXI.Container();
JudgeTextGroup.width = areaWidth;
JudgeTextGroup.x = (width - areaWidth) / 2;
JudgeTextGroup.y = judgeLineY - 200;


UIGroup.addChild(ScoreGroup, JudgesGroup, ChainTextGroup,JudgeTextGroup);

const scoreTextLabelStyle = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 16,
    fill: '#c0c0c0'
});
const scoreTextLabel = new PIXI.Text("//SCORE", scoreTextLabelStyle);
ScoreGroup.addChildAt(scoreTextLabel, 0)


function updateScoreText(score: number) {
    if (ScoreGroup.children.length > 1) {
        ScoreGroup.removeChildAt(1);
    }
    const style = new PIXI.TextStyle({
        fontFamily: 'Montserrat',
        fontSize: 80,
        fill: '#f5f5f5'
    });
    const text = new PIXI.Text(Math.round(score), style);
    ScoreGroup.addChildAt(text, 1);
}

function updateChainText(chain: number) {
    if (ChainTextGroup.children.length != 0) {
        ChainTextGroup.removeChildAt(0);
    }
    const style = new PIXI.TextStyle({
        fontFamily: 'Montserrat',
        fontSize: 96,
        fill: '#c0c0c0',
        fontWeight:"lighter"
    });
    const text = new PIXI.Text(chain, style);
    text.anchor.set(0.5, 0)
    ChainTextGroup.addChildAt(text, 0);
}

async function createJudgeText(judgeText: string, color: number, accuracy: number, position: number) {
    //label container
    const JudgeTextLabelGroup = new PIXI.Container();
    JudgeTextLabelGroup.width = 240;
    JudgeTextLabelGroup.x = 240 * position + 120;
    if (position == 4) JudgeTextLabelGroup.x = (areaWidth - 240) / 2;

    //if accuracy is bigger than 24, show FAST/LATE
    if (Math.abs(accuracy) > 24) {
        const label = accuracy < 0 ? "FAST" : "LATE";
        const FLLabelStyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 12,
            fill: label == "FAST" ? 0x1f5ff4 : 0xf4751f,
            align:"center"
        });
        const FLLabelText = new PIXI.Text(label,FLLabelStyle);
        const boundingBox = FLLabelText.getBounds();
        FLLabelText.x = (240-boundingBox.width)/2;
        JudgeTextLabelGroup.addChild(FLLabelText)
    }

    const judgeTextStyle = new PIXI.TextStyle({
        fontFamily: 'Montserrat',
        fontSize:20,
        fill:color,
        align:"center"
    })
    const judgeTextLabel = new PIXI.Text(judgeText,judgeTextStyle);
    const boundingBox = judgeTextLabel.getBounds();
    judgeTextLabel.x = (240 - boundingBox.width) / 2;
    judgeTextLabel.y = 20
    JudgeTextLabelGroup.addChild(judgeTextLabel);

    //add to container
    JudgeTextGroup.addChild(JudgeTextLabelGroup);
    
    for (let i = 0; i < 25; i++) {
        JudgeTextLabelGroup.y -= 2;
        JudgeTextLabelGroup.alpha -= 0.02;
        await sleep(750 / 50);
    }
    JudgeTextGroup.removeChild(JudgeTextLabelGroup);

}

export {
    UIGroup,
    ScoreGroup,
    JudgesGroup,
    ChainTextGroup,
    updateChainText,
    updateScoreText,
    createJudgeText
};