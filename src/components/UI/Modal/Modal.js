import React from 'react';
import modalCss from './Modal.module.css'
import Blob from '../Blob/Blob';
import bubbleBgAuthImg from '../../../images/bubblebg-auth.png'


export const Modal = (props) => {

    return (
        <div className={modalCss.ModalContainer}>

            <div className={modalCss.ModalBody}>

                <div className={modalCss.ModalBlobBg}>
                <Blob bgImage={bubbleBgAuthImg} />
                </div>
                <div className={modalCss.ModalInner}>
                    {props.children}
                </div>
                
            </div>

        </div>
    )
}

export const Fetching = (props) => {
    return (
        <div className={modalCss.ModalContainer}>

            <div className={modalCss.ModalBodyTwo}>
                <div className={modalCss.ModalBlobBg}>
                    <Blob />
                </div>
            </div>

        </div>
    )
}