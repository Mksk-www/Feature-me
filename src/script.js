let activePage="";
let notesSpeed = 10;
let judgeType = true;
let musicVolume = 100;
let effectVolume = 100;
let effectTypeindex = 0;
let shareText;
let playing;
let playingMusicData;
let selectedMusic = false;
let maxFps = 120;
let uiDetails = 2;
let vLine = 1;
let login = false;
let logintype;
let userData;
let oldUserData;
shortcut.add('esc',()=>{
    if(activePage==="Settings") switchpage('Home');
        else if(activePage==="Home") switchpage('Settings');
        else if(activePage==="play") location.reload();
        else if(activePage==="Character") switchpage('Home')
})
shortcut.add('shift+c', () => {
    if(activePage==="Character") switchpage('Home')
    else switchpage('Character')
})
function select(elem) {
    return document.querySelector(elem);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function switchpage(page) {
	if(activePage=="play") return;
    document.querySelectorAll("#mainframe>div,#bottomframe>div").forEach(e=>e.style.display="none")
    document.querySelectorAll(`#mainframe>div.${page}page,#bottomframe>div.${page}page`).forEach(e=>e.style.display="block")
    select('#pagetitle').textContent = page;
    activePage = page;
}

document.querySelectorAll('#headeritem>img').forEach(e=>{
	e.addEventListener('click',f=>{
		f.stopPropagation();
		f.preventDefault();
	},false)
})
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
        if(!localStorage.getItem('fps')) localStorage.setItem('fps',"120");
        setFps(localStorage.getItem('fps'));
        if(!localStorage.getItem('uidetails')) localStorage.setItem('uidetails',"2");
        setUiDetails(localStorage.getItem('uidetails'));
        if(!localStorage.getItem('vLine')) localStorage.setItem('vLine',"1");
        setVLine(localStorage.getItem('vLine'));
		if(localStorage.getItem('userid')&&localStorage.getItem('username')) autoLogin()

    document.querySelectorAll('.modal>.button:not(.static)').forEach(e=>{
        e.addEventListener('click',()=>{
            e.parentElement.style.animation = "hidemodal 0.3s ease forwards";
            setTimeout(()=>{
                e.parentElement.style.display = "none"
            },300)
        })
    })

	select('#cover').style.animation="hidemodal 0.3s ease forwards";
	await sleep(300);
	select('#cover').style.display="none";
})

window.onerror = e=>{
	console.log(e);
	notification('',e)
}

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
            title: 'Feature Me',
            fps: maxFps,
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

