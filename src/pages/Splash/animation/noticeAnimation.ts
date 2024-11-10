import style from "../elements/notice/Notice.module.scss";
import task from "Global/utils/task/task";
import {createMotion} from "solid-motionone";
import easing from "Global/utils/easing/easing.ts";
import {Owner, runWithOwner} from "solid-js";

export default async (containerRef:HTMLDivElement,headerRef:HTMLDivElement,spacerRef:HTMLDivElement,owner: Owner) => {
    const boundingBox = headerRef.getBoundingClientRect();
    const initPos = ((containerRef.clientHeight || window.innerHeight)/2) - boundingBox.height / 2;
    const rects = headerRef.getElementsByClassName(style.rect);
    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        if (rect instanceof HTMLDivElement) {
            const delay = 50 * (i+1) + (i < 3 ? 200:300);
            rect.style.animation = `${style.slideTile} 0.3s cubic-bezier(0.33, 1, 0.68, 1) ${delay}ms forwards`;
        }
    }
    
    headerRef.style.position = "absolute";
    headerRef.style.height = `${boundingBox.height}px`;
    
    spacerRef.style.height = `${boundingBox.height}px`;
    await task.sleep(1500);
    
    runWithOwner(owner,()=>{
        createMotion(
            headerRef, {
                animate:{
                    top:[`${initPos}px`, `${boundingBox.top}px`],

                },
                transition:{
                    duration:0.75,
                    easing:easing.easeInOutQuart
                }
            }
        )
    });
    
    await task.sleep(5000);
    containerRef.classList.add(style.exit);
    await task.sleep(1500);
    
    return;
    
}