import LinkWrapper from "Components/linkWrapper/linkWrapper";
import getScoreRankFromScore from "Features/getScoreRank";
import { useAtomValue } from "jotai";
import React from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";
import gameResultState from "State/gameResultState";

import style from "./result.scss";

const ResultPage: React.FC = () => {
    const result = useAtomValue(gameResultState);

    return (
        <div className={style.resultPage}>
            <LinkWrapper to={"/"} className={style.head}>
                <div className={style.icon}>
                    <BsChevronDoubleLeft />
                </div>
                <h2>Back to Menu</h2>
            </LinkWrapper>
            <div className={style.score}>
                <div>
                    <p className={style.label} >//SCORE</p>
                    <h1>{Math.round(result.score)}</h1>
                </div>
                <div>
                    <p className={style.label} >//RANK</p>
                    <h1>{getScoreRankFromScore(result.score)}</h1>
                </div>
            </div>
            <div className={style.details}>
                <div className={style.inner}>
                    <div className={style.content}>
                        <span className={style.stunningBloom}>Stunning Bloom : </span>
                        <span className={style.stunningBloom}>{result.judges.stunningBloom}</span>
                    </div>
                    <div className={style.content}>
                        <span className={style.bloom}>Bloom : </span>
                        <span className={style.bloom}>{result.judges.bloom}</span>
                    </div>
                    <div className={style.content}>
                        <span className={style.miss}>Miss : </span>
                        <span className={style.miss}>{result.judges.miss}</span>
                    </div>
                </div>
                <div className={style.inner}>
                    <div className={style.content}>
                        <span>Max Chain : </span>
                        <span>{result.maxChain}</span>
                    </div>
                    <div className={style.content}>
                        <span className={style.fast}>Fast : </span>
                        <span className={style.fast}>{result.timing.fast}</span>
                    </div>
                    <div className={style.content}>
                        <span className={style.late}>Late : </span>
                        <span className={style.late}>{result.timing.late}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultPage;