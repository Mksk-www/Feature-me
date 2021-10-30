
/*
 * ユニット表示アイコン
 */
phina.define('UnitIcon', {
    superClass: 'phina.display.RectangleShape',

    init: function (id, label) {
        this.superInit({
            radius: 0,
            strokeWidth: MARKER_STROKE_WIDTH,
            stroke: false,
            fill: "aqua",
            width:160,
            height:5.75,
        });
        this.setInteractive(true);
        this.id = id;
    },

    fireEffect: function () {
        EffectWave().addChildTo(this);
    },

});


/**
 * ターゲットマーカー（ノーツ）
 */
phina.define('TargetMarker', {
    superClass: 'phina.display.RectangleShape',

    init: function (targetTime, trackId, type) {
        this.superInit({
            
            strokeWidth: MARKER_STROKE_WIDTH,
            stroke: false,
            fill: "whitesmoke",
            height:5,
            width:155
        });

        this.visible = false;
        this.scaleX = this.scaleY = 0;
        this.isAwake = true;

        this.targetTime = targetTime;
        this.trackId = trackId;
        /*this.vector = phina.geom.Vector2(
             Math.cos((trackId * ICON_INTERVAL_DEGREE).toRadian()),
            Math.sin((trackId * ICON_INTERVAL_DEGREE).toRadian()) 
            
        );*/
 
           switch (trackId) {
            case 0:
                this.vector = phina.geom.Vector2(
                    -0.6,1
                );
                break;
            case 1:
                this.vector = phina.geom.Vector2(
                    -0.2,1
                );
                break;
            case 2:
                this.vector = phina.geom.Vector2(
                    0.2,1
                );
                break;
            case 3:
                this.vector = phina.geom.Vector2(
                    0.62, 1
                );
                break;
            default:
                this.vector = phina.geom.Vector2(
                    999,999
                );
        }
         

        // カウント表示
        // debug
        // Label({
        //   text: targetTime + "",
        //   fontSize: 60,
        // })
        // .addChildTo(this)
    },

});


/**
 * エフェクト：白フェードアウト円
 */
phina.define('EffectWave', {
    superClass: 'phina.display.CircleShape',

    init: function (options) {
        this.superInit({
            radius: MARKER_RADIUS,
            stroke: false,
            fill: "white",
        });

        this.tweener
            .to({ scaleX: 1.7, scaleY: 1.7, alpha: 0 }, 250)
            .call(function () {
                this.remove();
            }, this);
    },

    // fire: function() {
    // },

    // reset: function() {
    // }

});


/**
 * エフェクト："PERFECT!"など
 */
phina.define('RateLabel', {
    superClass: 'phina.display.Label',

    init: function (textParam) {
        this.superInit({
            text: textParam.text,
            fontSize: 48,
            strokeWidth: 1,
            fill: textParam.fill,
            stroke: "white",
            fontFamily:"Montserrat"
        });

        this.tweener
            .set({ scaleX: 0.2, scaleY: 0.2, alpha: 0 })
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130, "easeOutCirc")
            .wait(250)
            .to({ alpha: 0 }, 100)
            .call(function () {
                this.remove();
            }, this);
    },
});
phina.define('FLLabel', {
    superClass: 'phina.display.Label',

    init: function (textParam) {
        this.superInit({
            text: textParam.text,
            fontSize: 30,
            strokeWidth: 1,
            fill: textParam.fill,
            stroke: "white",
            fontFamily: "Montserrat"
        });

        this.tweener
            .set({ scaleX: 0.2, scaleY: 0.2, alpha: 0 })
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130, "easeOutCirc")
            .wait(250)
            .to({ alpha: 0 }, 100)
            .call(function () {
                this.remove();
            }, this);
    },
});