import React, { useState } from 'react';
// import { Grid } from "@mui/material";
// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
// import { useConfirm } from "material-ui-confirm";
// import { setMeeting, setTranscriptActivityStarted, setFetching, setError } from '../../../redux/states';
// import AuthInput from '../../UI/Input/AuthInputs';
// import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Alert from '@mui/material/Alert';
// import CustomizedAccordions from '../../UI/CustomizedAccordions/CustomizedAccordions';
// import { errorAnimation } from '../../../utils/client-functions';
// import axios from 'axios'
import { FaRegClock } from "react-icons/fa6";
const screenWidth = window.innerWidth

const ChatViewTranscription = (props) => {

    
    
    return (
        <div style={styles.container}>
            <div style={styles.innerCont}>

                <div style={styles.item}>
                    <div style={styles.itemLeft}>

                    </div>
                    <div style={styles.itemRight}>
                        <div style={styles.nameCont}>
                            <div style={styles.name}>
                                Sheriff Malebo
                            </div>
                            <div style={styles.time}>
                                <div style={{marginTop: '2.5px', marginRight: '3px'}}><FaRegClock /></div> <div> 12:30pm</div>
                            </div>
                        </div>

                        <div style={styles.text}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged.
                        </div>
                    </div>
                </div>

                <div style={styles.item}>
                    <div style={styles.itemLeft}>

                    </div>
                    <div style={styles.itemRight}>
                        <div style={styles.nameCont}>
                            <div style={styles.name}>
                                Sheriff Malebo
                            </div>
                            <div style={styles.time}>
                                <div style={{marginTop: '2.5px', marginRight: '3px'}}><FaRegClock /></div> <div> 12:30pm</div>
                            </div>
                        </div>

                        <div style={styles.text}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged.
                        </div>
                    </div>
                </div>

                <div style={styles.item}>
                    <div style={styles.itemLeft}>

                    </div>
                    <div style={styles.itemRight}>
                        <div style={styles.nameCont}>
                            <div style={styles.name}>
                                Sheriff Malebo
                            </div>
                            <div style={styles.time}>
                                <div style={{marginTop: '2.5px', marginRight: '3px'}}><FaRegClock /></div> <div> 12:30pm</div>
                            </div>
                        </div>

                        <div style={styles.text}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChatViewTranscription;

const styles = {
    container: {
        boxSizing: 'border-box',
        width: '100%',
        padding: '20px',
        overflowY: 'scroll'
    },
    innerCont: {
        height: 'auto',
        width: '100%'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px'
    },
    itemLeft: {
        width: '5vw'
    },
    itemRight: {
        border: '1px dashed rgba(0, 0, 0, 0.454)',
        backgroundColor: '#E5F6FD',
        padding: '10px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        width: '95vw'
    },
    nameCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: 'rgb(177, 144, 13)',
        fontSize: '.9rem',
        fontWeight: '600',
        width: '90%'
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: '.7rem',
        color: 'rgba(0, 0, 0, 0.454)',
        width: '10%'
    },
    text: {
        fontSize: '.85rem',
        padding: '7px',
        paddingLeft: screenWidth > 900 ? '25px' : 'auto',
        width: '95%'
    }
}