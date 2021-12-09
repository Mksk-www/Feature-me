let activePage="";
let notesSpeed = 10;
let judgeType = true;
let musicVolume = 100;
let effectVolume = 100;
let effectTypeindex = 0;
let shareText;
let playing;
let selectedMusic = false;
shortcut.add('esc',()=>{
    if(activePage==="Settings") switchpage('Home');
		else if(activePage==="Home") switchpage('Settings');
		else if(activePage==="play") location.reload()

})
shortcut.add('ctrl+s', () => {
    if (activePage === "Settings") {
    }
})
function select(elem) {
    return document.querySelector(elem);
}

function switchpage(page) {
    document.querySelectorAll("#mainframe>div,#bottomframe>div").forEach(e=>e.style.display="none")
    document.querySelectorAll(`#mainframe>div.${page}page,#bottomframe>div.${page}page`).forEach(e=>e.style.display="block")
    select('#pagetitle').textContent = page;
    activePage = page;
}
window.addEventListener("load",async()=>{
    switchpage('Home');
		setMusicList();
    document.querySelectorAll('img').forEach(e=>e.setAttribute('draggable','false'))
    if(!localStorage.getItem('notesSpeed')) localStorage.setItem('notesSpeed',"10");
		setNotesSpeed(localStorage.getItem('notesSpeed'));
		if(!localStorage.getItem('judgeType')) localStorage.setItem('judgeType',"1");
		setJudgeType(localStorage.getItem('judgeType'));
		console.log(localStorage.musicVolume,localStorage.effectVolume)
		if(!localStorage.getItem('musicVolume')) localStorage.setItem('musicVolume',"100")
		setMusicVolume(localStorage.getItem('musicVolume'));
		if(!localStorage.getItem('effectVolume')) localStorage.setItem('effectVolume',"100");
		setEffectVolume(localStorage.getItem('effectVolume'));
		if(!localStorage.getItem('effecttype')) localStorage.setItem('effectType',"0");
		setEffectType(localStorage.getItem('effecttype'));

	document.querySelectorAll('#shareleaderboard .button').forEach(e=>{
		e.addEventListener('click',()=>{
			select('#shareleaderboard').style.animation = "hidemodal 0.3s ease forwards";
			setTimeout(()=>{
				select('#shareleaderboard').style.display = "none"
			},3000)
		})
	})
	select('#updatesmodal>.button').addEventListener('click',()=>{
		select('#updatesmodal').style.animation = "hidemodal 0.3s ease forwards";
			setTimeout(()=>{
				select('#updatesmodal').style.display = "none"
			},3000)
	})
	select('#creditsmodal>.button').addEventListener('click',()=>{
		select('#creditsmodal').style.animation = "hidemodal 0.3s ease forwards";
			setTimeout(()=>{
				select('#creditsmodal').style.display = "none"
			},3000)
	})
	select('#sharemodal>.button').addEventListener('click',()=>{
		select('#sharemodal').style.animation = "hidemodal 0.3s ease forwards";
			setTimeout(()=>{
				select('#sharemodal').style.display = "none"
			},3000)
	})

})

function run(){
	if(selectedMusic) return;
	selectedMusic = true;
phina.main(()=>{
        var app = GameApp({
            assets: ASSETS,
            font: {
                "IBMPlex": "./IBMPLEXSANSJP-EXTRALIGHT.TTF"
            },
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            startLabel: 'title',
            backgroundColor: 'rgb(20,20,30)',
            title: 'MusicGame',
            fps: 120,
        });

         app.enableStats();
        app.run();
    });
select("canvas").style.display="unset";
activePage = "play";
}



function notesSpeedCtrl(e){
	e = Number(e)
	if(e>0&&notesSpeed==20) return
	if(e<0&&notesSpeed==1)return;
	notesSpeed += e;
	if(notesSpeed>=20) notesSpeed = 20;
	if(notesSpeed<=1) notesSpeed = 1
	notesSpeed = (Math.round(notesSpeed*10)/10)
	select('#notesspeedvalue').textContent = notesSpeed;
	 MARKER_APPEARANCE_DELTA = -70*notesSpeed + 1500;
	 localStorage.setItem("notesSpeed",notesSpeed);
}
function setNotesSpeed(e){
	notesSpeed = Number(e);
	select('#notesspeedvalue').textContent = notesSpeed;
	 MARKER_APPEARANCE_DELTA = -70*notesSpeed + 1500;
	 localStorage.setItem("notesSpeed",notesSpeed);
}

