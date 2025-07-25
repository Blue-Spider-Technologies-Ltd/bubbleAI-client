import React, {useState} from 'react';
import {CardStyled} from "../../../styled/Subscriptions";
import {useTheme} from "../Theme/ThemeContext"
import Button from "../Buttons/Button";
import Modal from "./Modal";
import {ModalContainerStyled} from "../../../styled/Modal";


const BasicPlan = ({data}) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const {themeName} = useTheme();


    return (
        <>
        {
            data && data.map((item, index) => (
            <CardStyled key={index} theme={themeName}>
                <h2>{item.title}</h2>

                {item.duration.map((plan, index) => (
                    <div key={index}  className="items">
                        <div className="info">
                            <p>{plan.timeframe}</p>
                            <p>{plan.price}</p>
                        </div>
                        <p>Get a <span className='discount'>{plan.discount}</span> of all our products and services</p>
                    </div>

                ))}

                <Button clickHandle={() => setSelectedPlan(item)} theme={themeName} title={'See full plan'} color='#5fbec5' />
            </CardStyled>

            ))

        }
            { selectedPlan &&
                (
                    <ModalContainerStyled>
                        <Modal plan={selectedPlan} open={!!selectedPlan} setOpen={() => setSelectedPlan(null)} />
                    </ModalContainerStyled>
                )
            }
        </>

    )
}

export default BasicPlan;