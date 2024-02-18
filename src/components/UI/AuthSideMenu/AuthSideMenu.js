import React from 'react';
import authMenuCss from './AuthMenu.module.css'
import AuthInputs from '../Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonTransparentSquare } from '../Buttons/Buttons';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';



const AuthSideMenu = ({opened, seacrhBarPlaceholder, hidden, arrayDetails}) => {



    const handleLogOut = () => {

    }    
    
    const handleEdit = () => {

    }

    return (
        <div className={opened ? authMenuCss.ContainerOpen : authMenuCss.ContainerClose}>
            <AuthInputs placeholder={seacrhBarPlaceholder} hidden={hidden} inputType="search" inputGridSm={12} inputGrid={4} mb={2} required={true} />
            
            <div className={authMenuCss.InnerContainer}>

                <div className={authMenuCss.Items}>
                    {arrayDetails.map((item, index) => {
                        return (
                            <div key={index} className={authMenuCss.Item}>
                                <h5>
                                    <span onClick={handleEdit}>{item?.storageDetails?.name ? item.storageDetails.name : "Unnamed"}</span>
                                    <span>
                                        <span onClick={handleEdit} style={{color: 'white', margin: '4px 4px 0 10px'}}><EditNoteIcon fontSize='medium' /></span>
                                        <span style={{color: 'rgba(158, 9, 9, 0.733)', margin: '4px 4px 0 10px'}}><DeleteForeverIcon fontSize='small' /></span>
                                    </span>
                                </h5>

                            </div>
                        )
                        
                    })}
                </div>
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