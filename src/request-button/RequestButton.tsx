import React, {useState} from "react";
import Arrow from "./Arrow";
import './RequestButton.css';
export default function RequestButton({ disabled }:{disabled:boolean}): JSX.Element{
    const defaultColor = "#8c8c8c";
    const activeColor = "#d966ff";
    const activeClass = "form-request__button--able";
    const clazz = "form-request__button " + (disabled ? '' : activeClass)
    const [colorArrow, setColorArrow] = useState(defaultColor);
   
    function changeToDefaultColor() { 
        setColorArrow(defaultColor)
    }
    function changeToActiveColor() {
        setColorArrow(activeColor)
    }
    return (
        <button
            onClick={ changeToDefaultColor }
            onMouseEnter={ changeToActiveColor }
            onMouseLeave={ changeToDefaultColor }
            disabled={ disabled }
            className={ clazz }
        >
            <Arrow colorArrow={ colorArrow }/>
        </button>
    )
}