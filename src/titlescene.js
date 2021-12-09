
/**
 * タイトル
 */
phina.define('TitleScene', {
    superClass: 'phina.display.DisplayScene',

    init: async function (params) {
        this.superInit(params);
        this.backgroundColor = params.backgroundColor;
				this.AM = phina.asset.AssetManager;
				this.metadata = this.AM.get('json', 'beatmap').data;
        // タイトルラベル
        Label({
            text: this.metadata.title,
            fill: "white",
            stroke: "#2F3CEC",
            strokeWidth: 6,
            fontSize: 72,
            fontFamily: "Montserrat"
        })
            .setPosition(this.gridX.center(), this.gridY.span(6))
            .addChildTo(this)

        var touchLabel = Label({
            text: "START",
            fill: "white",
            stroke: "#2F3CEC",
            strokeWidth: 6,
            fontSize: 48,
            fontFamily: "Montserrat"
        })
            .setPosition(this.gridX.center(), this.gridY.span(12))
            .addChildTo(this);


        // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
        this.on('enter', function () {
            var event = "touchstart";
            var dom = this.app.domElement;
            dom.addEventListener(event, (function () {
                return function f() {
                    var context = phina.asset.Sound.getAudioContext();
                    var buf = context.createBuffer(1, 1, 22050);
                    var src = context.createBufferSource();
                    src.buffer = buf;
                    src.connect(context.destination);
                    src.start(0);

                    dom.removeEventListener(event, f, false);
                }
            }()), false);

            // シーン遷移
            this.on('pointend', function () {
                this.exit();
            });
        });
			await sleep(1000);
			this.exit();
			closeMusicModal();
    },

});