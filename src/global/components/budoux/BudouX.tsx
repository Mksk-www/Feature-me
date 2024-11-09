import {loadDefaultJapaneseParser} from "budoux";
import {JSX, JSXElement, onMount, Show} from "solid-js";
import {useI18nContext} from "@/i18n/i18n-solid.ts";

interface budouXProps extends JSX.HTMLAttributes<JSX.HTMLDivElement> {
    lang:string
    children:JSXElement
}

export default (props:budouXProps) =>{
    
    const {locale} = useI18nContext();
    let ref!: HTMLDivElement
    const parser = loadDefaultJapaneseParser()
    
    
    onMount(()=>{
        parser.applyToElement(ref);
    })
    
    return(
        <Show when={props.lang == locale()} fallback={props.children}>
            <div ref={ref} {...props}>
                {props.children}
            </div>
        </Show>
    )
    
}