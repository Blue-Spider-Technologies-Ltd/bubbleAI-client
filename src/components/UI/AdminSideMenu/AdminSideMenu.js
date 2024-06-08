import React, { useEffect } from 'react';
import sideMenuCss from "./AdminSideMenu.module.css"
import logoImg from "../../../images/bubble-logo.png"
import { useNavigate, useLocation } from 'react-router-dom';
import { ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import { Link } from 'react-router-dom';
import { 
    Dashboard, 
    Redeem, 
    NotificationsActive, 
    Group, 
    AdminPanelSettings,
    ReceiptLong
} from '@mui/icons-material';
const screenWidth = window.innerWidth

const AdminSideMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let specificPath = location.pathname.slice(8)
    
    useEffect (() => {
        if (screenWidth <= 900) {
            const adminMenuCont = document.getElementById('admin-menu-container');
            adminMenuCont.classList.add(sideMenuCss["side-menu-minimized"])
        }
    }, [location])


    const handleMouseEnter = () => {
        if (screenWidth <= 900) {
            const adminMenuCont = document.getElementById('admin-menu-container');
            adminMenuCont.classList.remove(sideMenuCss["side-menu-minimized"]);
        }
    }

    const handleMouseLeave = () => {
        if (screenWidth <= 900) {
            const adminMenuCont = document.getElementById('admin-menu-container');
            adminMenuCont.classList.add(sideMenuCss["side-menu-minimized"]);
        }
    }

    const handleAdminLogOut = () => {
        sessionStorage?.removeItem('afd8TvhsdjwiuuvsgjhsAfgsUhjs')
        navigate("/")
    }


    return (
        <div id='admin-menu-container' className={sideMenuCss.AdminSideMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            <div className={sideMenuCss.Logo}>
                <Link to='/'>
                    <img src={logoImg} alt='Bubble Ai' style={{width: "90%"}} />
                </Link>
            </div>
            
            <hr></hr>
            <ul className={sideMenuCss.SideMenuItems}>
                <li className={specificPath === "dashboard" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/dashboard">
                        <Dashboard />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className={specificPath === "notifications" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/notifications">
                        <NotificationsActive />
                        <span>Notifications</span>
                    </Link>
                </li>
                <li className={specificPath === "users" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/users">
                        <Group />
                        <span>Users</span>
                    </Link>
                </li>
                <li className={specificPath === "admins" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/admins" >
                        <AdminPanelSettings />
                        <span>Admin Settings</span>
                    </Link>
                </li>
                <li className={specificPath === "transactions" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/transactions">
                        <ReceiptLong />
                        <span>Transactions</span>
                    </Link>
                </li>
                <li className={specificPath === "coupons" ? sideMenuCss.Active : ""}>
                    <Link to="/origin/coupons">
                        <Redeem />
                        <span>Coupons</span>
                    </Link>
                </li>
            </ul>

            <div style={{ marginTop: "40px"}}>
                <ButtonOutlineGreenWithDiffStyle onClick={handleAdminLogOut}>
                    Log out
                </ButtonOutlineGreenWithDiffStyle>
            </div>
        </div>
    );
};

export default AdminSideMenu;
