import { atom } from "jotai";

const initialResult:gameResultState = {
    score: 0,
    judges: {
        stunningBloom: 0,
        bloom: 0,
        miss: 0
    },
    timing: {
        fast: 0,
        late: 0
    },
    maxChain: 0,
}

const gameResultState = atom<gameResultState>(initialResult)

export default gameResultState;