function uiDetailsCtrl(e){
    e = Number(e);
    if(e>0&&uiDetails==3) return;
    if(e<0&&uiDetails==0)return;
    uiDetails+=e;
    setUiDetails(uiDetails);
}
function setUiDetails(e){
    e = Number(e);
    uiDetails = e;
    document.querySelectorAll('.uicss').forEach(e=>e.remove())
    switch(e){
        case 0:
            select('#uidetailsvalue').textContent = "Lowest"
            select('head').insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="./src/style/lowest.css" id="lowestcss" class="uicss">`)
        break;
        case 1:
            select('#uidetailsvalue').textContent = "Low";
            select('head').insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="./src/style/low.css" id="lowcss" class="uicss">`)
        break;
        case 2:
            select('#uidetailsvalue').textContent = "High";
            select('head').insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="./src/style/high.css" id="highcss" class="uicss">`)
        break;
    }
    localStorage.setItem('uidetails',e)
}

function fpsCtrl(e){
    e = Number(e);
    if(e<0&&maxFps<=30)return;
    maxFps += e
    select('#fpsvalue').textContent = maxFps
    localStorage.setItem("fps",maxFps);
}
function setFps(e){
    e = Number(e);
    maxFps = e
    select('#fpsvalue').textContent = maxFps;
    localStorage.setItem("fps",maxFps);
}

function vLineCtrl(e){

    e=Number(e)
    vLine=Boolean(e);
    select('#vlinevalue').textContent = vLine?"Enabled":"Disabled";
    localStorage.setItem("vLine",vLine);
}
function setVLine(e){
    e=Boolean(e);
    vLine = Number(e);
    select('#vlinevalue').textContent = vLine?"Enabled":"Disabled";
    localStorage.setItem("vLine",vLine);
}

function reset(){
    setNotesSpeed(10);
    setMusicVolume(100);
    setEffectVolume(100);
    setJudgeType(true);
    setEffectType(0);
    setFps(120)
}

function setAssets(music){
    ASSETS.sound.music=musicList[music].music;
    ASSETS.json.beatmap =musicList[music].beatmap;
    
    select(`#musicbg`).style.display = "block";
    if(uiDetails!==0){
        select(`.music[onclick="setAssets(${music})"]`).style.position = "absolute";
    select(`.music[onclick="setAssets(${music})"] .title`).style.position = "absolute";
    select(`.music[onclick="setAssets(${music})"] .title`).style.textAlign = "center";
    select(`.music[onclick="setAssets(${music})"] .diff`).style.position = "absolute";
    select(`.music[onclick="setAssets(${music})"] .details`).style.position = "absolute";
    select(`.music[onclick="setAssets(${music})"] > img`).style.position = "absolute";
    select(`.music[onclick="setAssets(${music})"]`).style.zIndex = "9999";
    
    select(`#musicbg`).style.animation = "showmodal 0.5s ease forwards";
    select(`.music[onclick="setAssets(${music})"]`).style.animation = "movemusic 0.5s ease forwards";
    select(`.music[onclick="setAssets(${music})"] > img`).style.animation = "movemusicimg 0.5s ease forwards";
    select(`.music[onclick="setAssets(${music})"] .title`).style.animation = "movemusictitle 0.5s ease forwards";
    select(`.music[onclick="setAssets(${music})"] .diff`).style.animation = "movemusicdiff 0.5s ease forwards";
    select(`.music[onclick="setAssets(${music})"] .details`).style.animation = "movemusicdetails 0.5s ease forwards";
    }
    
    run();
    select('#pagetitle').textContent = musicList[music].name;
	playingMusicData = musicList[music]
}

