import React from 'react';
import authHeaderCss from './AuthHeader.module.css';
import { Link } from 'react-router-dom'
import logoImg from "../../../images/bubble-logo.png"
import  ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const AuthHeader = (props) => {
    return (
        <div className={authHeaderCss.ResumeInnerHeader}>
            <div className={!props.authMenuOpen ? authHeaderCss.showOptions : authHeaderCss.hideOptions} onClick={props.onClick}>
                {!props.authMenuOpen ? 
                    <ArrowCircleRightIcon fontSize='large' sx={{transform: "rotate(45deg)"}} />
                 :
                    <ArrowCircleLeftIcon fontSize='large' sx={{transform: "rotate(45deg)"}} />
                }
            </div>
            <h3>{props.headerText}</h3>
            <Link to='/'>
                <img src={logoImg} alt='Bubble Ai' className="Logo" />
            </Link>
        </div>
    )
}

export default AuthHeader;