
let SCREEN_WIDTH = 1920;
let SCREEN_HEIGHT = 1080;
let MARKER_RADIUS = 70;
let MARKER_STROKE_WIDTH = 1;

let TRACK_NUM = 5;
let ICON_INTERVAL_DEGREE = 60; // 22.5

let MARKER_APPEARANCE_DELTA = 750; // ノーツ出現時間(ms): 大きくするほど低速
let UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.3 ;
let MUSIC_START_DELAY;
let UNIT_ICON_Y = 625
const ASSETS_BASE_DIR = "http://api.v0-3x.alpha.featureme.net/"



// キーボード操作用
/*var KEYCODE_TO_KEYDATA_MAP = {
    68: { key: "d", id: 0 },
    70: { key: "f", id: 1 },
    74: { key: "j", id: 2 },
    75: { key: "k", id: 3 },
	32: { key: "space", id: 4 }
};*/

let KEY_TO_JUDGE_LIST = [
	{code:68,key:"d"},
	{code:70,key:"f"},
	{code:74,key:"j"},
	{code:75,key:"k"},
	{code:32,key:" "},
	{code:69,key:"e"},
	{code:75,key:"i"}
]

var INDEX_TO_KEY_MAP = {};
/* KEYCODE_TO_KEYDATA_MAP.forIn(function (key, val) {
    INDEX_TO_KEY_MAP[val.id] = val.key;
}); */
for(const i in KEY_TO_JUDGE_LIST){
	INDEX_TO_KEY_MAP[i] = KEY_TO_JUDGE_LIST[i]["key"]
}

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
		IBMPlex: "IBMPLEXSANSJP-EXTRALIGHT.ttf",
    Montserrat:"./MONTSERRAT-EXTRALIGHT.ttf"
	},
	sound:{
		music:ASSETS_BASE_DIR+"test-new/testSound.mp3",
		ring:ASSETS_BASE_DIR+"effect.mp3",
		assist:ASSETS_BASE_DIR+"rhythm_assist_sound.mp3"
	},
	json:{
		beatmap:ASSETS_BASE_DIR+"test-new/test-new.json"
	},
	image:{
		background:"./src/img/wallpaper (2).png",
		character:"./src/img/Characters/Shiori.png",
		character_back:"./src/img/Characters/Shiori-back.png",
		character_card:"./src/img/Characters/card-shiori.png"
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
		music:ASSETS_BASE_DIR+"ラエルの歌/ラエルの歌.mp3",
		beatmap:ASSETS_BASE_DIR+"ラエルの歌/beatmap.json",
		bpm:60,
		lev:12,
		diff:"expert",
		nd:"Raetan",
		duration:"00:20",
		thumb:ASSETS_BASE_DIR+"ラエルの歌/image.png"
	},
	{
		name:"BGS -乱打Edition-",
		music:ASSETS_BASE_DIR+"BGS/BgS.mp3",
		beatmap:ASSETS_BASE_DIR+"BGS/beatmap.json",
		bpm:180,
		lev:20,
		diff:"master",
		nd:"Raetan",
		duration:"00:20",
		thumb:ASSETS_BASE_DIR+"BGS/image.png"
	},
	{
		name:"Feat you.",
		music:ASSETS_BASE_DIR+"feat_you/Feat_You._3.mp3",
		beatmap:ASSETS_BASE_DIR+"feat_you/beatmap.json",
		bpm:120,
		lev:17,
		duration:"01:33",
		diff:"master",
		nd:"Mksk vs Raetan",
	},
	{
		name:"ours",
		music:ASSETS_BASE_DIR+"ours/ours.mp3",
		beatmap:ASSETS_BASE_DIR+"ours/beatmap.json",
		bpm:80,
		lev:"11+",
		duration:"01:42",
		diff:"advanced",
		nd:"Mksk",
	},{
		name:"ウーパールーパー",
		music:"",
		beatmap:"",
		bpm:0,
		lev:0,
		duration:"00：00",
		diff:"master",
		nd:"-",
	},{
		name:"To Summer",
		music:ASSETS_BASE_DIR+"To_Summer/To_Summer.mp3",
		beatmap:ASSETS_BASE_DIR+"To_Summer/beatmap.json",
		bpm:135,
		lev:15,
		duration:"02:00",
		diff:"master",
		nd:"Mksk",
	},{
		name:"Vocaloid_Eazy",
		music:ASSETS_BASE_DIR+"vocaloid_eazy/Vocaloid_Easy.mp3",
		beatmap:ASSETS_BASE_DIR+"vocaloid_eazy/beatmap.json",
		bpm:120,
		lev:999,
		duration:"???",
		diff:"ozma",
		nd:"???",
	}
]

const effectType = [
	{
		name:"default",
		sound:ASSETS_BASE_DIR+"default.mp3"
	},
	{
		name:"pop",
		sound:ASSETS_BASE_DIR+"effect.mp3"
	},
	{
		name:"poop",
		sound:ASSETS_BASE_DIR+"yukumo_0001_1.mp3"
	}
]

const notesData ={
	color:{
		normal:"#f5f5f5cc",
		space:"#eabc02cc",
		//position:"#09c906"
		position:"#02f768cc"
	},
	height:{
		normal:15,
		space:30,
		position:80
	},
	width:{
		normal:235,
		space:960,
		position:80
	}
}
