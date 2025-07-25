import React, {useState} from 'react';
import {CardStyled} from "../../../styled/Subscriptions";
import {useTheme} from "../Theme/ThemeContext"
import Button from "../Buttons/Button";
import { FaCheckCircle } from "react-icons/fa";
import {ModalContainerStyled} from "../../../styled/Modal";
import Modal from "./Modal";





const PremiumPlan = ({data}) => {
    const {themeName} = useTheme();
    const [selectedPlan, setSelectedPlan] = useState(null);


    return (
        <>
            {
                data && data.map((item, index) => (
                    <CardStyled key={index} theme={themeName}>
                        <h2>{item.title}</h2>

                        {item.duration.map((plan, index) => (
                            <div key={index} className="info">
                                <p>{plan.timeframe}</p>
                                <p>{plan.price}</p>
                            </div>

                        ))}
                        <div className="hr"></div>
                        {item.offers.map((plan, index) => (
                            <div key={index} className="premiumItems">
                                <div className="premiumInfo">
                                    <span>
                                        <FaCheckCircle color="#5fbec5"/>
                                        <p>{plan.package}</p>
                                    </span>
                                    <p className="discount">{plan.discount}</p>
                                </div>
                            </div>

                        ))}
                        <p className="premiumMessage">{item.message}</p>


                        <Button clickHandle={() => setSelectedPlan(item)} pricing={'true'} theme={themeName} title={'See full plan'} />

                    </CardStyled>

                ))
            }

            {selectedPlan &&
                (
                    <ModalContainerStyled>
                        <Modal plan={selectedPlan} open={!!selectedPlan} setOpen={() => setSelectedPlan(null)} />
                    </ModalContainerStyled>
                )
            }
        </>
    )
}



export default PremiumPlan;