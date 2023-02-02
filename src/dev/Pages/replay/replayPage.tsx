import React from "react";
import { BsWrench, BsCameraVideo } from "react-icons/bs";

import { useAtomValue, useSetAtom } from "jotai";
import headerState from "State/headerState";
import { useLocation, useNavigate } from "react-router-dom";
import footerState from "State/footerState";
import gameDataState, { initialChart } from "State/gameState";
import selectedMusicState from "State/selectedMusicState";
import { BiPointer } from "react-icons/bi";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";

import style from "./replay.scss";
import msToStringTime from "Utils/msToStringTime/msToStringTime";

const ReplayPage: React.FC = () => {
    const navigate = useNavigate();
    const setTitle = useSetAtom(headerState);
    const setSelectedMusic = useSetAtom(selectedMusicState);
    const setGameData = useSetAtom(gameDataState);
    const setFooter = useSetAtom(footerState);
    const [fileName, setFileName] = React.useState("");
    const [fileData, setFileData] = React.useState<Object | replayFile>({});


    //delete game cache
    function initializeCache() {
        setGameData({
            ready: false,
            audio: new ArrayBuffer(0),
            chart: initialChart
        })
    }

    function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setFileName(file.name);
        file.text().then(txt => setFileData(JSON.parse(txt)));
    }

    React.useEffect(() => {
        //update title
        initializeCache();
        setTitle("Replay Viewer");
        //set footer
        setFooter([{ icon: <BiPointer />, value: "Select" }, { icon: <h3>Esc</h3>, value: "Back to Home" }])
        //add shortcut
        setSelectedMusic("");
        window.addEventListener("keydown", (e) => {
            if (e.code == "Escape") navigate("/");
        })

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.code == "Escape") navigate("/");
            })
        }
    }, [])

    return (
        <div className={style.replayPage}>
            <h1>Replay Viewer</h1>
            <div className={style.uploadFile}>
                <ChamferedButton>
                    <label htmlFor="replayFileUpload">
                        Upload Replay File
                    </label>
                </ChamferedButton>
                <span>{fileName || "no file chosen"}</span>
                <input type="file" id="replayFileUpload" accept=".fmarp,.fmrp" hidden onChange={uploadFile} />
            </div>
            <hr />
            <ChamferedButton>View Replay</ChamferedButton>
            <ChamferedButton>Encode Replay</ChamferedButton>
            <hr />
            <h2>Replay Summary</h2>
            {
                "chart" in fileData ?
                    <>
                        <h3>Music Name : {fileData.chart.title}</h3>
                        <h3>Composer : {fileData.chart.artist}</h3>
                        <h3>Artist : {fileData.chart.nd}</h3>
                        <h3>Time : {msToStringTime(fileData.chart.duration)}</h3>
                        <h3 className={`${style.diff} ${style[fileData.chart.diff]}`}>Difficulty : {fileData.chart.diff} {fileData.chart.lev}</h3>
                        <hr />
                        <h3>Score : {fileData.result.score}</h3>
                        <h3>Max Chain : {fileData.result.maxChain}</h3>
                        {/* <h3>Audio : <audio src={fileData.audio} controls /></h3> */}

                    </>
                    : <h4>Upload replay to show summary</h4>

            }
            <hr />
            <input type="text" placeholder="Player Name to show" />
        </div>
    )
}

export default ReplayPage;
