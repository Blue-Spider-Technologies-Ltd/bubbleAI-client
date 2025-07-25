import React, {useState} from 'react';
import {BoxStyled} from "../../../styled/FAQ";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import {useTheme} from "../Theme/ThemeContext";


const Item = ({ content, index }) => {
    const [open, setOpen] = useState(false);
    const {themeName} = useTheme();

    return (
        <BoxStyled theme={themeName} key={index}>
            <button onClick={()=> setOpen(!open)} className="question">
                <p>{content.q}</p>
                <span>
                    {open ? <FaAngleDown /> : <FaAngleUp />}
                </span>
            </button>
            {open && <p className="answer">{content.a}</p>}

        </BoxStyled>

    );
}

export default Item;