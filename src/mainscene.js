
/**
 * メイン
 */
phina.define('MainScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        this.backgroundColor = "rgb(20,20,30)";

        var self = this;
        var gx = this.gridX;
        var gy = this.gridY;
        var AM = phina.asset.AssetManager;
        // var beatmap = DEBUG_BEATMAP;
        var beatmap = AM.get('json', 'beatmap').data;

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
        this.RATING_TABLE = {
            PERFECT: {
                score: 1000000 / beatmap.notes.length,
                range: 66, //ms
            },
            GREAT: {
                score: 500000 / beatmap.notes.length,
                range: 80, //ms
            },
            MISS: {
                score: 0,
                range: 122, //ms
            },
        };
        // 時間が来たら音楽流す
        this.one('musicstart', function () {
            //SoundManager.playMusic('music', null, false);
        });

        // ユニットアイコンの配置
        var iconGroup = DisplayElement()
            .setPosition(gx.center(), gy.span(5))
            .addChildTo(this);
        for (var i = 0; i < TRACK_NUM; i++) {
            var label = INDEX_TO_KEY_MAP[i].toUpperCase();
            var rad = (i * ICON_INTERVAL_DEGREE).toRadian();
            var icon;
            switch (i) {
                case 0:
                    icon = UnitIcon(i, label)
                        .setPosition(
                            -240,
                            385
                        )
                        .addChildTo(iconGroup);
                    break;
                case 1:
                    icon = UnitIcon(i, label)
                        .setPosition(
                            -80,
                            385
                        )
                        .addChildTo(iconGroup);
                    break;
                case 2:
                    icon = UnitIcon(i, label)
                        .setPosition(
                            80,
                            385
                        )
                        .addChildTo(iconGroup);
                    break;
                case 3:
                    icon = UnitIcon(i, label)
                        .setPosition(
                            240,
                            385
                        )
                        .addChildTo(iconGroup);
                    break;
            }

            // タップ・クリック判定
            icon.onpointstart = function () {
                self.judge(this); // 自分を渡す
            };
        }
        // キーボード判定
        this.on('keydown', function (e) {
            var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
            if (keyData !== undefined) {
                var icon = iconGroup.getChildAt(keyData.id);
                this.judge(icon);
            }
        });

        // 譜面の展開
        this.markerGroup = DisplayElement()
            .setPosition(iconGroup.x, 0)
            .addChildTo(this);
        beatmap.notes.forEach(function (note) {
            TargetMarker(note.targetTime, note.track)
                .addChildTo(self.markerGroup)
        })

        // score表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: "whitesmoke",
            fill: "white",
            strokeWidth: 2,
            fontSize: 50,
            fontFamily: "Montserrat"
        })
            .setPosition(gx.span(0.5), gy.span(1))
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
            fontSize: 50,
            fontFamily: "Montserrat",
        })
            .setPosition(gx.center(), gy.span(6))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "Combo:\n" + self.combo;
            });

        // maxcombo表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#ddd",
            strokeWidth: 2,
            fontSize: 24,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(2))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "MAX Combo:" + self.maxCombo;
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
            fill: "#c14e01",
            strokeWidth: 2,
            fontSize: 24,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(4))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "PERFECT:" + self.RatePerfect;
            });

        // GREAT表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#35c101",
            strokeWidth: 2,
            fontSize: 24,
            fontFamily: "Montserrat",
            width: 200
        })
            .setPosition(gx.span(0.25), gy.span(5))
            .addChildTo(this)
            .on('enterframe', function () {
                this.text = "GREAT:" + self.RateGreat;
            });

        // MISS表示
        this.scoreLabel = Label({
            text: 0,
            align: "left",
            stroke: false,
            fill: "#aaa",
            strokeWidth: 2,
            fontSize: 24,
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
                    NotesX = -240
                    break;
                case 1:
                    NotesX = -80
                    break;
                case 2:
                    NotesX = 80
                    break;
                case 3:
                    NotesX = 240
                    break;
                default:
                    break;

            }
            if (rTime < MARKER_APPEARANCE_DELTA) {
                // マーカーの位置比率や縮小率（倍率）を計算する
                // ratioはアイコンに近いほど1.0に近づく
                var ratio = (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
                var distance = 385*1.6 * ratio;

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

            if (delta <= this.RATING_TABLE["PERFECT"].range) {
                unitIcon.fireEffect();
                SoundManager.play('ring');
                let FL = "";
                if (FastLateDelta > 40) {
                    FL = "FAST";
                    this.fast++;
                }
                else if (FastLateDelta < -40) {
                    FL = "LATE";
                    this.late++;
                }
                this.reaction(m, "PERFECT", FL);
                this.combo++;
                this.RatePerfect++;
                if (this.maxCombo < this.combo) this.maxCombo = this.combo;
                return true;
            }
            if (delta <= this.RATING_TABLE["GREAT"].range) {
                let FL = "";
                if (FastLateDelta > 70) {
                    FL = "FAST";
                    this.fast++;
                }
                else if (FastLateDelta < -70) {
                    FL = "LATE";
                    this.late++;
                }
                
                unitIcon.fireEffect();
                SoundManager.play('ring');
                this.reaction(m, "GREAT", FL);
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
                this.reaction(m, "MISS", FL);
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
            let FLColor;
            let RateColor;
            if (timing === "FAST") FLColor = "blue";
            else FLColor = "red";
            switch (rating) {
                case "PERFECT":
                    RateColor = "#c14e01";
                    break;
                case "GREAT":
                    RateColor = "#35c101";
                default:
                    RateColor = "#aaa"
                    break;
            
            RateLabel({ text: rating.toUpperCase(), fill: RateColor })
                .setPosition(this.gridX.center(), this.gridY.span(10))
                .addChildTo(this);

            FLLabel({ text: timing, fill: FLColor })
                .setPosition(this.gridX.center(), this.gridY.span(9))
                .addChildTo(this);
            this.totalScore += this.RATING_TABLE[rating].score;
        }

    },

});