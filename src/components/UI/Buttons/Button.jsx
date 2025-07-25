import React from 'react';
import {Link} from 'react-router-dom';
import ButtonsStyled from "../../../styled/Buttons";


const Button = (props) => {
    const {title, theme, pricing, pad, color, borderRadius, clickHandle } = props;
    return (
        <ButtonsStyled pricing={pricing} theme={theme} pad={pad} color={color} borderRadius={borderRadius}>
            <Link onClick={clickHandle} className='btn'>
                {title}
            </Link>
        </ButtonsStyled>
    );
}


export default Button;