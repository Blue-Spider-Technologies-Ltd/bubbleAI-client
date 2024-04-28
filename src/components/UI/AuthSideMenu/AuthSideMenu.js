import React, {useState} from 'react';
import authMenuCss from './AuthMenu.module.css'
import AuthInputs from '../Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonTransparentSquare, ButtonOutlineGreen } from '../Buttons/Buttons';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import unavailableImg from "../../../images/unavailable.png";
import { setResume } from '../../../redux/states';
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";



const AuthSideMenu = ({opened, seacrhBarPlaceholder, hidden, arrayDetails, resumeSubDuration}) => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const navigate = useNavigate();
    // const [trueOpened, setTrueOpened] = useState(opened)


    const handleLogOut = () => {

    }    
    
    const handleReDownload = (index) => {
        // setTrueOpened(true)
        confirm({
            title: `Download "${arrayDetails[index].storageDetails.name}" Resume?`,
            description: `Click OK to continue to download preview`,
          })
          .then(() => {
            dispatch(setResume(arrayDetails[index]))
            navigate("/user/dashboard/resume?download");
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
                Upgrate to view all resumes you've ever created. Plus much more!</h5>

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
                {arrayDetails.map((item, index) => {
                    return (
                        <div key={index} className={authMenuCss.Item}>
                            <h5>
                                <span onClick={() => handleReDownload (index)}>{item?.storageDetails?.name ? item.storageDetails.name : "Unnamed"}</span>
                                <span>
                                    <span style={{color: 'white', margin: '4px 4px 0 10px'}}><EditNoteIcon fontSize='medium' /></span>
                                    <span style={{color: 'rgba(158, 9, 9, 0.733)', margin: '4px 4px 0 10px'}}><DeleteForeverIcon fontSize='small' /></span>
                                </span>
                            </h5>

                        </div>
                    )
                    
                })}
            </div>
        )
    }

    return (
        <div className={opened ? authMenuCss.ContainerOpen : authMenuCss.ContainerClose}>
            <AuthInputs placeholder={seacrhBarPlaceholder} hidden={hidden} inputType="search" inputGridSm={12} inputGrid={4} mb={2} required={true} />
            
            <div className={authMenuCss.InnerContainer}>
                {resumeSubDuration === "Per Month" ? <ItemsNamesArray /> : <NonMonthlySubDisplay />}
            </div>

            <Grid container sx={{height: "60px"}}>
                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color="black"
                        width="90%"
                        height="100%"
                        onClick={handleLogOut}
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
                        onClick={handleLogOut}
                    >
                        <ShoppingBasketIcon 
                            fontSize='small' 
                        /> 
                        ORDERS
                    </ButtonTransparentSquare>
                </Grid>

                <Grid item xs={3}>
                    <ButtonTransparentSquare 
                        type='button'
                        color="black" 
                        width="90%"
                        height="100%"
                        onClick={handleLogOut}
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
                        color="rgba(158, 9, 9, 0.733)" 
                        width="90%"
                        height="100%"
                        onClick={handleLogOut}
                    >
                        <LogoutIcon 
                            fontSize='small' 
                        /> 
                        LOGOUT
                    </ButtonTransparentSquare>
                </Grid>

            </Grid>

        </div>
    )
}

export default AuthSideMenu;