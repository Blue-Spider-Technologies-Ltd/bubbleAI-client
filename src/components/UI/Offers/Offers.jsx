import React from 'react';
import offersData from './data'
import {OffersContainerStyled, SectionTitleStyled} from "../../../styled/HomeContent";
import {useTheme} from "../Theme/ThemeContext";
import RenderOfferData from "./RenderData";


const Offers = ({isAuth}) => {
    const {themeName} = useTheme();
    return (
        <>
            <SectionTitleStyled theme={themeName}>What we offer</SectionTitleStyled>
            <OffersContainerStyled>
                <RenderOfferData isAuth={isAuth} data={offersData} />
            </OffersContainerStyled>
        </>

    );
}

export default Offers;