import React from 'react';
import {Link} from 'react-router-dom';
import ButtonsStyled from "../../../styled/Buttons";


const Button = (props) => {
    const {title, theme, pricing, pad, color, borderRadius, clickHandle,link } = props;
    return (
        <ButtonsStyled pricing={pricing} theme={theme} pad={pad} color={color} borderRadius={borderRadius}>
            <Link to={link} onClick={clickHandle} className='btn'>
                {title}
            </Link>
        </ButtonsStyled>
    );
}


export default Button;