interface gameResultState {
    score: number
    judges: {
        stunningBloom: number
        bloom: number,
        miss: number
    }
    timing: {
        fast: number
        late: number
    }
    maxChain: number
    replay?: replayData
}