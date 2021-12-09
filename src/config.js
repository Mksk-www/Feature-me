
let SCREEN_WIDTH = 1920;
let SCREEN_HEIGHT = 1080;
let MARKER_RADIUS = 70;
let MARKER_STROKE_WIDTH = 1;

let TRACK_NUM = 5;
let ICON_INTERVAL_DEGREE = 60; // 22.5

let MARKER_APPEARANCE_DELTA = 750; // ノーツ出現時間(ms): 大きくするほど低速
let UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.3 ;
let MUSIC_START_DELAY;
let UNTI_ICON_Y = 625



// キーボード操作用
var KEYCODE_TO_KEYDATA_MAP = {
    68: { key: "d", id: 0 },
    70: { key: "f", id: 1 },
    74: { key: "j", id: 2 },
    75: { key: "k", id: 3 },
		32: { key: "space", id: 4 }

};
var INDEX_TO_KEY_MAP = {};
KEYCODE_TO_KEYDATA_MAP.forIn(function (key, val) {
    INDEX_TO_KEY_MAP[val.id] = val.key;
});

/* var ASSETS = {
    font:{
        IBMPlex:"../IBMPLEXSANSJP-EXTRALIGHT.ttf",
        Montserrat:"../MONTSERRAT-EXTRALIGHT.ttf"
    },
    sound: {
        music: "./assets/test/test.mp3",
        ring: "./assets/effect.mp3",
    },
    json: {
        beatmap: "./assets/test-new/test-new.json"
    }
}; */

var ASSETS = {
	font:{
		IBMPlex:"../IBMPLEXSANSJP-EXTRALIGHT.ttf",
    Montserrat:"../MONTSERRAT-EXTRALIGHT.ttf"
	},
	sound:{
		music:"./assets/test-new/testSound.mp3",
		ring:"./assets/effect.mp3",
		assist:"./assets/rhythm_assist_sound.mp3"
	},
	json:{
		beatmap:"./assets/test-new/test-new.json"
	}
}
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


const musicList = [
	{
		name:"ラエルの歌(笑)",
		music:"./assets/ラエルの歌/ラエルの歌.mp3",
		beatmap:"./assets/ラエルの歌/beatmap.json",
		bpm:60,
		lev:13,
		diff:"expert",
		nd:"Raetan",
		duration:"00:20",
		thumb:"./assets/ラエルの歌/image.png"
	},
	{
		name:"BGS -乱打Edition-",
		music:"./assets/BGS/BgS.mp3",
		beatmap:"./assets/BGS/beatmap.json",
		bpm:180,
		lev:20,
		diff:"master",
		nd:"Raetan",
		duration:"00:20",
		thumb:"./assets/BGS/image.png"
	},
	{
		name:"ちゅ縺｡繧ーりﾂ縺翫▲縺ｷぷノｮ縺?◆うﾀ",
		music:"./assets/チューリップのうた/tyurippu.mp3",
		beatmap:"./assets/チューリップのうた/beatmap.json",
		bpm:104,
		lev:15,
		diff:"master",
		nd:"Mksk",
		duration:"00:51"
	},
	{
		name:"Feat you.",
		music:"./assets/feat_you/Feat_You._3.mp3",
		beatmap:"./assets/feat_you/beatmap.json",
		bpm:120,
		lev:14,
		duration:"01:33",
		diff:"master",
		nd:"Raetan",
	}/* ,
	{
		name:"Test Feature Me",
		music:"./assets/test/test_feature_me.mp3",
		beatmap:"./assets/test/beatmap.json"
	} */
]

const effectType = [
	{
		name:"default",
		sound:"./assets/Finger_Snap01-1.mp3"
	},
	{
		name:"pop",
		sound:"./assets/effect.mp3"
	},
	{
		name:"poop",
		sound:"./assets/yukumo_0001_1.mp3"
	}
]

