import React from 'react';
import {MainBannerStyled} from "../../styled/HomeContent";
import { HiPaperAirplane } from "react-icons/hi2";
import {Link} from "react-router-dom";
import IconButtonStyled from "../../styled/IconButton";
import Button from "../UI/Buttons/Button";



const MainBanner = () => {
    return (
        <MainBannerStyled>
            <h1>Optimize your Professionality.</h1>
            <p>Ask me anything</p>
            <div className="search">
                <input type="search" name="search" id="search" placeholder="Type here...." />
                <IconButtonStyled disabled={true} bg='#000' fontSize='0.9rem' pad='0.3rem'>
                    <HiPaperAirplane />
                </IconButtonStyled>
            </div>

            <div className="desktopbtns">
                <Button borderRadius='1.5rem' pad='0.7rem' color='#fff' title='Generate resume' />
                <Button borderRadius='1.5rem' pad='0.7rem' color='#fff' title='Optimize resume' />
                <Button borderRadius='1.5rem' pad='0.7rem' color='#fff' title='Automate Job Application' />
            </div>

            <Link className="privacy">Privacy Policy</Link>
        </MainBannerStyled>

    );
}

export default MainBanner;