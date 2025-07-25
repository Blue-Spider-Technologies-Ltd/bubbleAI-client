import React from 'react';
import TestimonialStyled from "../../../styled/Testimonial";
import Ratings from "./Ratings";
import AutoSlider from "../Slider/AutoSlider";

const RenderTestimonialData = ({data})=>{
    return (
        <AutoSlider>
            {data && data.map((item,index)=>(
                <TestimonialStyled key={index}>
                    <div className="content">
                        <span>
                            <h3>{item.name}</h3>
                            <Ratings amount={item.rating}/>
                        </span>
                        <p>{item.message}</p>
                        <p className="weeks">{item.time} weeks ago</p>
                    </div>
                    <div className="imageBox">
                        <img src={item.image} alt=""/>
                    </div>
                </TestimonialStyled>

            ))}
        </AutoSlider>

    );

}

export default RenderTestimonialData;