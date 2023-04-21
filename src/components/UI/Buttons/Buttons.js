import React from "react";
import buttonCss from "./Buttons.module.css"
import { Link } from "@mui/material"

export const ButtonOutlineGreen = (props) => {
    return (
        <Link href={props.link} className={buttonCss.OulineGreen}>
            {props.children}
        </Link>
    )
}

export const ButtonSubmitBlack = (props) => {
    return (
        <button type={props.type} className={buttonCss.ButtonSubmitBlack}>
            {props.children}
        </button>
    )
}

export const ButtonTransparent = (props) => {
    return (
        <button type={props.type} className={buttonCss.ButtonTransparent}>
            {props.children}
        </button>
    )
}

