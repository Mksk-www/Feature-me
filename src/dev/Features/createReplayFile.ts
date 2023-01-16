import arrayBufferToBase64 from "Utils/ArrayBuffertoBase64/ArrayBuffertoBase64";

function createReplay(replay: replayData) {
    const replayObject = {
        audio: `data:audio/mp3;base64,${arrayBufferToBase64(replay.audio)}`,
        chart: replay.chart,
        input: replay.input
    }

    const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([BOM, JSON.stringify(replayObject)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = `${replay.chart.title}-${new Date().toLocaleString().replace(/\//g, "-").replace(" ", "-").replace(/:/g, "-")}-feature-me-replay.fmrp`;
    download.click();

}

export default createReplay;