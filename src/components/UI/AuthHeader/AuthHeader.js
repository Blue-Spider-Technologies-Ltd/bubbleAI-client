import React from 'react';
import authHeaderCss from './AuthHeader.module.css';
import { Link } from 'react-router-dom'
import logoImg from "../../../images/bubble-logo.png"

const AuthHeader = (props) => {
    return (
        <div className={authHeaderCss.ResumeInnerHeader}>
            <div className={!props.authMenuOpen ? authHeaderCss.showOptions : authHeaderCss.hideOptions} onClick={props.onClick}>
                {!props.authMenuOpen ? "OPTIONS" : "<CLOSE"}
            </div>
            <h3>{props.headerText}</h3>
            <Link to='/'>
                <img src={logoImg} alt='Bubble Ai' className="Logo" />
            </Link>
        </div>
    )
}

export default AuthHeader;