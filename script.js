const { ipcRenderer } = require('electron')
//const Keyv = require('keyv')
const phina = require('phina.js');
//const UserDB = new Keyv('sqlite://db.sqlite',{table:"userData"})
//const RatingDB = new Keyv('sqlite://db.sqlite', { table: "Rating" })
let userData = {};
let RatingData = {}
let activePage="";
/*  shortcut.add('ctrl+r',()=>{;},{
        type: 'keydown',
        propagate: false,
        disable_in_input: false,
        target: document,
}) 
 */
shortcut.add('esc',()=>{
    if(activePage==="Settings") switchpage('Home')
})
shortcut.add('ctrl+s', () => {
    if (activePage === "Settings") {
        saveDB(); 
        setUserParams();
    }
})
async function closeWindow(params) {
    //await saveDB();
    window.close()
}

function maximize() {
    ipcRenderer.send('maximize')
}

function minimize() {
    ipcRenderer.send('minimize')
}

function select(elem) {
    return document.querySelector(elem);
}

/* async function GetDB(params) {
    userData = (await UserDB.get('userdata')) || {
        UserName: "UserName",
        UserLevel: 1,
        UserRating: "00.00"
    }
    RatingData = (await RatingDB.get('userrating')) || {
        Recent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        Best: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}
 */
function setUserParams(params) {
    /* select("#username").textContent = userData.UserName;
    select("#userlevel").textContent = "Lv."+userData.UserLevel;
    select("#userrating").textContent = userData.UserRating; */
}

function switchpage(page) {
    document.querySelectorAll("#mainframe>div,#bottomframe>div").forEach(e=>e.style.display="none")
    document.querySelectorAll(`#mainframe>div.${page}page,#bottomframe>div.${page}page`).forEach(e=>e.style.display="block")
    select('#pagetitle').textContent = page;
    activePage = page;
}

async function saveDB(params) {
/*     await UserDB.set("userdata", userData);
    await RatingDB.set('userrating', RatingData) */
}
window.addEventListener("load",async()=>{
    switchpage('Home')
    document.querySelectorAll('img').forEach(e=>e.setAttribute('draggable','false'))
    //await GetDB();
    setUserParams();
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

})
