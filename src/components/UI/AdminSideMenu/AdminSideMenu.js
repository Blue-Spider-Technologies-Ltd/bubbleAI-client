import React, { useEffect } from 'react';
import sideMenuCss from "./AdminSideMenu.module.css"
import logoImg from "../../../images/bubble-logo.png"
import { useNavigate } from 'react-router-dom';
import { ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import { Link } from 'react-router-dom';
import { 
    Dashboard, 
    Redeem, 
    NotificationsActive, 
    Group, 
    AdminPanelSettings,
    ReceiptLong, 
    NavigateBefore
} from '@mui/icons-material';
const screenWidth = window.innerWidth

const AdminSideMenu = () => {
    const navigate = useNavigate();
    useEffect (() => {
        if (screenWidth <= 900) {
            const adminMenuCont = document.getElementById('admin-menu-container');
            adminMenuCont.classList.add(sideMenuCss["side-menu-minimized"])
        }
    }, [])


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
                <li className={sideMenuCss.Active}>
                    <Link to="/origin/dashboard">
                        <Dashboard />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/origin/notifications">
                        <NotificationsActive />
                        <span>Notifications</span>
                    </Link>
                </li>
                <li>
                    <Link to="/origin/users">
                        <Group />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="/origin/admins" >
                        <AdminPanelSettings />
                        <span>Admin Settings</span>
                    </Link>
                </li>
                <li>
                    <Link to="/origin/transactions">
                        <ReceiptLong />
                        <span>Transactions</span>
                    </Link>
                </li>
                <li>
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
