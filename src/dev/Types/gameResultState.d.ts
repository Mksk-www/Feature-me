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
    chain:number
    maxChain:number
}