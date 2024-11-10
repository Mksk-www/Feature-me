//inspired by https://zenn.dev/ixkaito/articles/css-image-glitch

import style from "./glitchImage.module.scss";
import {JSX} from "solid-js";
import clsx from "clsx";

interface glitchImageProps extends JSX.HTMLAttributes<HTMLDivElement> {
    src: string
}

export default (props:glitchImageProps) => {

    return (
        <div {...props} style={{ "background-image": `url(${props.src})` }} class={clsx(style.glitch,props.class)}>
            <div class={clsx(style.r,style.channel)}></div>
            <div class={clsx(style.g,style.channel)}></div>
            <div class={clsx(style.b,style.channel)}></div>
        </div>
    )
}
