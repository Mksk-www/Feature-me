import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import React from "react";
import { VscClose } from "react-icons/vsc";

import style from "./errorBoundary.scss";

const ErrorModal: React.FC<{ message: string }> = (props) => {
    const [show, setShow] = React.useReducer(() => false, true);


    if (!show) return null
    return (
        <div className={style.modal}>
            <div className={style.inner}>
                <div className={style.titleBar}>
                    <p>Game Crashed!</p>
                    <div className={style.closebtn}>
                        <VscClose onClick={setShow} />
                    </div>
                </div>
                <h2>Game Crashed!</h2>
                <p>The game process has stopped because of below error(s)<br />
                    <code>{props.message}</code>
                </p>
                <div className={style.interaction}>
                    <ChamferedButton onClick={() => setShow()}>OK</ChamferedButton>
                    <ChamferedButton onClick={() => location.reload()} >Relaunch</ChamferedButton>
                    <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}>Report this issue</ChamferedButton>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal