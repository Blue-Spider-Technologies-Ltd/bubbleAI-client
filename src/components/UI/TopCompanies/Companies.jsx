import React from 'react';
import {companiesLogos} from "./data";
import AutoSlider from "../Slider/AutoSlider";
import {SliderContentStyled} from "../../../styled/Slider";
import {SectionTitleStyled} from "../../../styled/HomeContent";
import {useTheme} from "../Theme/ThemeContext";



const Companies = () => {
    const {themeName} = useTheme();

    return (
        <div style={{margin: '3rem auto'}}>
            <SectionTitleStyled theme={themeName}> Users Secure Employment in top Companies</SectionTitleStyled>
            <AutoSlider>
                {companiesLogos && companiesLogos.map((item, index)=> (
                    <SliderContentStyled key={index} >
                        <img key={index} src={item.logo} alt={`slide-${index}`}/>
                    </SliderContentStyled>

                ))}
            </AutoSlider>


        </div>
    );
}


export default Companies;

