import React, { useState, useEffect }  from 'react';
import {Box} from "@mui/material";
import { Link } from "@mui/material";
import { Sling as Hamburger } from 'hamburger-react'
import "./Menu.css"
import logoImg from "../../../images/bubble-logo.png"
import { ButtonSubmitGreen, ButtonLogOut } from '../Buttons/Buttons';
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from '../../../redux/states';
import { isIOSStandalonePWA } from '../../../utils/client-functions';
import NavButtonStyled from "../../../styled/NavButtons";
import ThemeToggle from "../Theme/ThemeToggle";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { FaBell } from "react-icons/fa";
import IconButtonStyled from "../../../styled/IconButton";
import Logo from "../Logo/Logo";
import styled from "styled-components";
import {useTheme} from "../Theme/ThemeContext"


const DesktopHeadLinks = styled.div`
    color: ${({theme})=> theme === 'dark' ? '#fff' : '#000'};
`;


const screenWidth = window.innerWidth


/* FOR LARGER SCREENS KTT SIGNAL */
const MenuBarLarge = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem("token");
    const dispatch = useDispatch()
    const {themeName} = useTheme();

    const handleLogout = async () => {
        if (isAuth) {
            navigate('/popin')
            localStorage?.removeItem('token')
            dispatch(setUser({}))
        }
    }

    return (

        <nav className="BigMenu">
            <div>
                <Link href='/'>
                    <img src={logoImg} alt='Bubble Ai' className="Logo" />
                </Link>
            </div>

            <div>
                <div className='MenuItems'>
                    <ThemeToggle />
                    <Link href='/how-i-work' className="ListItem">
                        <DesktopHeadLinks theme={themeName}>How I Work</DesktopHeadLinks>
                    </Link>
                    <Link href='/pricing' className="ListItem">
                        <DesktopHeadLinks theme={themeName}>Pricing</DesktopHeadLinks>
                    </Link>
                    <div style={{width: '150px'}}>
                        {location.pathname === "/popin" ? <ButtonSubmitGreen><a href="/join-bubble" className="regLoginLink">Register</a></ButtonSubmitGreen> 
                        : isAuth ? <div style={{marginTop: '12px'}}><ButtonLogOut clicked={handleLogout}>Logout</ButtonLogOut></div> : <ButtonSubmitGreen><a href="/popin" className="regLoginLink">Login</a></ButtonSubmitGreen>}
                    </div>
                </div>
            </div>
        
        </nav>

    )
}

/* FOR SMALLER SCREENS KTT SIGNAL */
const MenuBarSmall = () => {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem("token");
    const dispatch = useDispatch()
    

    useEffect (() => {
        const  overlay = document.getElementById('overlay');
        const nav1 = document.getElementById('nav-1');
        const nav2 = document.getElementById('nav-2');
        const nav3 = document.getElementById('nav-3');
        const nav4 = document.getElementById('nav-4');
        const nav5 = document.getElementById('nav-5');
        const smallMenuContainer = document.getElementById('small-menu-top');

        function toggleNav() {
            // Toggle: Menu Active
            if(menuOpen) {
                // Hide small menu top
                smallMenuContainer.classList.add('small-menu-out');
                // Animate In - Overlay
                overlay.classList.remove('overlay-slide-left');
                overlay.classList.add('overlay-slide-right');
                // Animate In - Nav Items
                nav1.classList.remove('slide-out-1');
                nav1.classList.add('slide-in-1');
                nav2.classList.remove('slide-out-2');
                nav2.classList.add('slide-in-2')
                nav3.classList.remove('slide-out-3');
                nav3.classList.add('slide-in-3');
                nav4.classList.remove('slide-out-4');
                nav4.classList.add('slide-in-4')
                nav5.classList.remove('slide-out-5');
                nav5.classList.add('slide-in-5'); 
            } else {
                 // Show small menu top
                smallMenuContainer.classList.remove('small-menu-out');
                // Animate Out - Overlay
                overlay.classList.remove('overlay-slide-right');
                overlay.classList.add('overlay-slide-left');
                // Animate Out - Nav Items
                nav1.classList.remove('slide-in-1');
                nav1.classList.add('slide-out-1');
                nav2.classList.remove('slide-in-2');
                nav2.classList.add('slide-out-2');
                nav3.classList.remove('slide-in-3');
                nav3.classList.add('slide-out-3');
                nav4.classList.remove('slide-in-4');
                nav4.classList.add('slide-out-4');
                nav5.classList.remove('slide-in-5');
                nav5.classList.add('slide-out-5'); 
            }
        }
        toggleNav()
    }, [menuOpen])

    
    const handleLogout = async () => {
        if (isAuth) {
            navigate('/popin')
            localStorage?.removeItem('token')
            dispatch(setUser({}))
        }
    }


    return (
        <Box>
            <div style={{marginTop: isIOSStandalonePWA() ? "50px" : "auto"}}>
                <div id="small-menu-top" className='SmallMenuContainer'>

                    <Logo/>


                    <div className="NavButtons">

                        <NavButtonStyled>
                            <IconButtonStyled color='#6FCBD1'>
                                <FaBell />
                            </IconButtonStyled>
                            <ProfileIcon />
                            <ThemeToggle />
                        </NavButtonStyled>


                        <div className='HamburgerContainer'>
                            <Hamburger
                                color="#6FCBD1"
                                rounded
                                size={30}
                                distance="md"
                                toggled={menuOpen}
                                toggle={setMenuOpen}
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* MENU BLOCK */}

            <div className="overlay" id="overlay">

                <nav>
                    <ul>
                        {location.pathname === "/popin" ? <li id="nav-1"><a href="/join-bubble">Register</a></li>
                            : isAuth ? <li id="nav-1" className='logout' onClick={handleLogout}>Logout</li> : <li id="nav-1"><a href="/popin">Login</a></li>}
                        <li id="nav-2"><a href="/pricing">Pricing</a></li>
                        <li id="nav-3"><a href="/how-i-work">How I Work</a></li>
                        <li id="nav-4"><a href="/support">Support</a></li>
                        <li id="nav-5"><a href="/privacy">Terms</a></li>
                    </ul>
                </nav>
            </div>

        </Box>

    )
}



const MenuBar = () => {
    if (screenWidth > 900) {
        return <MenuBarLarge />
    }
    return <MenuBarSmall />
}

export default MenuBar;
