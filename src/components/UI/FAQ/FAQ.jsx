import React from 'react';
import {SectionTitleStyled} from "../../../styled/HomeContent";
import Item from './Item';
import {FAQWrapper} from "../../../styled/FAQ";
import {faqs} from "../../../utils/faqs"
import {useTheme} from "../Theme/ThemeContext";



const FAQ = () => {
    const {themeName} = useTheme();
    return (
        <>
            <SectionTitleStyled theme={themeName}>FAQs</SectionTitleStyled>

            <FAQWrapper theme={themeName}>
                {faqs && faqs.map((item, index) => (
                    <>
                        <Item className="item" key={index} content={item} />
                    </>

                ))}
            </FAQWrapper>
        </>
    )


}

export default FAQ;



