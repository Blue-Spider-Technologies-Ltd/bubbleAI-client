import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import authMenuCss from './AuthMenu.module.css'
import adminSideMenuCss from '../AdminSideMenu/AdminSideMenu.module.css'
import AuthInputs from '../Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonTransparentSquare, ButtonOutlineGreen } from '../Buttons/Buttons';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockResetIcon from '@mui/icons-material/LockReset';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { 
    Work, 
    PictureAsPdf, 
    EditNote,
    PersonSearch,
    ConnectWithoutContact,
} from '@mui/icons-material';
import welcomeImg from "../../../images/welcome.png";
import { setFetching, setError, setAllMessagesArray, setMessages, setSuccessMini } from '../../../redux/states';
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuthenticatedUser, errorAnimation, successMiniAnimation } from '../../../utils/client-functions';
import { Link } from 'react-router-dom';



const AuthSideMenu = ({opened, arrayDetails, firstName }) => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = localStorage?.getItem("token")
    const [activeIndex, setActiveIndex] = useState(null);


    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    useEffect(() => {
        setActiveIndex(arrayDetails.length - 1)
    }, [arrayDetails.length])

    const handleLogOut = () => {
        localStorage?.removeItem("token");
        window.location.reload()
    }    

    const handleLogIn = () => {
        navigate("/popin")
    }

    const handleNavigateProfile = () => {
        const prevPath = location.pathname
        localStorage?.setItem("prevPath", prevPath)
        navigate("/user/dashboard/profile")
    }

    const handleChangePass = () => {
        const prevPath = location.pathname
        localStorage?.setItem("prevPath", prevPath)
        navigate("/user/dashboard/reset-pass")
    }
    const handleDashSupport = () => {
        const prevPath = location.pathname
        localStorage?.setItem("prevPath", prevPath)
        navigate("/user/dashboard/dash-support")
    }

    
    const handleDeleteMsgSession = async (index, item) => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?chat");      
        }
        confirm({
            title: `Delete "${item[index]?.content?.slice(0, 30)}"?`,
            description: `Click OK to delete the selected session forever`,
        })
        .then(async () => {
            dispatch(setFetching(true))

            const body = {
                indexOfChat: index
            }

            try {
                const response = await axios.post("/delete-askme-session", body, {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
                dispatch(setAllMessagesArray(response?.data))
                dispatch(setMessages(response?.data[response?.data?.length - 1]))
                dispatch(setFetching(false))
                successSetter("Session Deleted")
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error.response.data.error)
            }
        })
        .catch(() => {
            return    
        });
    }

    const continueDiffChat = (index) => {
        // setTrueOpened(true)
        confirm({
            title: `Switch Session?`,
            description: `Click OK to switch to selected`,
        })
        .then(() => {
            dispatch(setMessages(arrayDetails[index]));
            setActiveIndex(index)
            successSetter("Session Switched")
        })
        .catch(() => {
            return    
        });
    }
    


    const MenuDisplay = () => {
        return (                    
            <ul className={adminSideMenuCss.SideMenuItems}>
                 <li>
                    <Link to="/user/dashboard/resume">
                        <EditNote />
                        <span>Create Resume</span>
                    </Link>
                </li>
                <li>
                    <Link to="/user/dashboard/resume-hub">
                        <PictureAsPdf />
                        <span>Resumes & Cover Ltrs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/user/dashboard/job-hub">
                        <Work />
                        <span>Ai Job Connect</span> <span className={adminSideMenuCss.newFeat}>NEW</span>
                    </Link>
                </li>
                <li>
                    <Link to="/user/dashboard/recruiter">
                        <PersonSearch />
                        <span>Ai Recruiter</span>
                    </Link>
                </li>
                <li>
                    <Link to="/user/dashboard/referral-hub" >
                        <ConnectWithoutContact />
                        <span>Referral Hub</span>
                    </Link>
                </li>
            </ul>
        )
    }

    const ItemsNamesArray = () => { 
        return ( 
           <div className={authMenuCss.Items}>
                {arrayDetails?.length < 1 ? (
                    location.pathname === "/chat" ? <div className={authMenuCss.NonMonthlySubDisplay}>
                        <p>Login below to display chat history here.</p>
                    </div> : <MenuDisplay />
                ) : location.pathname === "/chat" ? (
                    arrayDetails[0]?.length < 1 ? (
                        <div className={authMenuCss.NonMonthlySubDisplay}>
                            <p>Start a chat to view chat history here.</p>
                        </div>
                    ) : (
                        arrayDetails?.map((item, index) => (
                            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", height: "50px"}} key={index} className={activeIndex !== index ? authMenuCss.Item : authMenuCss.ItemActive}>
                                <div onClick={() => continueDiffChat(index)} style={{ width: "90%" }}>
                                    <span style={{ position: "relative", top: ".6rem", fontWeight: "600" }}>
                                        {item[0]?.content?.slice(0, 24) + "..."}
                                    </span>
                                    <span style={{ color: 'white', margin: '4px 4px 0 10px', float: "right" }}>
                                        <EditNoteIcon fontSize='medium' />
                                    </span>
                                </div>
                                <div onClick={() => handleDeleteMsgSession(index, item)} style={{ color: 'rgba(158, 9, 9, 0.733)', paddingTop: '5px' }}>
                                    <DeleteForeverIcon fontSize='small' />
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <MenuDisplay />
                )}
            </div>
            
            
        ); 
    };

    return (
        <div className={opened ? authMenuCss.ContainerOpen : authMenuCss.ContainerClose}>

            <div className={authMenuCss.TopCont}>

                <div className={authMenuCss.LeftTopCont}>
                    <h4>Welcome</h4> 
                    <h1>{firstName}</h1>
                </div>

                <div className={authMenuCss.RightTopCont}>
                    <img src={welcomeImg} width='80px' alt="Welcome" />
                </div>
            </div>
            
            <div className={authMenuCss.InnerContainer}>
                <ItemsNamesArray />
                {/* {(() => {
                    if (
                        (isResumeSubbed && resumeSubDuration === "Per Month") ||
                        (isResumeSubbed && resumeSubDuration === "Per Week") ||
                        location.pathname === "/chat"
                    ) {
                        return <ItemsNamesArray />;
                    } else {
                        return <NonMonthlySubDisplay />;
                    }
                })()} */}
            </div>

            <Grid container sx={{height: "60px"}}>
                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color="black"
                        width="90%"
                        height="100%"
                        onClick={handleNavigateProfile}
                    >
                        <ManageAccountsIcon 
                            fontSize='small' 
                        /> 
                        PROFILE
                    </ButtonTransparentSquare>
                </Grid>
                
                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color="black" 
                        width="90%"
                        height="100%"
                        onClick={handleChangePass}
                    >
                        <LockResetIcon 
                            fontSize='small' 
                        /> 
                        CHANGE
                    </ButtonTransparentSquare>
                </Grid>

                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color="black" 
                        width="90%"
                        height="100%"
                        onClick={handleDashSupport}
                    >
                        <HelpIcon 
                            fontSize='small' 
                        /> 
                        SUPPORT
                    </ButtonTransparentSquare>
                </Grid>
                
                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color={isAuth ? "rgba(158, 9, 9, 0.733)" : "#7CC9CC"}
                        width="90%"
                        height="100%"
                        onClick={isAuth ? handleLogOut : handleLogIn}
                    >
                        <LogoutIcon 
                            fontSize='small' 
                        /> 
                        {isAuth ? "LOGOUT" : "LOGIN"}
                    </ButtonTransparentSquare>
                </Grid>

            </Grid>

        </div>
    )
}

export default AuthSideMenu;