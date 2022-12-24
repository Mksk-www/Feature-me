import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface linkWrapperPropsType {
    children?: React.ReactNode
    to: string
    className?: string
    state?:any
    onClick?:Function
}

const LinkWrapper: React.FC<linkWrapperPropsType> = (props): JSX.Element => {
    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLDivElement>): void {
        if(props.onClick) props.onClick()
        navigate(props.to,{state:props.state});
    }

    return (
        <div onClick={handleClick} className={props.className}>
        {props.children}
        </div>
    )
}

export default LinkWrapper;