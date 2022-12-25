interface gameVariables {
    characterPosition: "left" | "right",
    startedTime: number
    notes: Array<note>
    scorePerNotes: number
    score: number
    judges: {
        stunningBloom: number
        bloom: number,
        miss: number
    }
    timing: {
        fast: number,
        late: number
    }
    chain: number
    maxChain: number
}

type judgeText = "stunningBloom" | "bloom" | "miss"