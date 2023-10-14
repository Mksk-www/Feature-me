interface replayData {
    audio: ArrayBuffer
    chart: chart
    input: Array<inputData>
}

interface replayFile extends replayData {
    audio: string
    result: {
        score: number
        maxChain: number
        judges: {
            stunningBloom: number
            bloom: number,
            miss: number
        }
        timing: {
            fast: number
            late: number
        }
    }

}


interface inputData {
    time: number
    key: number
}