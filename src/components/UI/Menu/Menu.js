import React, { useState, useEffect }  from 'react';
import { Box } from "@mui/material";
import { Link } from "@mui/material";
import { Sling as Hamburger } from 'hamburger-react'
import "./Menu.css"
import logoImg from "../../../images/bubble-logo.png"
import { ButtonSubmitGreen, ButtonLogOut } from '../Buttons/Buttons';
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from '../../../redux/states';
import { isIOSStandalonePWA } from '../../../utils/client-functions';

const screenWidth = window.innerWidth


/* FOR LARGER SCREENS KTT SIGNAL */
const MenuBarLarge = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem("token");
    const dispatch = useDispatch()

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
                    <Link href='/how-i-work' className="ListItem">
                        <div>How I Work</div>
                    </Link>
                    <Link href='/pricing' className="ListItem">
                        <div>Pricing</div>
                    </Link>
                    <div style={{marginTop: '11px', width: '150px', marginLeft: '20px'}}>
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
                    <div style={{paddingTop: "10px"}}>
                        <Link href='/'>
                            <img src={logoImg} alt='LOGO' className="Logo" />
                        </Link>
                    </div>                
                </div>
                <div className='HamburgerContainer'>
                    <Hamburger 
                        color="#6FCBD1" 
                        rounded 
                        size={25} 
                        distance="md"
                        toggled={menuOpen} 
                        toggle={setMenuOpen}
                    />
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
