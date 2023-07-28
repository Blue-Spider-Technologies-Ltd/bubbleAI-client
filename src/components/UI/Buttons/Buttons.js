import React from "react";
import buttonCss from "./Buttons.module.css"
import { Link } from "@mui/material"
import Groups3Icon from '@mui/icons-material/Groups3';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TranslateIcon from '@mui/icons-material/Translate';

export const ButtonOutlineGreen = (props) => {
    return (
        <Link href={props.link} className={buttonCss.OulineGreen}>
            {props.children}
        </Link>
    )
}

export const ButtonLogOut = (props) => {
    return (
        <button type={props.type} onClick={props.clicked} className={buttonCss.LogOut}>
            {props.children}
        </button>
    )
}

export const ButtonSubmitBlack = (props) => {
    return (
        <button type={props.type} className={buttonCss.ButtonSubmitBlack}>
            {props.children}
        </button>
    )
}

export const ButtonSubmitGreen = (props) => {
    return (
        <button type={props.type} onClick={props.onClick} className={buttonCss.ButtonSubmitGreen}>
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

export const ButtonTransparentRed = (props) => {
    return (
        <button type={props.type} className={buttonCss.ButtonTransparentRed} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export const ButtonCard = props => {

    let iconImg
    switch (props.icon) {
        case 'meeting':
            iconImg = <Groups3Icon sx={{fontSize: '4rem'}} />
            break;
        case 'transcribe':
            iconImg = <GraphicEqIcon sx={{fontSize: '4rem'}} />
            break;
        case 'translate':
            iconImg = <TranslateIcon sx={{fontSize: '4rem'}} />
            break;        
        default:
            iconImg = <Groups3Icon sx={{fontSize: '4rem'}} />
            break;
    }



    return (
        <div className={buttonCss.ButtonCard} onClick={props.onClick} sx={{height: props.height ? props.height : "auto"}}>
            <div>
                {iconImg}
            </div>
            <h3>{props.title}</h3>
            <hr />
            <div style={{margin: '20px 0'}}>
                {props.description}
            </div>
        </div>
    )
}

