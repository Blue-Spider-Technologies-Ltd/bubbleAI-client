import React from 'react';
import modalCss from './Modal.module.css'
import Blob from '../Blob/Blob';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import bubbleBgAuthImg from '../../../images/bubblebg-auth.png'
import logoImg from "../../../images/bubble-logo.png"
import { Rings, Watch } from 'react-loader-spinner'
const screenWidth = window.innerWidth

//progress bar styling
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: '15px',
      backgroundColor: '#99E1E4',
      height: '10px'
    },
}));

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
                    <Box sx={{ width: '80%', margin: '20px auto', height: '10px', borderRadius: '15px'}}>
                        <BorderLinearProgress variant="determinate" value={props.progress} />
                    </Box>
                    <h3>{props.header3} {props.progress}%</h3>
                </div>
                
            </div>

        </div>
    )
}

export const PricingModal = (props) => {

    return (
        <div className={modalCss.ModalContainer}>
            <div>
                {props.children}
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