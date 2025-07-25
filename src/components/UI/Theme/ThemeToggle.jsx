import React from 'react';
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import ThemeButtonStyled from "../../../styled/ThemeButton";
import { useTheme } from './ThemeContext';



const ThemeToggle = () => {
    const { themeName, toggleTheme } = useTheme();

    return (
        <ThemeButtonStyled onClick={toggleTheme} aria-label="Toggle theme">
            {themeName === 'light' ? <IoMdMoon /> : <IoMdSunny />}
        </ThemeButtonStyled>
    );
};

export default ThemeToggle;