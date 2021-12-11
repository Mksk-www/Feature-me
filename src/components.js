
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
            width:240,
            height:12.5,
        });
        this.setInteractive(true);
        this.id = id;
    },

    fireEffect: function (color) {
        EffectWave(color,this.id).addChildTo(this);
    },

});

/**
 * ターゲットマーカー（ノーツ）
 */
phina.define('TargetMarker', {
    superClass: 'phina.display.RectangleShape',

    init: function (targetTime, trackId, color="#f5f5f5cc") {
        this.superInit({
            
            strokeWidth: 3,
            stroke: false,
            fill: color,
            height:(color=="#eabc02cc"?30:10),
            width:(color=="#eabc02cc"?240*4:235)
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
        this.vector = phina.geom.Vector2(0,1);
         

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
    superClass: 'phina.display.RectangleShape',

    init: function (options,id) {
        this.superInit({
            radius: 0,
            stroke: false,
            fill: options+"80",
						width:id==4?960:235,
						height:300
        });

        this.tweener
						.set({scaleX:1,scaleY:1,alpha:0.75})
            .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 200)
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
            fontSize: 36,
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

/**
 * FAST/LATEラベル
 */
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

/**
 * スコア加算量
 */

phina.define('Additions',{
	superClass:"phina.display.Label",

	init:function(score,backgroundColor){
		this.superInit({
			text: `+${Math.round(score)}`,
    	align: "left",
    	stroke: false,
    	fill: "#aaa",
			backgdjfkfdjfjkdfjkdfjkdfkdjround:backgroundColor,
    	strokeWidth: 2,
    	fontSize: 24,
    	fontFamily: "Montserrat",
		});
		
		this.tweener
    .set({ scaleX: 0.2, scaleY: 0.2, alpha: 0 })
    .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130, "easeOutCirc")
    .wait(250)
    .to({ alpha: 0 }, 100)
    .call(function () {
    	this.remove();
    }, this);
	}

})

