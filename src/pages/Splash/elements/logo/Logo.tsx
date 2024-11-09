import style from './Logo.module.scss';

export default () => {
    return (
        <div class={style.title}>
            <div class={style.inner}>
                <span class={style.the}>
                    The
                </span>
                <span class={style.featureme}>
                    Feature Me
                </span>
                <span class={style.project}>
                    Project presents
                </span>
            </div>
        </div>
    )
}