import React from 'react';
import {SectionTitleStyled} from "../../../styled/HomeContent";
import {useTheme} from "../Theme/ThemeContext"
import RenderTestimonialData from "./RenderData";
import {testimonialData} from "./data";

const Testimonials = () => {
    const {themeName} = useTheme()
    return (
        <>
            <SectionTitleStyled theme={themeName}>Testimonials</SectionTitleStyled>

            <RenderTestimonialData data={testimonialData} />


        </>
    )
};

export default Testimonials;
