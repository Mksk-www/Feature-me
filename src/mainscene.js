"use strict";
/**
 * メイン
 */
phina.define('MainScene', {
    superClass: 'DisplayScene',

    init: async function (options) {
        this.superInit(options);
        var self = this;
        var gx = this.gridX;
        var gy = this.gridY;
        var AM = phina.asset.AssetManager;
        // var beatmap = DEBUG_BEATMAP;
        var beatmap = AM.get('json', 'beatmap').data;
        this.beatmap = beatmap;
        //this.backgroundColor = beatmap.backgroundColor?beatmap.backgroundColor:"rgb(33,59,40)";
        this.backgroundColor = beatmap.backgroundColor ? beatmap.backgroundColor : "rgb(50,50,55)";

        MUSIC_START_DELAY = (60 / beatmap.BPM) * 1000 * 6 + 100

        // タイマーのセット
        this.elapsedTime = 0; // 経過時間
        this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間

        this.technicalScore = 0;
		this.featureScore = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.RatePerfectC = 0;
        this.RatePerfect = 0;
        this.RateGreat = 0;
        this.RateMiss = 0;
        this.fast = 0;
        this.late = 0;
        this.awakedNotes = 0;

        this.position = "left";

        this.RATING_TABLE = {
            Stunning_Bloom: {
                score: 1000000 / beatmap.notes.length,
                range: 45, //ms
            },
            Bloom: {
                score: 500000 / beatmap.notes.length,
                range: 90, //ms
            },
            MISS: {
                score: 0,
                range: 135, //ms
            },
        };
        this.keyboard = new phina.input.Keyboard();

        playing = beatmap.title;

        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                SoundManager.play('assist');
                console.log(this.elapsedTime)
            }, (60 / beatmap.BPM * i+1) * 1000)
        }

        // 時間が来たら音楽流す
        this.one('musicstart', function () {
            SoundManager.setVolume(effectVolume / 100);
            SoundManager.setVolumeMusic(musicVolume / 100);
            SoundManager.playMusic('music', null, false);
        });

        setTimeout(() => {
            this.backGroundCover.width = SCREEN_WIDTH;
            this.positionIconGroup.children.forEach(e => {
                e.fill = "transparent"
                e.background = "transparent"
            })
            result(this.technicalScore, this.combo, this.maxCombo, this.RatePerfect, this.RateGreat, this.RateMiss, this.fast, this.late, beatmap.title)
        }, beatmap.duration + 1000)

        this.backGround = Sprite("background").addChildTo(this)
        this.backGround.origin.set(0, 0);
        this.backGround.width = SCREEN_WIDTH;
        this.backGround.height = SCREEN_HEIGHT;

        this.backGroundCover = RectangleShape({
            stroke: false,
            strokeWidth: 0,
            height: SCREEN_HEIGHT,
            width: 960,
            fill: "rgba(0,0,0,0.7)"
        }).setPosition(gx.center(), gy.center()).addChildTo(this)

		//ポジションノーツラインの配置
		this.positionIconGroup = DisplayElement()
            .setPosition(gx.center(), gy.span(5))
            .addChildTo(this);

        for (let j = 0; j < 2; j++) {
            let icon;
            let posX;
            if (j == 0) posX = -550;
            else posX = 550;
            PositionNotesIcon(j == 0 ? "Left" : "Right").setPosition(posX, gy.span(3)).addChildTo(this.positionIconGroup);
            PositionNotesIconLine(j == 0 ? "Left" : "Right").setPosition(posX, UNIT_ICON_Y).addChildTo(this.positionIconGroup);
        }

		//リズムラインの配置
		this.horizonalBeatsLineGroup = DisplayElement()
            .setPosition(gx.center(), 0)
            .addChildTo(this);
		
		for (let i = 0; i < (beatmap.duration/beatmap.BPM/horizonalBeatsLineTiming/2); i++) {
			const targetTime = (60 / beatmap.BPM * i * 4) * 1000
			HorizonalBeatsLine(targetTime).addChildTo(this.horizonalBeatsLineGroup);
			console.log("beatsline:",targetTime);
		}
		
        // ノーツラインの配置
        let iconGroup = DisplayElement()
            .setPosition(gx.center(), gy.span(5))
            .addChildTo(this);
        for (let i = 0; i < TRACK_NUM; i++) {
            let label = INDEX_TO_KEY_MAP[i];
            let icon;
            let posX;
            if (i == 4) posX = 0;
            else posX = 240 * i - 360;
            if (i < 3 && vLine) {
                VerticalLine().setPosition(gx.center() + posX + 120, SCREEN_HEIGHT / 2).addChildTo(this);
            }
            icon = UnitIcon(i, label).setPosition(posX, UNIT_ICON_Y).addChildTo(iconGroup);
            icon.onpointstart = function () {
                self.judge(this); // 自分を渡す
            };
        }


        // キーボード判定
        this.on('keydown', function input(e) {
            /* var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
                if (keyData !== undefined) {
                    var icon = iconGroup.getChildAt(keyData.id);
                    self.judge(icon);
                }     */
        });
        window.addEventListener('keydown', (e) => {
            if (e.key == KEY_TO_JUDGE_LIST[5].key) return self.moveCharacter("left");
            else if (e.key == KEY_TO_JUDGE_LIST[6].key) return self.moveCharacter("right");
            var keyData = KEY_TO_JUDGE_LIST.find(f=>f.key==e.key);
            if (keyData) {
                const icon = iconGroup.getChildAt(KEY_TO_JUDGE_LIST.indexOf(keyData));
                self.judge(icon);
            }
        })

		//キャラクター
		this.character = Sprite("character_back").setPosition(gx.center()-550,gy.center()+UNIT_ICON_Y/4).setSize(150,266).addChildTo(this)
        // 譜面の展開
        this.markerGroup = DisplayElement()
            .setPosition(iconGroup.x, 0)
            .addChildTo(this);
        beatmap.notes.forEach(function (note) {
			const targetTime = (60 / beatmap.BPM * note.count) * 1000
            let type;
			let thisNoteSpeed;
            if (note.track < 4) type = "normal";
            if (note.track == 4) type = "space";
            if (note.track > 4) type = "position";
            //TargetMarker(note.targetTime, note.track) msカウント
			if(note.speed){
				switch(note.speed.type){
					case "absolute":
						thisNoteSpeed = -70 * note.speed.value + 1500
					break;
					case "relative":
						thisNoteSpeed = -70 * (note.speed.value + notesSpeed) + 1500
					break;
					case "fixed":
						thisNoteSpeed = note.speed.value;
					break;
				}
				
			}
            TargetMarker(targetTime, note.track, type,thisNoteSpeed) //BPM
                .addChildTo(self.markerGroup);
            console.log(note.track,targetTime)


        })

        // score表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: "whitesmoke",
            fill: "white",
            strokeWidth: 2,
            fontSize: 84,
            fontFamily: "Montserrat"
        })
            .setPosition(gx.span(0.25), gy.span(1))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = Math.round(self.technicalScore);
            });

        // combo表示
        this.scoreLabel = Label({
            text: 0,
            align: "center",
            stroke: false,
            fill: "#999",
            strokeWidth: 2,
            fontSize: 96,
            fontFamily: "Montserrat",
        })
            .setPosition(gx.center(), gy.span(6))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = self.combo;
            });

        // maxcombo表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#ddd",
            strokeWidth: 2,
            fontSize: 28,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(3))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "MAX Chain:" + self.maxCombo;
            });


        // CRITICAL PERFECT表示
        /*         this.scoreLabel = Label({
                    text: 0,
                    align: "left",
                    stroke: false,
                    fill: "#eabc02",
                    strokeWidth: 2,
                    fontSize: 24,
                    fontFamily: "Montserrat",
                    width: 200
                })
                    .setPosition(gx.span(0.25), gy.span(3))
                    .addChildTo(this)
                    .on('enterframe', function () {
                        this.text = "CRITICAL PERFECT:" + self.RatePerfectC;
                    }); */

        // PERFECT表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            /*fill: "#c14e01",*/
            fill: "#eabc02",
            strokeWidth: 2,
            fontSize: 28,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(4))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "Stunning Bloom:" + self.RatePerfect;
            });

        // GREAT表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#35c101",
            strokeWidth: 2,
            fontSize: 28,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(5))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "Bloom:" + self.RateGreat;
            });

        // MISS表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#aaa",
            strokeWidth: 2,
            fontSize: 28,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(6))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "MISS:" + self.RateMiss;
            });

		this.card = Sprite('character_card').setPosition(gx.span(14.55), gy.span(5)).setSize(340,170).addChildTo(this)
		
		this.skillText = Label({
			text: "FEATURE SCORE \nincreased to 110%",
            align: "left",
            stroke: false,
            fill: "whitesmoke",
            strokeWidth: 2,
            fontSize: 32,
            fontFamily: "Montserrat",
            width: 340
		}).setPosition(gx.span(13.375),gy.span(7)).addChildTo(this)
		
		this.featurescoretext = Label({
			text: "FEATURE SCORE",
            align: "left",
            stroke: false,
            fill: "whitesmoke",
            strokeWidth: 2,
            fontSize: 16,
            fontFamily: "Montserrat",
            width: 340
		}).setPosition(gx.span(13.375),gy.span(0.5)).addChildTo(this)
		
		this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: "whitesmoke",
            fill: "white",
            strokeWidth: 2,
            fontSize: 64,
            fontFamily: "Montserrat"
        })
            .setPosition(gx.span(13.375), gy.span(1.5))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = Math.round(self.featureScore);
            });
        // Debug用タイマー表示
        // Label({
        //   fill: "white",
        //   fontSize: 50,
        // })
        // .setOrigin(0, 1)
        // .setPosition(gx.span(1), gy.span(15))
        // .addChildTo(this)
        // .on('enterframe', function() {
        //   this.text = self.elapsedTime+" ms";
        // });

        // this.on('enter', function() {
        //   this.app.keyboard.on('keydown', function(e) {
        //     console.log(e.keyCode);
        //   })
        // })
    },

    update: function (app) {
        var self = this;
        var ps = app.pointers;
        var kb = app.keyboard;

        // タイマー加算
        this.elapsedTime += app.deltaTime;
        this.gameTime += app.deltaTime;

        //進捗度合い更新
        //select("#trackprogress").style.width = Math.floor((this.gameTime / this.beatmap.duration) * window.innerWidth) + "px";
        // ゲームスタートまでの猶予
        if (this.has('musicstart') && this.elapsedTime > MUSIC_START_DELAY) {
            this.flare('musicstart');
        }

        const positionLines = this.positionIconGroup.children;


        // マーカー描画
        const markers = this.markerGroup.children;
		const lines = this.horizonalBeatsLineGroup.children;
		lines.forEach(function(l){
			if (!l.isAwake) return;
			const time = this.gameTime
            const rTime = l.targetTime - time; // 相対時間
			if (rTime < MARKER_APPEARANCE_DELTA) {
                // マーカーの位置比率や縮小率（倍率）を計算する
                // ratioはアイコンに近いほど1.0に近づく
                const ratio = (time - (l.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
                const distance = UNIT_ICON_Y * 1.6 * ratio;

                l.setVisible(true)
                    .setPosition(
                        0,
                        l.vector.y * distance
                    )
                    .setScale(1, 1);
            }else{
				l.setVisible(false);
				 if (MARKER_APPEARANCE_DELTA < -rTime) {
					 l.isAwake = true;
				 }
			}
		}.bind(this))
        markers.forEach(function (m) {
            if (!m.isAwake) return;
            const time = this.gameTime
            const rTime = m.targetTime - time; // 相対時間
            let posX;
            if (m.trackId == 4) posX = 0;
            else if (m.trackId == 5) posX = -550;
            else if (m.trackId == 6) posX = 550
            else posX = 240 * m.trackId - 360;
            if (rTime < (m.noteSpeed||MARKER_APPEARANCE_DELTA)) {
                // マーカーの位置比率や縮小率（倍率）を計算する
                // ratioはアイコンに近いほど1.0に近づく
                const ratio = (time - (m.targetTime - (m.noteSpeed||MARKER_APPEARANCE_DELTA))) / (m.noteSpeed||MARKER_APPEARANCE_DELTA);
                const distance = UNIT_ICON_Y * 1.6 * ratio;

                m.setVisible(true)
                    .setPosition(
                        posX,
                        m.vector.y * distance
                    )
                    .setScale(1, 1);
            }

            if (m.trackId > 4 && 30 > Math.abs(rTime)) {
                console.log(rTime, m.trackId, this.position)
                if ((m.trackId == 5 && this.position == "left") || (m.trackId == 6 && this.position == "right")) {
                    SoundManager.play('ring');
                    this.reaction(m, "Stunning Bloom", "");
                    this.combo++;
                    this.RatePerfect++;
                    if (this.maxCombo < this.combo) this.maxCombo = this.combo;
                    this.totalScore += this.RATING_TABLE["Stunning_Bloom"].score;
					positionLines.forEach(e=>{
						if(!e.line)return;
			            if(m.trackId==5&&e.id==5&&this.position=="left") e.fireEffect();
						else if(m.trackId==6&&e.id==6&&this.position=="right") e.fireEffect();
					})
                }
            }

            // miss判定
            if (this.RATING_TABLE["MISS"].range < -rTime) {
                this.reaction(m, "MISS", "LATE");
                this.combo = 0;
                this.RateMiss++;
            }
        }.bind(this));

    },

    // 判定処理
    judge: function (unitIcon) {
        const time = this.gameTime;

        // 判定可能マーカーを探索
        const markers = this.markerGroup.children;
        let markertf;
        markers.some(function (m) {
            if (m.isAwake && m.trackId == unitIcon.id) {
                // マーカーが有効かつtrackIdが一致、かつ判定範囲内
                // 判定が狭い順に判定し、該当したらループ拔ける
                const delta = Math.abs(m.targetTime - time);
                const FastLateDelta = m.targetTime - time
                /* if (delta <= this.RATING_TABLE["perfectC"].range) {
                    unitIcon.fireEffect();
                    SoundManager.play('ring');
                    this.reaction(m, "CRITICAL PERFECT");
                    this.combo++;
                    this.RatePerfectC++;
                    if (this.maxCombo < this.combo) this.maxCombo = this.combo;
                    return true;
                } */

                if (delta <= this.RATING_TABLE["Stunning_Bloom"].range) {
                    unitIcon.fireEffect("#eabc02");
                    SoundManager.play('ring');
                    let FL = "";
                    if (FastLateDelta > 33) {
                        FL = "FAST";
                        this.fast++;
                    }
                    else if (FastLateDelta < -33) {
                        FL = "LATE";
                        this.late++;
                    }
                    this.reaction(m, "Stunning Bloom", FL);
                    this.combo++;
                    this.RatePerfect++;
                    if (this.maxCombo < this.combo) this.maxCombo = this.combo;
                    return markertf = true;
                }
                if (delta <= this.RATING_TABLE["Bloom"].range) {
                    unitIcon.fireEffect("#35c101");
                    SoundManager.play('ring');
                    let FL = "";
                    if (FastLateDelta > 45) {
                        FL = "FAST";
                        this.fast++;
                    }
                    else if (FastLateDelta < -45) {
                        FL = "LATE";
                        this.late++;
                    }
                    this.reaction(m, "Bloom", FL);
                    this.combo++;
                    this.RateGreat++;
                    if (this.maxCombo < this.combo) this.maxCombo = this.combo;
                    return markertf = true;
                }
                if (delta <= this.RATING_TABLE["MISS"].range) {
                    let FL = "";
                    if (FastLateDelta > 0) {
                        FL = "FAST";
                        this.fast++;
                    } else {
                        FL = "LATE";
                        this.late++;
                    }
                    this.reaction(m, "Miss", FL);
                    this.combo = 0;
                    this.RateMiss++;
                    return true;
                }
            } else {

                return;
            }



        }.bind(this));

        if (!markertf) unitIcon.fireEffect("#bbbbbb");

    },

    reaction: function (marker, rating, timing) {
        // マーカー不可視化
        marker.isAwake = false;
        marker.visible = false;

		

        this.awakedNotes++;
        let FLColor;
        let RateColor;
        if (timing === "FAST") FLColor = "blue";
        else FLColor = "red";
        switch (rating) {
            case "Stunning Bloom":
                RateColor = "#eabc02";
                break;
            case "Bloom":
                RateColor = "#35c101";
                break;
            default:
                RateColor = "#aaa"
                break;
        }
        if (judgeType) {
            RateLabel({ text: rating.toUpperCase(), fill: RateColor })
                .setPosition(this.gridX.center(), this.gridY.span(10))
                .addChildTo(this);
        }
        FLLabel({ text: timing, fill: FLColor })
            .setPosition(this.gridX.center(), this.gridY.span(9))
            .addChildTo(this);
        if (rating == "Stunning Bloom") rating = "Stunning_Bloom"
        if (rating == "Miss") rating = "MISS"
        this.technicalScore += this.RATING_TABLE[rating].score;
        Additions(this.RATING_TABLE[rating].score, this.backgroundColor)
            .setPosition(this.gridX.span(0.25), this.gridY.span(2))
            .addChildTo(this);

		if(rating!="MISS"){
			let addFeatureScore = (rating=="Stunning Bloom"?7951:3975);
			if(random(0,100)>5) addFeatureScore*=1.5;
			if(marker>3) addFeatureScore*=1.2;
			addFeatureScore*=1.1
			this.featureScore+= addFeatureScore;		
		}
		
    },
	moveCharacter: async function (rl) {
		/* console.log(this.character.x)
		if(this.position=="right")this.character.tweener.set({x:this.character.x}).to({x:this.gridX.center()+590}, 300, 'easeOutElastic').to({x:this.gridX.center()+550}, 300, 'easeOutElastic')
		else if(this.position=="left") this.character.tweener.set({x:this.character.x}).to({x:this.gridX.center()-590}, 300, 'easeOutElastic').to({x:this.gridX.center()-550}, 300, 'easeOutElastic') */
		console.log(rl,this.position)
		if(rl=="right"&& this.position=="left") {
			//this.character.tweener.set({x:this.gridX.center()-550}).by({x:1100}, 200, 'easeOutElastic');
			this.position = "right";
			for(let i=0;i<50;i++){
				this.character.setPosition(this.character.x+23,this.character.y);
				await sleep(0.01)
			}
			for(let i=0;i<10;i++){
				this.character.setPosition(this.character.x-5,this.character.y);
				await sleep(0.01)
			}
		}
		else if(rl=="left"&& this.position=="right") {
			//this.character.tweener.set({x:this.gridX.center()+550}).by({x:-1100}, 200, 'easeOutElastic')
			this.position = "left";
			for(let i=0;i<50;i++){
				this.character.setPosition(this.character.x-23,this.character.y);
				await sleep(0.01)
			}
			for(let i=0;i<10;i++){
				this.character.setPosition(this.character.x+5,this.character.y);
				await sleep(0.01)
			}
		}
		
		
	}
});

