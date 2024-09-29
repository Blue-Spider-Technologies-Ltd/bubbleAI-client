import React, { useState } from "react";
import buttonCss from "./Buttons.module.css"
import { Link } from "@mui/material"
import Groups3Icon from '@mui/icons-material/Groups3';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TranslateIcon from '@mui/icons-material/Translate';
import { 
    Dashboard, 
    Redeem, 
    NotificationsActive, 
    Group, 
    AdminPanelSettings,
    ReceiptLong 
} from '@mui/icons-material';

export const ButtonOutlineGreen = ({ link, target, children }) => {
    return (
        <Link href={link} target={target} className={buttonCss.OulineGreen}>
            {children}
        </Link>
    )
}

export const ButtonLogOut = ({ to, type, clicked, children }) => {
    return (
        <a href={to}>
            <button type={type} onClick={clicked} className={buttonCss.LogOut}>
                {children}
            </button>
        </a>
    )
}


export const ButtonSubmitBlack = ({disabled, type, height, width, children, onClick}) => {
    return (
        <button onClick={onClick} type={type} disabled={disabled} style={{ height: height && height, width: width && width }} className={buttonCss.ButtonSubmitBlack}>
            {children}
        </button>
    )
}

export const ButtonSubmitGreen = (props) => {
    const [buttonSize, setButtonSize] = useState(1);

    const handleClick = () => {
        setButtonSize(0.85); // Shrink the button
        setTimeout(() => {
          setButtonSize(1); // Restore the button to its original size
        }, 100);
        props.onClick()
    }
    return (
        <button disabled={props.disabled} type={props.type} onClick={handleClick}      
            style={{
                transform: `scale(${buttonSize})`,
                transition: 'transform 0.4s ease-in-out'
            }} 
            className={buttonCss.ButtonSubmitGreen}
        >
            {props.children}
        </button>
    )
}

export const ButtonOutlineGreenWithDiffStyle = (props) => {
    return (
        <button type={props.type} style={{border : `1px solid ${props.borderColor && props.borderColor}`, color: `${props.borderColor && props.borderColor}`}} onClick={props.onClick} className={buttonCss.ButtonOutlineGreenWithDiffStyle}>
            {props.children}
        </button>
    )
}

export const ButtonTransparent = ({type, children, onClick}) => {
    return (
        <button type={type} className={buttonCss.ButtonTransparent} onClick={onClick}>
            {children}
        </button>
    )
}

export const ButtonTransparentSquare = ({ type, onClick, color, width, height, bgColor, children, borderRadius }) => { 

    const buttonStyle = {
        color: color,
        width: width,
        height: height,
        backgroundColor: bgColor && bgColor,
        borderRadius: borderRadius
    };

    return (
        <button 
            type={type} 
            className={buttonCss.ButtonTransparentSquare} 
            onClick={onClick}
            style={buttonStyle}
        >
            {children}
        </button>
    );

}

export const AdminButtonCard = ({ type, onClick, color, width, height, iconText, total }) => { 

    const buttonStyle = {
        color: color,
        width: width,
        height: height
    };

    const cardIcon = () => {
        let cardIcon;
        switch (iconText) {
            case "Dashboard":
                cardIcon = <Dashboard />
                break;
            case "Coupons":
                cardIcon = <Redeem />
                break;
            case "Notifications":
                cardIcon = <NotificationsActive />
                break;
            case "Users":
                cardIcon = <Group />
                break;
            case "Admin":
                cardIcon = <AdminPanelSettings />
                break;
            case "Transactions":
                cardIcon = <ReceiptLong />
                break;
        
            default:
                break;
        }
        return cardIcon
    }

    return (
        <button 
            type={type} 
            className={buttonCss.AdminButtonCard} 
            onClick={onClick}
            style={buttonStyle}
        >
            <div>
                {cardIcon()}
            </div>
            <h4 style={{color: "#3E8F93"}}>{iconText}</h4>
            <h1>{total}</h1>
        </button>
    );

}

export const ButtonCard = props => {

    let iconImg
    if (props.iconImg) {
        iconImg = props.iconImg
    } else {
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
    }


    return (
        <div className={buttonCss.ButtonCard} name={props.name} onClick={props.onClick} style={{width: props.width && props.width}}>
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

export const ButtonThin = ({color, width, height, bgColor, borderRadius, children, onClick }) => {

    const buttonStyle = {
        color: color,
        width: width,
        height: height,
        backgroundColor: bgColor && bgColor,
        borderRadius: borderRadius,
        border: `1px solid ${color}`
    };
    
    return (
        <div style={buttonStyle} className={buttonCss.ButtonThin} onClick={onClick}>
            {children}
        </div>
    )
}

