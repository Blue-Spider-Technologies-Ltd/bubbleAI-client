import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authMenuCss from './AuthMenu.module.css'
import AuthInputs from '../Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonTransparentSquare, ButtonOutlineGreen } from '../Buttons/Buttons';
import DownloadIcon from '@mui/icons-material/Download';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockResetIcon from '@mui/icons-material/LockReset';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import unavailableImg from "../../../images/unavailable.png";
import { setResume, setFetching, setUserResumesAll, setError, setAllMessagesArray, setMessages, setSuccessMini } from '../../../redux/states';
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuthenticatedUser, errorAnimation, successMiniAnimation } from '../../../utils/client-functions';



const AuthSideMenu = ({opened, seacrhBarPlaceholder, hidden, arrayDetails, resumeSubDuration, isResumeSubbed, value, onChange}) => {
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


    const handleDeleteResume = async (index, imgUrl) => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?resume");      
        }
        confirm({
            title: `Delete "${arrayDetails[index].storageDetails.name}" Resume?`,
            description: `Click OK to delete the selected resume forever`,
        })
        .then(async () => {
            dispatch(setFetching(true))
            let body;
            if(imgUrl) {
                const urlParts = new URL(imgUrl);
                const pathname = urlParts.pathname;
                const pathParts = pathname.split('/');
                const fileName = pathParts[pathParts.length - 1];
                body = {
                    nameOfResume: arrayDetails[index].storageDetails.name,
                    fileName: fileName
                }
            } else {
                body = {
                    nameOfResume: arrayDetails[index].storageDetails.name,
                }
            }

            try {
                const response = await axios.post("/user/delete-resume", body, {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
                dispatch(setUserResumesAll(response.data.resume))
                dispatch(setFetching(false))
                successSetter("Resume Deleted")
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error.response.data.error)
            }
        })
        .catch(() => {
            return    
        });
    }

    
        
    const handleReDownload = (index) => {
        // setTrueOpened(true)
        confirm({
            title: `Download "${arrayDetails[index].storageDetails.name}" Resume?`,
            description: `Click OK to continue to download preview`,
        })
        .then(() => {
            //set only one resume to download
            dispatch(setResume(arrayDetails[index]))
            navigate("/user/dashboard/resume?download");
        })
        .catch(() => {
            return    
        });
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


    const NonMonthlySubDisplay = () => {
        return (
            <div className={authMenuCss.NonMonthlySubDisplay}>

                <div className={authMenuCss.UnavailableImg}>
                    <img src={unavailableImg} alt='unavailable' width={"100%"} height={"100%"} style={{borderRadius: "50%"}} />
                </div>

                <h5>This feature is unavailable for your subscription tier. 
                Upgrade to view all items in this category you've ever created. Plus much more!</h5>

                <div style={{marginTop: "50px"}}>
                    <ButtonOutlineGreen link="/pricing" target="_blank">
                        View Offers
                    </ButtonOutlineGreen>
                </div>

                
            </div>
        )
    }

    const ItemsNamesArray = () => { 
        return ( 
           <div className={authMenuCss.Items}>
                {arrayDetails?.length < 1 ? (
                    <div className={authMenuCss.NonMonthlySubDisplay}>
                        {location.pathname !== "/chat" ? 
                            <p>You have no resumes to display. Please create one.</p>
                        :
                            <p>Login below to display chat history here.</p>}
                    </div>
                ) : location.pathname === "/chat" ? (
                    arrayDetails[0]?.length < 1 ? (
                        <div className={authMenuCss.NonMonthlySubDisplay}>
                            <p>Start a chat to view chat history here.</p>
                        </div>
                    ) : (
                        arrayDetails?.map((item, index) => (
                            <div key={index} className={activeIndex !== index ? authMenuCss.Item : authMenuCss.ItemActive}>
                                <div onClick={() => continueDiffChat(index)} style={{ width: "90%" }}>
                                    <span style={{ position: "relative", top: ".6rem", fontWeight: "600" }}>
                                        {item[0]?.content?.slice(0, 24) + "..."}
                                    </span>
                                    <span style={{ color: 'white', margin: '4px 4px 0 10px', float: "right" }}>
                                        <EditNoteIcon fontSize='medium' />
                                    </span>
                                </div>
                                <div>
                                    <span onClick={() => handleDeleteMsgSession(index, item)} style={{ color: 'rgba(158, 9, 9, 0.733)', margin: '4px 4px 0 10px' }}>
                                        <DeleteForeverIcon fontSize='small' />
                                    </span>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    arrayDetails.map((item, index) => (
                        <div key={index} className={authMenuCss.Item}>
                            <div onClick={() => handleReDownload(index)} style={{ width: "90%" }}>
                                <span style={{ position: "relative", top: ".6rem", fontWeight: "700" }}>
                                    {item?.storageDetails?.name ? item.storageDetails.name : "Unnamed"}
                                </span>
                                <span style={{ color: 'white', margin: '4px 4px 0 10px', float: "right" }}>
                                    <DownloadIcon fontSize='medium' />
                                </span>
                            </div>
                            <div>
                                <span onClick={() => handleDeleteResume(index, item?.storageDetails?.imgUrl)} style={{ color: 'rgba(158, 9, 9, 0.733)', margin: '4px 4px 0 10px' }}>
                                    <DeleteForeverIcon fontSize='small' />
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            
        ); 
    };

    return (
        <div className={opened ? authMenuCss.ContainerOpen : authMenuCss.ContainerClose}>

            <AuthInputs 
                placeholder={seacrhBarPlaceholder} 
                hidden={hidden} 
                inputType="search" 
                inputGridSm={12} 
                inputGrid={4} 
                mb={2} 
                required={true} 
                value={value}
                onChange={onChange}
            />
            
            <div className={authMenuCss.InnerContainer}>
                {(() => {
                    if (
                        (isResumeSubbed && resumeSubDuration === "Per Month") ||
                        (isResumeSubbed && resumeSubDuration === "Per Week") ||
                        location.pathname === "/chat"
                    ) {
                        return <ItemsNamesArray />;
                    } else {
                        return <NonMonthlySubDisplay />;
                    }
                })()}
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