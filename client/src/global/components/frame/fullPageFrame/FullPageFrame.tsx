import clsx from "clsx";
import { JSX } from "solid-js";

import style from "./FullPageFrame.module.scss";



export default (props: JSX.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} class={clsx(props.class,style.frame)}>
            {props.children}
        </div>
    )
}