function closeMusicModal(){
    if(uiDetails!==0){
        select(`#musicbg`).style.animation = "hidemodal 0.5s ease forwards";
    document.querySelectorAll(".music").forEach(e=>{
        e.style.animation = "hidemodal 0.5s ease forwards";
    })	
    }else{
        select(`#musicbg`).style.display="none";
    document.querySelectorAll(".music").forEach(e=>{
        e.style.display = "none";
    })
    }
    
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
    if(totalScore==1000000){
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
    }else if(rateMiss==0){
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
    }
    
    select('#result').style.display = "block"
    select('#result').style.animation = "showmodal 0.3s ease forwards"
	let type;
	if(totalScore==1000000) type="ASB";
	else if(rateMiss==0) type="FC"
	sendNewUserData(rank,totalScore,type);
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
    xhr.open('POST', 'https://FeatureMe-Server.mksksub.repl.co/api/post/leaderboard');
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
    if(score>880000){
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
                <img src="${meta.thumb||"./src/img/Music.png"}" alt="">
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

function showUserDetails(){
	if(login){
		select('#userprofilemodal').style.display = "block"
	    select('#userprofilemodal').style.animation = "showmodal 0.3s ease forwards"	
	}else{
		select('#loginmodal').style.display = "block"
	    select('#loginmodal').style.animation = "showmodal 0.3s ease forwards"
	}
	
}

function loginxhr() {
	document.querySelectorAll('#login-username-error,#login-password-error').forEach(e=>e.textContent="");
	const name = select('input[name="username-login"]').value;
	const pass = select('input[name="password-login"]').value;
	if(logintype=="login"){
		let xhr = new XMLHttpRequest();
	    xhr.open('POST', 'https://FeatureMe-Server.mksksub.repl.co/api/post/account/login');
	    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	    xhr.send(`username=${name}&password=${pass}&auto=false`);
		xhr.onload = e=>{
			const res = JSON.parse(xhr.response)
			if(xhr.response.includes('Error')) notification("エラーが発生しました.後ほどお試しください.",res.details);
			else {
				userData = res;
				login = true;
				setUserData();
				notification('',"ログインしました.");
				select('#loginmodal').style.animation = "hidemodal 0.3s ease forwards";
	            setTimeout(()=>{
	                select('#loginmodal').style.display = "none"
	            },300)
	        }
		}
	}else{
		if(!name.match(/^[A-Za-z0-9]+$/)||name.length>11||!name){
			select('#login-username-error').textContent = `ユーザー名で使用でるのは10文字以内の半角英数字です.`;
			return;
		}
		if(!pass.match(/^[A-Za-z0-9]+$/)||pass.length>33||pass.length<6){
			select('#login-password-error').textContent = `パスワードで使用できるのは6から32文字の半角英数字です.`;
			return;
		}
		let xhr = new XMLHttpRequest();
	    xhr.open('POST', 'https://FeatureMe-Server.mksksub.repl.co/api/post/account/register');
	    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	    xhr.send(`username=${name}&password=${pass}`);
		xhr.onload = e=>{
			const res = JSON.parse(xhr.response)
			console.log(res);
			if(xhr.response.includes('Error')) notification("エラーが発生しました.後ほどお試しください.",res.details);
			else {
				notification('登録完了',"正常に登録しました.ログインしてください.");
				select('#loginmodal').style.animation = "hidemodal 0.3s ease forwards";
	            setTimeout(()=>{
	                select('#loginmodal').style.display = "none"
					select('#loginmodal-first').style.display='block';select('#loginmodal-second').style.display='none';
					select('#submit-login').style.display='none';
	            },300)
				
	        }
			}
		}
	}

async function notification(title,details) {
	let notificationdiv = document.createElement("div");
	console.log(notificationdiv)
	notificationdiv.className = "notification";
	document.body.appendChild(notificationdiv);
	notificationdiv.innerHTML=`
	<h2>${title}</h2>
	<p>${details}</p>
	`
	notificationdiv.style.animation = "notificationshow 0.3s ease forwards";
	await sleep(3000);
	notificationdiv.style.animation = "notificationhide 0.3s ease forwards";
	await sleep(300)
	notificationdiv.remove();
	
}

function setUserData(){
	localStorage.setItem("userid",userData.id);
	localStorage.setItem("username",userData.name);
	select('#userlevel').textContent = `Lv.${userData.level}`;
	select('#userrating').textContent = userData.rating;
	select('#userrating').style.background = colorRating(userData.rating);
	select('#username').textContent = userData.name;
}

function autoLogin() {
	let xhr = new XMLHttpRequest();
	    xhr.open('POST', 'https://FeatureMe-Server.mksksub.repl.co/api/post/account/login');
	    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	    xhr.send(`username=${localStorage.getItem('username')}&id=${localStorage.getItem('userid')}&auto=true`);
		xhr.onload = e=>{
			const res = JSON.parse(xhr.response)
			if(xhr.response.includes('Error')) notification("エラーが発生しました.後ほどお試しください.",res.details);
			else {
				userData = res;
				login = true;
				setUserData();
				if(!document.cookie.split(';').some((item) => item.trim().startsWith('login'))){
					document.cookie = "login=true"
					 notification('',"ログインしました.");
				}
				select('#loginmodal').style.animation = "hidemodal 0.3s ease forwards";
	            setTimeout(()=>{
	                select('#loginmodal').style.display = "none"
	            },300)
	        }
		}
}

function openmypage(params) {
	window.open(`https://FeatureMe-Server.mksksub.repl.co/account/${userData.name}`)
}

function logout(params) {
	localStorage.removeItem('username');
	localStorage.removeItem('userid');
	userData = null;
	select('#userlevel').textContent = `Lv.0`;
	select('#userrating').textContent = `00.00`;
	select('#username').textContent = `Guest`;
	login = false;
}

function sendNewUserData(rank,score,type) {
	score = String(score)
	let rating = playingMusicData.lev;
	const score2 = Number(score.slice(-4,-2));
	const score3 = Number(score.slice(-4,-1));
	let exp = 300;
	switch(rank){
		case "SSS+":
			rating+=2.5
			break;
		case "SSS":
			rating+=2
			break;
		case "SS+":
			rating+= 1.5+(score3-500)/500
			break;
		case "SS":
			rating+= 1+score2/100;
			break;
		case "S+":
			rating+= 0.5+score2/100;
			break;
		case "S":
			rating+= score2/100;
			break;
		default:
			rating-= (910000-score)/50000;
			break;
	}
	if(type=="ASB") {
		rating+=0.3;
		exp+=500;
	}
	else if(type=="FC") {
		rating+=0.05;
		exp+=100
	}
	rating = Math.floor(rating*100)/100
	if(rating<0) rating = 0;
	console.log(rating);

	if(!login) return;
	let xhr = new XMLHttpRequest();
	    xhr.open('POST', 'https://FeatureMe-Server.mksksub.repl.co/api/post/account/newdata');
	    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	    xhr.send(`username=${localStorage.getItem('username')}&id=${localStorage.getItem('userid')}&rating=${rating}&exp=${exp}`);
		xhr.onload = e=>{
			const res = JSON.parse(xhr.response)
			if(xhr.response.includes('Error')) notification("エラーが発生しました.後ほどお試しください.",res.details);
			else {
				const res = JSON.parse(xhr.response);
				oldUserData = userData
				userData = res;
				setUserData();
				showDiffUserData();
				notification('',"ユーザー情報を更新しました.");
			}
		}
}

async function showDiffUserData() {
	select('#oldrating').textContent = oldUserData.rating;
	select('#oldrating').style.background = colorRating(oldUserData.rating);
	select('#newrating').textContent = userData.rating;
	select('#newrating').style.background = colorRating(userData.rating);
	let diff;
	if(oldUserData.rating<userData.rating) diff= `+${Math.round((userData.rating - oldUserData.rating)*100)/100}`
	else if(oldUserData.rating>userData.rating) diff= `-${Math.round((oldUserData.rating - userData.rating)*100)/100}`
	else diff = "±00.00"
	select('#ratingdiffvalue').textContent = diff;
	select('#totalexp').textContent = userData.exp;
	select('#requiredexp').textContent = Math.round(userData.requiredexp);
	select('#explevel').textContent = userData.level;
	select('#expdiffvalue').textContent = userData.exp - oldUserData.exp;
	
	select('#ratingdiff').style.animation = "shownametip 0.3s ease-out forwards";
	await sleep(2000);
	select('#ratingdiff').style.animation = "hidenametip 0.3s ease-in forwards";
	await sleep(300);
	select('#expdiff').style.animation = "shownametip 0.3s ease-out forwards";
	select('#expdiff').style.backgroundSize = `${(userData.exp/userData.requiredexp)*100}%`;
	await sleep(2000);
	select('#expdiff').style.animation = "hidenametip 0.3s ease-in forwards";
}

function colorRating(rating) {
	console.log(Math.floor(Math.abs(rating)/2))
	const ratingTable = ["whitesmoke","#30e648","#e6e30","#e69a30","#e63030","#9a26de","#8a6978","#84c7d1","#f2d624"]
	if(rating>18) return "linear-gradient(to bottom, #74ebd5, #acb6e5)";
	else return ratingTable[Math.floor(Math.abs(rating)/2)]
}