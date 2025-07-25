import React from 'react';
import {SliderContainerStyled, SliderTrackStyled, SlideItemStyled } from '../../../styled/Slider'

const AutoSlider = ({ children, speed = 20 }) => {
    return (
        <SliderContainerStyled>
            <SliderTrackStyled style={{ animationDuration: `${speed}s` }}>
                {[...children, ...children].map((child, i) => (
                    <SlideItemStyled key={i}>{child}</SlideItemStyled>
                ))}
            </SliderTrackStyled>
        </SliderContainerStyled>
    );
};

export default AutoSlider;