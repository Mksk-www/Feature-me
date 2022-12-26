import LinkWrapper from "Components/linkWrapper/linkWrapper";
import getScoreRankFromScore from "Features/getScoreRank";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { motion } from "framer-motion";

import gameResultState from "State/gameResultState";

import style from "./result.scss";
import headerState from "State/headerState";

const ResultPage: React.FC = () => {
    const result = useAtomValue(gameResultState);
    const setTitle = useSetAtom(headerState);

    const initial = { opacity: 0};
    const fadeIn = { opacity: 1, transition: { duration: 2, ease: "easeOut" } };
    const scoreInitial = { opacity: 0, x: -200 };
    const scoreFadeIn = { opacity: [0, 0, 1], x: [-200, -200, 0], transition: { duration: 2, ease: "easeOut" } };

    React.useEffect(() => {
        setTitle(t => `Result - ${t}`);
    }, [])


    return (
        <motion.div className={style.resultPage} animate={fadeIn} initial={initial}>
            <LinkWrapper to={"/"} className={style.head}>
                <div className={style.icon}>
                    <BsChevronDoubleLeft />
                </div>
                <h2>Back to Menu</h2>
            </LinkWrapper>
            <motion.div className={style.score} animate={scoreFadeIn} initial={scoreInitial}>
                <div >
                    <p className={style.label} >//SCORE</p>
                    <h1>{Math.round(result.score)}</h1>
                </div>
                <div>
                    <p className={style.label} >//RANK</p>
                    <h1>{getScoreRankFromScore(result.score)}</h1>
                </div>
            </motion.div>
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
        </motion.div>
    )
}

export default ResultPage;