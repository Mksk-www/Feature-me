import { Motion, VariantDefinition } from "solid-motionone";
import style from "./Logo.module.scss";

export default () => {

    return (
        <div class={style.title}>
            <div class={style.inner}>
                <span class={style.the}>
                    The
                </span>
                <span class={style.title}>
                    Feature Me
                </span>
                <span class={style.project}>
                    Project Team Present
                </span>
            </div>
        </div>
    )
}