function judgeTypeCtrl(e){
	e = Number(e)
	judgeType = Boolean(e);
	if(judgeType) select('#judgetypevalue').textContent = "Text & Effect";
	else select('#judgetypevalue').textContent = "Effect only";
  localStorage.setItem("judgeType",Number(judgeType));
}
function setJudgeType(e){
	e = Number(e)
	judgeType = Boolean(e);
	if(judgeType) select('#judgetypevalue').textContent = "Text & Effect";
	else select('#judgetypevalue').textContent = "Effect only";
	localStorage.setItem("judgeType",Number(judgeType));
}

function musicVolumeCtrl(e){
	e = Number(e)
	if(e>0&&musicVolume==100) return
	if(e<0&&musicVolume==0)return;
	musicVolume += e;
	if(musicVolume>=100) musicVolume = 100;
	if(musicVolume<=0) musicVolume = 0
	select('#musicvolumevalue').textContent = musicVolume;
	 localStorage.setItem("musicVolume",musicVolume);
}
function setMusicVolume(e){
	musicVolume = Number(e);
	select('#musicvolumevalue').textContent = musicVolume;
	 localStorage.setItem("musicVolume",musicVolume);
}

function effectVolumeCtrl(e){
	e = Number(e)
	if(e>0&&effectVolume==100) return
	if(e<0&&effectVolume==0)return;
	effectVolume += e;
	if(effectVolume>=100) effectVolume = 100;
	if(effectVolume<=0) effectVolume = 0
	select('#effectvolumevalue').textContent = effectVolume;
	localStorage.setItem("effectVolume",effectVolume);
}
function setEffectVolume(e){
	effectVolume = Number(e);
	select('#effectvolumevalue').textContent = effectVolume;
	 localStorage.setItem("effectVolume",effectVolume);
}

function effectTypeCtrl(e){
	e = Number(e)
	if(e>0&&effectTypeindex==effectType.length - 1) return
	if(e<0&&effectTypeindex==0)return;
	effectTypeindex += e;
	if(effectTypeindex>=effectType.length) effectTypeindex = effectType.length - 1;
	if(effectTypeindex<=0) effectTypeindex = 0;
	ASSETS.sound.ring = effectType[effectTypeindex].sound;
	const EffectSample = new Audio(effectType[effectTypeindex].sound);
	EffectSample.play();
	select('#effecttypevalue').textContent = effectType[effectTypeindex].name;
	localStorage.setItem("effecttype",effectTypeindex);
}
function setEffectType(e){
	effectTypeindex = Number(e);
	ASSETS.sound.ring = effectType[effectTypeindex].sound;
	select('#effecttypevalue').textContent = effectType[effectTypeindex].name;
	 localStorage.setItem("effecttype",effectTypeindex);
}


function reset(){
	setNotesSpeed(10);
	setMusicVolume(100);
	setEffectVolume(100);
	setJudgeType(true);
	setEffectType(0)
}

function setAssets(music){
	ASSETS.sound.music=musicList[music].music;
	ASSETS.json.beatmap =musicList[music].beatmap;
	select(`.music[onclick="setAssets(${music})"]`).style.position = "absolute";
	select(`.music[onclick="setAssets(${music})"] .title`).style.position = "absolute";
	select(`.music[onclick="setAssets(${music})"] .title`).style.textAlign = "center";
	select(`.music[onclick="setAssets(${music})"] .diff`).style.position = "absolute";
	select(`.music[onclick="setAssets(${music})"] .details`).style.position = "absolute";
	select(`.music[onclick="setAssets(${music})"] > img`).style.position = "absolute";
	select(`.music[onclick="setAssets(${music})"]`).style.zIndex = "9999";
	select(`#musicbg`).style.display = "block";
	select(`#musicbg`).style.animation = "showmodal 0.5s ease forwards";
	select(`.music[onclick="setAssets(${music})"]`).style.animation = "movemusic 0.5s ease forwards";
	select(`.music[onclick="setAssets(${music})"] > img`).style.animation = "movemusicimg 0.5s ease forwards";
	select(`.music[onclick="setAssets(${music})"] .title`).style.animation = "movemusictitle 0.5s ease forwards";
	select(`.music[onclick="setAssets(${music})"] .diff`).style.animation = "movemusicdiff 0.5s ease forwards";
	select(`.music[onclick="setAssets(${music})"] .details`).style.animation = "movemusicdetails 0.5s ease forwards";
	
	run();
	select('#pagetitle').textContent = musicList[music].name;
}

