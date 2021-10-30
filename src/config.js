
var SCREEN_WIDTH = 1280;
var SCREEN_HEIGHT = 720;
var MARKER_RADIUS = 70;
var MARKER_STROKE_WIDTH = 1;

var TRACK_NUM = 4;
var ICON_INTERVAL_DEGREE = 60; // 22.5

var MARKER_APPEARANCE_DELTA = 1000; // ノーツ出現時間(ms): 大きくするほど低速
var UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.3 ;
var MUSIC_START_DELAY = 2000;



// キーボード操作用
var KEYCODE_TO_KEYDATA_MAP = {
    68: { key: "d", id: 0 },
    70: { key: "f", id: 1 },
    74: { key: "j", id: 2 },
    75: { key: "k", id: 3 },

};
var INDEX_TO_KEY_MAP = {};
KEYCODE_TO_KEYDATA_MAP.forIn(function (key, val) {
    INDEX_TO_KEY_MAP[val.id] = val.key;
});

var ASSETS = {
    font:{
        IBMPlex:"../IBMPLEXSANSJP-EXTRALIGHT.ttf",
        Montserrat:"../MONTSERRAT-EXTRALIGHT.ttf"
    },
    sound: {
        music: "./assets/test/test.mp3",
        ring: "./assets/test/testse.mp3",
    },
    json: {
        beatmap: "./assets/test/test.json"
    }
};

// テスト用譜面
// var DEBUG_BEATMAP = {
//   offset: 0,
//   notes: [],
// };
// (100).times(function(i) {
//   DEBUG_BEATMAP.notes.push({
//     track: i%9,
//     targetTime: 500*i
//   });
// });
