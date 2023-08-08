import React, { useState, useEffect } from 'react';
import depoCss from './Depositions.module.css'
import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import { ButtonCard } from '../UI/Buttons/Buttons';
import { Grid } from "@mui/material"
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Meeting from './Partials/Meeting';
import { Fetching } from '../UI/Modal/Modal';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const Depositions = () => {
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem('token')
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [meetingButton, showMeetingButton] = useState(true)
    const [transcribeButton, showTranscribeButton] = useState(true)
    const [translateButton, showTranslateButton] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setFetching(true)
        const now = Date.now()
        if (isAuth) {              
            const authUser = jwt_decode(isAuth)
            //logout if token expired
            if (now >= authUser.expiration) {
                setFetching(false)
                localStorage?.removeItem('token')
                navigate('/popin')
            }
            setFetching(false)
        } else {
            setFetching(false)
            localStorage?.removeItem('token')
            navigate('/popin')
        }
    }, [isAuth, navigate])

    const toggleOptions = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const toggleButtonCards = (prop) => {
        //sets what is clicked to true and the others false
        showMeetingButton(prop === "meeting");
        showTranscribeButton(prop === "transcribe");
        showTranslateButton(prop === "translate");
    };

    const resetButtonCardBolleans = () => {
        showMeetingButton(true);
        showTranscribeButton(true);
        showTranslateButton(true);
    }

    //CHECK WHEN A PARTICULAR BUTTONCARD IS SELECTED OVER OTHERS
    const checkMeetingBoolean = () => meetingButton &&!transcribeButton &&!translateButton;
    const checkTranscribeBoolean = () => transcribeButton &&!meetingButton &&!translateButton;
    const checkTranslateBoolean = () => translateButton &&!transcribeButton &&!meetingButton;

    //CHECK WHEN ANY OF THE BUTTONCARDS IS FALSE
    const checkAnyFalseButtonCard = () => !translateButton || !transcribeButton || !meetingButton

    return (
        <div>
            <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search Transcriptions" hidden={!authMenuOpen} />  
            
            <div style={{width: '100%', padding: '0'}}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleOptions} headerText={!checkAnyFalseButtonCard() && "Speech to Text AI"} />
                
                {checkAnyFalseButtonCard() && <div className='go-back'>
                    <div onClick={resetButtonCardBolleans} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: '100px'}}>
                        <ArrowCircleLeftIcon fontSize='large' /> Back
                    </div>
                </div>}

                <Grid container sx={{padding: '50px 30px'}}>

                {meetingButton && (
                    <Grid item lg={checkMeetingBoolean() ? 12 : 4} md={checkMeetingBoolean() ? 12 : 6} xs={12}>
                        <ButtonCard icon="meeting" title="Set up Meeting" width={checkMeetingBoolean() && '350px'} onClick={() => toggleButtonCards('meeting')} description="Convert your conversations in a meeting into text, mapping each person's contributions to their identity" />
                    </Grid>
                )}
                {transcribeButton && (
                    <Grid item lg={checkTranscribeBoolean() ? 12 : 4} md={checkTranscribeBoolean() ? 12 : 6} xs={12}>
                        <ButtonCard icon="transcribe" title="Transcribe Audio File" width={checkTranscribeBoolean() && '350px'} onClick={() => toggleButtonCards('transcribe')} description="Import or upload an audio file to get a text output. Save or download output for later use" />
                    </Grid>
                )}
                {translateButton && (
                    <Grid item lg={checkTranslateBoolean() ? 12 : 4} md={12} xs={12}>
                        <ButtonCard icon="translate" title="Translate Audio File" width={checkTranslateBoolean() && '350px'} onClick={() => toggleButtonCards('translate')} description="upload or record an audio file and translate it to a wide variety of languages I have available for you" />
                    </Grid>
                )}


                    
                    {/* <Grid item  md={12} xs={12}>
                    
                        <div className='explanation-points'>
                            <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Once meeting is started, you can not return to edit this page</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">To edit page, you will have to reset meeting</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">To reset meeting, you will have to close the current tab</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">When you reopen it, you will be prompted to either continue or cancel previous session</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Choose cancel to confirm</Alert>
                        </div>

                    </Grid> */}
                </Grid>

                {checkMeetingBoolean() && <Meeting />}

            </div>

            {fetching && <Fetching />}
        </div>
    )
}

export default Depositions;