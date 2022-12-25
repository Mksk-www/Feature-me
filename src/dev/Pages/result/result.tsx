import { useAtomValue } from "jotai";
import React from "react";
import gameResultState from "State/gameResultState";

import style from "./result.scss";

const ResultPage:React.FC = () => {
    const result = useAtomValue(gameResultState);

    return(
        <div>
            {JSON.stringify(result)}
        </div>
    )
}

export default ResultPage;