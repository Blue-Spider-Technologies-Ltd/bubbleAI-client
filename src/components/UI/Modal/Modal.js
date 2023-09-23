import React from 'react';
import modalCss from './Modal.module.css'
import Blob from '../Blob/Blob';
import bubbleBgAuthImg from '../../../images/bubblebg-auth.png'
import logoImg from "../../../images/bubble-logo.png"
import { Rings, Watch } from 'react-loader-spinner'
const screenWidth = window.innerWidth

export const Modal = (props) => {

    return (
        <div className={modalCss.ModalContainer}>

            <div className={modalCss.ModalBody}>

                <div className={modalCss.ModalBlobBg}>
                    <Blob bgImage={bubbleBgAuthImg} />
                </div>
                <div className={modalCss.ModalInner}>
                    <h4>{props.header4}</h4>
                    <div style={{marginTop: '15px'}}>
                        {screenWidth >= 900 ?
                            <Rings
                                height="200"
                                width="200"
                                color="white"
                                radius="6"
                                visible={true}
                                ariaLabel="rings-loading"
                            />
                        :
                            <Watch
                                height="150"
                                width="150"
                                radius={48}
                                color="white"
                                ariaLabel="revolving-dot-loading"
                                visible={true}
                            />
                        }
                    </div>                       

                    <h3>{props.header3}</h3>
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
                    <img src={logoImg} alt='Bubble Ai' className={modalCss.Blinker} />
                </div>
            </div>

        </div>
    )
}