function closeMusicModal(){
	select(`#musicbg`).style.animation = "hidemodal 0.5s ease forwards";
	document.querySelectorAll(".music").forEach(e=>{
		e.style.animation = "hidemodal 0.5s ease forwards";
	})
}
async function result(totalScore,combo,maxCombo,ratePerfect,rateGreat,rateMiss,fast,late,title){
	
	const rank = setScoreRank(totalScore);
	select('#pagetitle').textContent = "Result - "+select('#pagetitle').textContent;
	select('#score').textContent = Math.round(totalScore);
	select('#rank').textContent = rank;
	select('#stunningbloom').textContent = ratePerfect;
	select('#bloom').textContent = rateGreat;
	select('#miss').textContent = rateMiss;
	select('#maxchain').textContent = maxCombo;
	select('#fast').textContent = fast;
	select('#late').textContent = late;
	shareText = encodeURI(`https://twitter.com/intent/tweet?text=音楽ゲーム Feature Me でのリザルト|${title}\nスコア:${Math.round(totalScore)}\nランク${rank}\nShutting Bloom:${ratePerfect}\nBloom:${rateGreat}\nMiss:${rateMiss}\n@makisakadesu @Raetantan より`);
	if(rateMiss==0){
		select('#videobackground').style.display = "block";
		select('#videobackground').style.animation = "showmodal 0.2s ease forwards";
		await sleep(200);
		select('#fullchain').style.display = "block";
		select('#fullchain').play();
		select('#fullchain').addEventListener('ended',async ()=>{
			select('#fullchain').style.display = "none"
			select('#videobackground').style.animation = "hidemodal 0.2s ease forwards";
			await sleep(200);
			select('#videobackground').style.display = "none"
		});
		await sleep(4200);
	}else if(totalScore==1000000){
		select('#asb').style.display = "block";
		select('#videobackground').style.display = "block";
		select('#videobackground').style.animation = "showmodal 0.2s ease forwards";
		await sleep(200);
		select('#asb').play();
		select('#asb').addEventListener('ended',async ()=>{
			select('#asb').style.display = "none"
			select('#videobackground').style.animation = "hidemodal 0.2s ease forwards";
			await sleep(200);
			select('#videobackground').style.display = "none"
		});
		await sleep(4200)
	}
	
	select('#result').style.display = "block"
	select('#result').style.animation = "showmodal 0.3s ease forwards"
}

function shareOnTwitter(){
	window.open(shareText)
}

function showShareModal(){
	select('#sharemodal').style.display = "block"
	select('#sharemodal').style.animation = "showmodal 0.3s ease forwards"
}

function shareOnLeaderboard(){
	select('#shareleaderboard').style.display = "block"
	select('#shareleaderboard').style.animation = "showmodal 0.3s ease forwards"
}
function submitShare(){
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://feature-me-leaderboard.mksksub.repl.co/api/post');
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	xhr.send(`music=${playing}&name=${select('#shareleaderboard>div>input').value}&score=${select('#score').textContent}&rank=${select('#rank').textContent}&time=${getTime()}`)
	console.log("sent result.")
}
function set0(num) {
		var ret;
		if( num < 10 ) { ret = "0" + num; }
		else { ret = num; }
		return ret;
}
function getTime() {
  DWs = new Array('Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.');
  Now = new Date();
  YY = Now.getYear();
	if (YY < 2000) { YY += 1900; }
 	MM = set0( Now.getMonth() + 1 );
 	DD = set0( Now.getDate() );
 	DW = DWs[ Now.getDay() ];
 	hh = set0( Now.getHours() );
 	mm = set0( Now.getMinutes() );
 	ss = set0( Now.getSeconds() );
 	return `${YY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
};


function sleep(msec) { 
	return new Promise(resolve => setTimeout(resolve, msec));
}

function setScoreRank(score){
	const highScore = ["SSS+","SSS","SS+","SS","S+","S","AAA","AA"];
	const lowScore = ["B","C"];
	if(score>=880000){
		return highScore[Math.floor((1000000 - score)/15000)];
	}else if(score>800000){
		return "A";
	}else if(score<=600000){
		return "D";
	}else{
		return lowScore[Math.floor((800000 - score)/100000)];
	}
}

function setMusicList(){
	for(const i in musicList){
		const meta = musicList[i]
		const data = `
			<div class="music" onclick="setAssets(${i})">
				<img src="${meta.thumb?meta.thumb:"./src/img/Music.png"}" alt="">
				<span class="title">${meta.name}</span>
				<span class="diff ${meta.diff}">${meta.lev}</span>
				<span class="details">
					Duration:${meta.duration} <br>
					BPM:${meta.bpm} <br>
					Notes Designer:${meta.nd}
					</span>
			</div>`
		select(".Homepage").insertAdjacentHTML("beforeend",data)
	}
}

