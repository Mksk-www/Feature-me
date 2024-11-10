import style from './Notice.module.scss';
import FullPageFrame from "Global/components/frame/fullPageFrame/FullPageFrame.tsx";
import {For, getOwner, onMount} from "solid-js";
import {useI18nContext} from "@/i18n/i18n-solid.ts";
import BudouX from "Global/components/budoux/BudouX.tsx";
import noticeAnimation from "Pages/Splash/animation/noticeAnimation.ts";

interface NoticeProps {
    next:()=>void;
}

export default (props:NoticeProps) =>{
    
    const {LL} = useI18nContext();
    let containerRef!:HTMLDivElement
    let headerRef!:HTMLDivElement;
    let spacerRef!:HTMLDivElement;
    
    onMount(()=>{
        const owner = getOwner()
        noticeAnimation(containerRef,headerRef,spacerRef,owner!)
            .then(props.next);
    })
    
    return (
        <FullPageFrame class={style.notice} ref={containerRef}>
            <div class={style.header} ref={headerRef}>
                <For each={new Array(3)}>
                    {_ => <div class={style.rect}></div>}
                </For>
                <h1>{LL().pages.splash.notice.title()}</h1>
                <For each={new Array(3)}>
                    {_ => <div class={style.rect}></div>}
                </For>
            </div>
            <div class={style.spacer} ref={spacerRef}></div>
            <p>
                <BudouX lang={"ja"}>
                    {LL().pages.splash.notice.text()}
                </BudouX>
            </p>
        </FullPageFrame>
    )
}