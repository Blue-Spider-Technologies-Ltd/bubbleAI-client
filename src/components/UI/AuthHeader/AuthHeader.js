import React from 'react';
import authHeaderCss from './AuthHeader.module.css';
import { Link } from 'react-router-dom'
import logoImg from "../../../images/bubble-logo.png"
import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";

const AuthHeader = (props) => {
    return (
        <div className={authHeaderCss.ResumeInnerHeader}>
            <div className={!props.authMenuOpen ? authHeaderCss.showOptions : authHeaderCss.hideOptions} onClick={props.onClick}>
                {!props.noAuthMenu ?
                    !props.authMenuOpen ? 
                        <BiMenuAltLeft size='2.5em' />
                    :
                        <BiMenuAltRight size='2.5em' />
                : ""
                }
            </div>
            <h3 style={{marginLeft: "60px"}}>{props.headerText}</h3>
            <Link to='/'>
                <img src={logoImg} alt='Bubble Ai' className="authLogo" />
            </Link>
        </div>
    )
}

export default AuthHeader;