
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

				this.backgroundColor = beatmap.backgroundColor?beatmap.backgroundColor:"rgb(40,40,45)";
				
				MUSIC_START_DELAY = (60/beatmap.BPM)*1000 * 4 + 100

        // タイマーのセット
        this.elapsedTime = 0; // 経過時間
        this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間

        this.totalScore = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.RatePerfectC = 0;
        this.RatePerfect = 0;
        this.RateGreat = 0;
        this.RateMiss = 0;
        this.fast = 0;
        this.late = 0;
				this.awakedNotes = 0;
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

				for(let i = 0;i<4;i++){
					setTimeout(()=>{
						SoundManager.play('assist');
						console.log(this.elapsedTime)
					},(60/beatmap.BPM*i)*1000)
				}

        // 時間が来たら音楽流す
        this.one('musicstart', function () {
					SoundManager.setVolume(effectVolume/100);
					SoundManager.setVolumeMusic(musicVolume/100);
          SoundManager.playMusic('music', null, false);
        });
			
				setTimeout(()=>{
					result(this.totalScore,this.combo,this.maxCombo,this.RatePerfect,this.RateGreat,this.RateMiss,this.fast,this.late,beatmap.title)
				},beatmap.duration+1000)

        // ユニットアイコンの配置
        var iconGroup = DisplayElement()
            .setPosition(gx.center(), gy.span(5))
            .addChildTo(this);
        for (var i = 0; i < TRACK_NUM; i++) {
            let label = INDEX_TO_KEY_MAP[i].toUpperCase();
            let icon;
						let posX;
						if(i==4) posX = 0;
						else posX = 240 * i - 360;
						icon = UnitIcon(i, label).setPosition(posX,UNTI_ICON_Y).addChildTo(iconGroup);
            icon.onpointstart = function () {
                self.judge(this); // 自分を渡す
            };
        }
				
        // キーボード判定
        this.on('keydown', function input (e) {
        /* var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
            if (keyData !== undefined) {
                var icon = iconGroup.getChildAt(keyData.id);
                self.judge(icon);
            }     */
        });
				window.addEventListener('keydown',(e)=>{
					 var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
            if (keyData) {
                const icon = iconGroup.getChildAt(keyData.id);
                self.judge(icon);
            }
				})

        // 譜面の展開
        this.markerGroup = DisplayElement()
            .setPosition(iconGroup.x, 0)
            .addChildTo(this);
        beatmap.notes.forEach(function (note) {
						//TargetMarker(note.targetTime, note.track) msカウント
            TargetMarker((60/beatmap.BPM * note.count)*1000,note.track,(note.track==4?"#eabc02cc":"#f5f5f5cc")) //BPMカウント
                .addChildTo(self.markerGroup);
						console.log((60/beatmap.BPM * note.count)*1000)
        })

        // score表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: "whitesmoke",
            fill: "white",
            strokeWidth: 2,
            fontSize: 104,
            fontFamily: "Montserrat"
        })
            .setPosition(gx.span(0.25), gy.span(1))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = Math.round(self.totalScore);
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
                this.text =self.combo;
            });

        // maxcombo表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#ddd",
            strokeWidth: 2,
            fontSize: 36,
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
            fontSize: 36,
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
            fontSize: 36,
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
            fontSize: 36,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(6))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "MISS:" + self.RateMiss;
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

        // ゲームスタートまでの猶予
        if (this.has('musicstart') && this.elapsedTime > MUSIC_START_DELAY) {
            this.flare('musicstart');
        }

        // マーカー描画
        var markers = this.markerGroup.children;
        markers.forEach(function (m) {
            if (!m.isAwake) return;
            var time = this.gameTime
            var rTime = m.targetTime - time; // 相対時間
            let NotesX;
            switch (m.trackId) {
                case 0:
                    NotesX = -360
                    break;
                case 1:
                    NotesX = -120
                    break;
                case 2:
                    NotesX = 120
                    break;
                case 3:
                    NotesX = 360
                    break;
								case 4:
                    NotesX = 0
                    break;
                default:
                    break;

            }
            if (rTime < MARKER_APPEARANCE_DELTA) {
                // マーカーの位置比率や縮小率（倍率）を計算する
                // ratioはアイコンに近いほど1.0に近づく
                var ratio = (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
                var distance = UNTI_ICON_Y*1.6 * ratio;

                m.setVisible(true)
                    .setPosition(
                        NotesX,
                        m.vector.y * distance
                    )
                    .setScale(1, 1);
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
        markers.some(function (m) {
            if (!m.isAwake || m.trackId !== unitIcon.id) return;

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
                return true;
            }
            if (delta <= this.RATING_TABLE["Bloom"].range) {
                unitIcon.fireEffect("#35c101");
                SoundManager.play('ring');
								let FL = "";
                if (FastLateDelta > 68) {
                    FL = "FAST";
                    this.fast++;
                }
                else if (FastLateDelta < -68) {
                    FL = "LATE";
                    this.late++;
                }
                this.reaction(m, "Bloom", FL);
                this.combo++;
                this.RateGreat++;
                if(this.maxCombo<this.combo) this.maxCombo = this.combo;
                return true;
            }
            if (delta <= this.RATING_TABLE["MISS"].range) {
                let FL = "";
                if (FastLateDelta > 0){ 
                    FL = "FAST";
                    this.fast++;
                }else {
                    FL = "LATE";
                    this.late++;
                }
                this.reaction(m, "Miss", FL);
                this.combo = 0;
                this.RateMiss++;
                return true;
            }
        }.bind(this));

    },

    reaction: function (marker, rating, timing) {
        // マーカー不可視化
        marker.isAwake = false;
        marker.visible = false;
				// Hi ochincchin nnnnnnnnnnnnnnnnnn通話しよwhere :joy:
				//BSC((((
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
						if(judgeType){
            RateLabel({ text: rating.toUpperCase(), fill: RateColor })
                .setPosition(this.gridX.center(), this.gridY.span(10))
                .addChildTo(this);
						}
            FLLabel({ text: timing, fill: FLColor })
                .setPosition(this.gridX.center(), this.gridY.span(9))
                .addChildTo(this);
						if(rating=="Stunning Bloom") rating = "Stunning_Bloom"
						if(rating=="Miss") rating = "MISS"
            this.totalScore += this.RATING_TABLE[rating].score;
						Additions(this.RATING_TABLE[rating].score,this.backgroundColor)
                .setPosition(this.gridX.span(0.25), this.gridY.span(2))
                .addChildTo(this);
        }
});