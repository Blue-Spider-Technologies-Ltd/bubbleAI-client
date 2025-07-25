import React from 'react';
import {OffersDataStyled} from "../../../styled/HomeContent";
import {useTheme} from "../Theme/ThemeContext";
import Button from "../Buttons/Button";

const RenderOfferData = ({data}) => {
    const { themeName } = useTheme();
    return (
        <>
        {
            data && data.map((item, index)=>(
                <OffersDataStyled key={index} theme={themeName}>
                    <h2>{item.title}</h2>
                    <span>
                        <img src={item.image} alt="offer image"/>
                    </span>
                    <p>{item.description}</p>
                    <Button theme={themeName} title={item.action} />

                </OffersDataStyled>
            ))

        }
         </>

    );
}

export default RenderOfferData;