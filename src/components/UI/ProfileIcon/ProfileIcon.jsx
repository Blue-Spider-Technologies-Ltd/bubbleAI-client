import React from 'react';
import {Link} from "@mui/material";
import profileImg from "../../../images/genericprofileimg.png";
import ProfileImageStyled from "../../../styled/ProfileImage"



const ProfileIcon = (props) => {
    const {data} = props;
    //we use props to dynamically fetch profile image and display it
    return (

        <ProfileImageStyled>
            {
                data ? data.map(img => (
                        <img src={img} alt='LOGO'/>
                    ))
                    :
                    <img src={profileImg} alt='profile image'/>
            }
        </ProfileImageStyled>


    );


}

export default ProfileIcon;