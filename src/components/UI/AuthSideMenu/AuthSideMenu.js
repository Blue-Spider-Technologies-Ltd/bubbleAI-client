import React from 'react';
import authMenuCss from './AuthMenu.module.css'
import AuthInputs from '../Input/AuthInputs';
import testResume from './test-items';
import { ButtonTransparentRed } from '../Buttons/Buttons';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';



const AuthSideMenu = (props) => {



    const handleLogOut = () => {

    }    
    
    const handleEdit = () => {

    }

    return (
        <div className={props.opened ? authMenuCss.ContainerOpen : authMenuCss.ContainerClose}>
            <AuthInputs placeholder={props.seacrhBarPlaceholder} hidden={props.hidden} inputType="search" inputGridSm={12} inputGrid={4} mb={2} required={true} />
            
            <div className={authMenuCss.InnerContainer}>

                <div className={authMenuCss.Items}>
                    {testResume.map((item, index) => {
                        return (
                            <div key={index} className={authMenuCss.Item}>
                                <h5>
                                    <span onClick={handleEdit}>{item.resumeStorageDetails.resumeName}</span>
                                    <span onClick={handleEdit} style={{color: '#56A8AC', margin: '4px 4px 0 10px'}}><EditNoteIcon fontSize='medium' /></span>
                                    <span style={{color: 'rgba(158, 9, 9, 0.733)', margin: '4px 4px 0 10px'}}><DeleteForeverIcon fontSize='small' /></span>
                                </h5>

                            </div>
                        )
                        
                    })}
                </div>
            </div>

            <ButtonTransparentRed type='button' onClick={handleLogOut}><LogoutIcon fontSize='medium' /> LOGOUT</ButtonTransparentRed>
        </div>
    )
}

export default AuthSideMenu;