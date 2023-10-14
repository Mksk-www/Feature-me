import arrayBufferToBase64 from "Utils/ArrayBuffertoBase64/ArrayBuffertoBase64";

function createReplay(result: gameResultState) {
    if (!result.replay) return;


    const { replay } = result;

    const replayObject: replayFile = {
        audio: `data:audio/mp3;base64,${arrayBufferToBase64(replay.audio)}`,
        chart: replay.chart,
        input: replay.input,
        result: {
            score: result.score,
            maxChain: result.maxChain,
            judges: {
                stunningBloom: result.judges.stunningBloom,
                bloom: result.judges.bloom,
                miss: result.judges.miss
            },
            timing: {
                fast: result.timing.fast,
                late: result.timing.late,
            }
        }
    }

    const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([BOM, JSON.stringify(replayObject)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = `${replay.chart.title}-${new Date().toLocaleString().replace(/\//g, "-").replace(" ", "-").replace(/:/g, "-")}-feature-me-replay.fmarp`;
    download.click();

}

export default createReplay;