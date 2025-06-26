import React, { useState, useRef } from 'react';
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { setMeeting, setTranscriptActivityStarted, setFetching, setError } from '../../../redux/states';
import AuthInput from '../../UI/Input/AuthInputs';
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from '@mui/material/Alert';
import CustomizedAccordions from '../../UI/CustomizedAccordions/CustomizedAccordions';
import ChatViewTranscription from './ChatViewTranscription';
import { errorAnimation } from '../../../utils/client-functions';
import axios from 'axios'
import { RealtimeTranscriber } from 'assemblyai/streaming';
import * as RecordRTC from 'recordrtc';

const Meeting = (props) => {
    const dispatch = useDispatch()
    const confirm = useConfirm();
    const navigate = useNavigate()
    const realtimeTranscriber = useRef(null)
    const recorder = useRef(null);
    const isAuth = localStorage?.getItem('token')
    const { meeting, error } = useSelector(state => state.stateData)
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingStarted, setMeetingStarted] = useState(false)
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [participants, addParticipants] = useState([
        {
            name: '',
            transcripts : []
        }
    ]);

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }
    
    //////Participants HANDLERS
    const handleAddParticipant = () => {
        const newPartcipant = {
            name: "",
            transcripts: []
        }
        if(participants.length < 10) {
            return addParticipants([...participants, newPartcipant])
        }
        errorSetter("You can add a maximum of 10 participants")
    }
    const handleDeleteParticipant = () => {
        if(participants.length > 1) {
            const prevParticipants = [...participants]
            prevParticipants.pop()
            return addParticipants([...prevParticipants])
        }
        errorSetter("Meeting must have participants")
    }
    const handleParticipantChange = (event, index) => {
        const prevParticipants = [...participants];
        prevParticipants[index].name = event.target.value
        addParticipants(prevParticipants)
    };

    //Meeting HANDLERS
    const handleMeetingTitleChange = event => {
        setMeetingTitle(event.target.value)
    }

    const getToken = async () => {
        const response = await fetch('http://localhost:8000/token');
        const data = await response.json();
    
        if (data.error) {
            errorSetter(data.error)
            console.log(data.error)
        }
    
        return data.token;
    };

    const startTranscription = async () => {
        realtimeTranscriber.current = new RealtimeTranscriber({
            token: await getToken(),
            sampleRate: 16000,
            speakerLabels: true, // Enable speaker labels
            speakers: participants.length,
        });
    
        const texts = {};
        realtimeTranscriber.current.on('transcript', transcript => {
            let msg = '';
            texts[transcript.audio_start] = transcript.text;
            const keys = Object.keys(texts);
            keys.sort((a, b) => a - b);     
                for (const key of keys) {
                    if (texts[key]) {
                    msg += ` ${texts[key]}`;
                    console.log(msg);
                }
            }
            setTranscript(msg);
        });
    
        realtimeTranscriber.current.on('error', event => {
            console.error(event);
            realtimeTranscriber.current.close();
            realtimeTranscriber.current = null;
        });
    
        realtimeTranscriber.current.on('close', (code, reason) => {
            errorSetter(`Connection closed: ${code} ${reason}`);
            console.log(`Connection closed: ${code} ${reason}`);
            realtimeTranscriber.current = null;
        });
    
        await realtimeTranscriber.current.connect();
    
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                recorder.current = new RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/webm;codecs=pcm',
                    recorderType: RecordRTC.StereoAudioRecorder,
                    timeSlice: 250,
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1,
                    bufferSize: 4096,
                    audioBitsPerSecond: 128000,
                    ondataavailable: async (blob) => {
                        if (!realtimeTranscriber.current) return;
                        const buffer = await blob.arrayBuffer();
                        realtimeTranscriber.current.sendAudio(buffer);
                    },
                });
                recorder.current.startRecording();
            })
            .catch((err) => console.error(err));
    
        setIsRecording(true);
    };
    
    const endTranscription = async (event) => {
        event.preventDefault();
        setIsRecording(false);
        await realtimeTranscriber.current.close();
        realtimeTranscriber.current = null;
        recorder.current.pauseRecording();
        recorder.current = null;
    };
    
    const handleMeetingEnd = async () => {
        dispatch(setFetching(true))
        try {
            dispatch(setFetching(false))
            confirm({ title: "Save and End Meeting?", description: `Once you end the meeting, you will be able to view it again but not be able to alter it in form of additions.` })
            .then(async () => {
                dispatch(setFetching(true))
                const response = await axios.post('/transcript/finish-meeting', meeting, {
                    headers: {
                        'x-access-token': isAuth
                    }
                });
                //Session expired
                if (response.data.status === 'unauthenticated') {
                    dispatch(setFetching(false));
                    confirm({ title: "Session Expired", description: `Click OK to login and continue from where you stopped` })
                    .then(async () => {
                        localStorage?.removeItem('token')
                        navigate('/popin');
                    })
                    .catch(() => {
                        localStorage?.removeItem('token')
                        navigate('/popin')
                    });
                }
                if (response.data.message === 'Meeting Ended') {
                    dispatch(setFetching(false))
                    confirm({ title: "Meeting Saved", description: `Click OK` })
                    .then(async () => {
                        window.location.reload();
                    })
                    .catch(() => {
                        navigate('/')
                    });
                }
            })
            .catch(() => {});

        } catch (error) {
            console.log(error);
            dispatch(setFetching(false))
            errorSetter(error.response ? error.response.data.error : error.response.data.message);
        }
    }

    const handleMeetingStart = async (e) => {
        e.preventDefault()
        if (meetingTitle === '') return errorSetter('Meeting must have a title');
        if (participants.length < 2) return errorSetter('Meeting must have at least 2 Participants');
        dispatch(setFetching(true))

        try {
            const newMeeting = {
                meetingTitle: meetingTitle,
                participants: participants
            }
            const response = await axios.post('/transcript/start-meeting', newMeeting, {
                headers: {
                    'x-access-token': isAuth
                }
            })
            console.log(response);
            //Success but not yet created
            if (response.status === 200) {
                dispatch(setFetching(false))
                //prompt user about unfinished meeting session
                if (response.data.message === 'You have an unfinished Meeting') {
                    dispatch(setFetching(false))
                    confirm({ title: "You have an unfinished Meeting", description: `Click OK to Continue Previous Session or Cancel to Start New Meeting` })
                    .then(async () => {
                        dispatch(setMeeting(response.data.meeting))
                        setMeetingStarted(true)
                        dispatch(setTranscriptActivityStarted(true))
                        dispatch(setFetching(false))
                    })
                    .catch(() => {
                        handleMeetingEnd()
                    });
                }
            } else {
                dispatch(setMeeting(response.data))
                setMeetingStarted(true)
                dispatch(setTranscriptActivityStarted(true))
                dispatch(setFetching(false))
            }
        } catch (error) {
            dispatch(setFetching(false))
            if (error?.response?.data?.status) {
                errorSetter(error.response.data.status);
                return;
            }
            const errorMessage = typeof(error.message) === "string" ? error.message : "Something went wrong"
            errorSetter(errorMessage);
        }
    }


    const setUpForm = (
        <form method="post" onSubmit={handleMeetingStart}>
            <div className='explanation-points'>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Once meeting is started, you can not return to edit this page</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">To edit page, you will have to reset meeting</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">To reset meeting, you will have to close the current tab</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">When you reopen it, you will be prompted to either continue or cancel previous session</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Choose cancel to confirm</Alert>
            </div>
        
            <div className='error'>{error}</div>
            
            <div className="Segment">
                <h4>Meeting Details</h4>
                <div>
                    <Grid container>
                        <AuthInput 
                            id="meetingTitle" 
                            name="meetingTitle" 
                            value={meetingTitle} 
                            label="Meeting Title" 
                            inputType="text" 
                            inputGridSm={12} 
                            inputGrid={12} 
                            mb={2} 
                            required={true} 
                            onChange={handleMeetingTitleChange} 
                        />
                    </Grid>
                </div>
            </div>

            <div className="Segment">
                <h4>Participants</h4>
                <Grid container>
                    {participants.map((participant, index) => {
                        return <AuthInput 
                                    key={index} 
                                    id={"Participant Full Name" + index} 
                                    label="Participant Full Name" 
                                    value={participant.name} 
                                    inputType="text" 
                                    inputGridSm={8} 
                                    inputGrid={8}
                                    mb={2} 
                                    required={true} 
                                    onChange={(event) => handleParticipantChange(event, index)}
                                />
                    })}
                    <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
                        <div style={{marginRight: "10px"}} className='delete' title='Delete ' onClick={handleDeleteParticipant}>-</div>
                        <div className='add' title='Add More' onClick={handleAddParticipant}>+</div>
                    </Grid>
                </Grid>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px"}}>
                <div style={{width: "150px"}}>
                    <ButtonSubmitGreen>
                        <span style={{marginRight: "5px", paddingTop: "1px"}}>Start </span> <ArrowForwardIosIcon fontSize='inherit' />
                    </ButtonSubmitGreen>
                </div>
            </div>
        </form>
    )


    const meetingContainer = (
        <div className='content'>
            <div className='explanation-points'>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click on any participant's name to view or start transcriptions</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click the red record button to start</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click the stop button that shows only while recording to stop and automatically transcribe</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">Transcriptions can not be deleted or editted as a security measure to information minuted</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">Avoid reloading page once transcription has started to reduce the risk of any data loss</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">For best transcriptions, pause recording when participant is not actively speaking</Alert>
            </div>

            <div className='error'>{error}</div>
        
            <div className="Segment">
                <h4>{meeting.meetingTitle}'s Ongoing Transcriptions</h4>
                {/* <CustomizedAccordions participants={meeting.participants} />             */}
                <ChatViewTranscription />

            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px"}}>
                <div style={{width: "150px"}}>
                    <ButtonSubmitGreen onClick={handleMeetingEnd}>
                        <span style={{marginRight: "5px", paddingTop: "1px"}}>Finish Meeting</span> <ArrowForwardIosIcon fontSize='inherit' />
                    </ButtonSubmitGreen>
                </div>
            </div>
        </div>
    )
    



    
    
    return (
        <div>
            <div className="BodyWrapper">
            {/* ALL MEETINGS HEADER */}
                <div className="BuildNavigator">
                    <div className={!meetingStarted ? "ActiveNav" : undefined}><span>1</span>Add Participants</div>
                    <div className={meetingStarted ? "ActiveNav" : undefined}><span>2</span>Transcribe</div>
                </div>

                {!meetingStarted ? setUpForm : meetingContainer}
                
            </div>
        </div>

    )
}

export default Meeting;