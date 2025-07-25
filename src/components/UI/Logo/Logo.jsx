import React from 'react';
import {LogoContainerStyled} from "../../../styled/Logo";
import logoImg from "../../../images/bubble-logo.png";
import {Link} from "react-router-dom";



const Logo = ({link, width, height}) => {
    return (
        <LogoContainerStyled width={width} height={height}>
            <Link href={link}>
                <img src={logoImg} alt='LOGO' />
            </Link>
        </LogoContainerStyled>
    )
}

export default Logo;
