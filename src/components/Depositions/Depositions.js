import React, { useState, useEffect } from 'react';
import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import { useNavigate } from 'react-router-dom';
import Meeting from './Partials/Meeting';
import TranscribeAudio from './Partials/TranscribeAudio';
import TranslateAudio from './Partials/TranslateAudio';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ButtonCard } from '../UI/Buttons/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { setHideCards, setFetching } from '../../redux/states';
import { Grid } from "@mui/material"
import {jwtDecode} from 'jwt-decode';;



const Depositions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { hideCards, transcriptActivityStarted } = useSelector(state => state.stateData)
    const isAuth = localStorage?.getItem('token')
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [meetingButton, showMeetingButton] = useState(true)
    const [transcribeButton, showTranscribeButton] = useState(true)
    const [translateButton, showTranslateButton] = useState(true)

    const resetButtonCardBoleans = () => {
        dispatch(setHideCards(false))
        showMeetingButton(true);
        showTranscribeButton(true);
        showTranslateButton(true);
    }

    useEffect(() => {
        dispatch(setFetching(true))
        const now = Date.now()
        if (isAuth) {              
            const authUser = jwtDecode(isAuth)
            //logout if token expired
            if (now >= authUser.expiration) {
                dispatch(setFetching(false))
                localStorage?.removeItem('token')
                navigate('/popin')
            }
            dispatch(setFetching(false))
        } else {
            dispatch(setFetching(false))
            localStorage?.removeItem('token')
            navigate('/popin')
        }
    }, [isAuth, navigate, dispatch])

    useEffect(() => {
        resetButtonCardBoleans()
    }, [])

    const toggleOptions = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const toggleButtonCards = (prop) => {
        dispatch(setHideCards(true))
        //sets what is clicked to true and the others false
        showMeetingButton(prop === "meeting");
        showTranscribeButton(prop === "transcribe");
        showTranslateButton(prop === "translate");
    };


    //CHECK WHEN A PARTICULAR BUTTONCARD IS SELECTED OVER OTHERS
    const checkMeetingBoolean = () => meetingButton &&!transcribeButton &&!translateButton;
    const checkTranscribeBoolean = () => transcribeButton &&!meetingButton &&!translateButton;
    const checkTranslateBoolean = () => translateButton &&!transcribeButton &&!meetingButton;

    //CHECK WHEN ANY OF THE BUTTONCARDS IS FALSE
    const checkAnyFalseButtonCard = () => !translateButton || !transcribeButton || !meetingButton

    return (
        <div>
            {/* <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search Transcriptions" hidden={!authMenuOpen} />   */}
            
            <div style={{width: '100%', padding: '0'}}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                {!transcriptActivityStarted ? <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleOptions} headerText={!checkAnyFalseButtonCard() && "Speech to Text AI"} /> : undefined}
                
                
                {!transcriptActivityStarted && checkAnyFalseButtonCard() ? 
                    (<div className='go-back'>
                        <div onClick={resetButtonCardBoleans} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: '100px'}}>
                            <ArrowCircleLeftIcon fontSize='large' /> Back
                        </div>
                    </div>) : 
                undefined}

                {!hideCards ? (
                    <Grid container sx={{padding: '50px 30px'}}>

                        {meetingButton && (
                            <Grid item lg={checkMeetingBoolean() ? 12 : 4} md={checkMeetingBoolean() ? 12 : 6} xs={12}>
                                <ButtonCard icon="meeting" title="Set up Meeting" width={checkMeetingBoolean() && '350px'} onClick={() => toggleButtonCards('meeting')} description="Convert your conversations in a meeting into text, mapping each person's contributions to their identity" />
                            </Grid>
                        )}
                        {transcribeButton && (
                            <Grid item lg={checkTranscribeBoolean() ? 12 : 4} md={checkTranscribeBoolean() ? 12 : 6} xs={12}>
                                <ButtonCard icon="transcribe" title="Transcribe Audio or Video File" width={checkTranscribeBoolean() && '350px'} onClick={() => toggleButtonCards('transcribe')} description="Import or upload an audio file to get a text output. Save or download output for later use" />
                            </Grid>
                        )}
                        {translateButton && (
                            <Grid item lg={checkTranslateBoolean() ? 12 : 4} md={12} xs={12}>
                                <ButtonCard icon="translate" title="Translate Audio or Video File" width={checkTranslateBoolean() && '350px'} onClick={() => toggleButtonCards('translate')} description="upload or record an audio file and translate it to a wide variety of languages I have available for you" />
                            </Grid>
                        )}

                    </Grid>
                ) : undefined}


                {checkMeetingBoolean() && <Meeting />}
                {checkTranscribeBoolean() && <TranscribeAudio />}
                {checkTranslateBoolean() && <TranslateAudio />}

            </div>

        </div>
    )
}

export default Depositions;