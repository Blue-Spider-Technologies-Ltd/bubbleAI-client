import React from 'react';
import {ModalStyled} from "../../../styled/Modal";
import { MdOutlineCancel } from "react-icons/md";




const Modal = (props) => {
    const {open, setOpen, plan} = props;
    return (
        <ModalStyled>
            <MdOutlineCancel onClick={() => setOpen(!open)} />
            <h2>{plan.title}</h2>
            <div className="plans">
                    {plan && plan.duration.map((item, index)=> (
                        <div key={index} className="planContainer">
                            <div className="header">
                                <h3>{item.timeframe}</h3>
                                <p>{item.price}</p>

                            </div>
                        </div>

                    ))}
            </div>

        </ModalStyled>


    )
}

export default Modal;