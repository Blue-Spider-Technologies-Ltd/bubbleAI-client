import React, { useState, useRef } from 'react';
import depoCss from '../Depositions.module.css'
import resumeTemplateCss from '../../Resume/Templates/Standard/Standard.module.css'
import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
import { Fetching } from '../../UI/Modal/Modal';
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from '@mui/material/Alert';
import axios from  'axios'
import jwt_decode from "jwt-decode";
import { useReactToPrint  } from 'react-to-print';

const TranscribeAudio = (props) => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem('token')
    const inputRef = useRef()
    const printRef = useRef()
    const [audioTranscriptionDone, setAudioTranscriptionDone] = useState(false);
    const [transcripts, setTranscripts] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [fetching, setFetching] = useState(false);



    const handleDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith('audio/')) {
            alert('Please drop an audio file.');
            return;
        }
        setFile(file)
    }

    const handleUploadFile = e => {
        setFile(e.target.files[0])
    }

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const handleAudioTranscription = async () => {
        const now = new Date().getTime()
        const authUser =  jwt_decode(isAuth)
        if (isAuth && (now < authUser.expiration)) {

            try {
                if (!file) {
                    setError('No file audio selected');
                    return
                }
                setFetching(true)
                setError('')
        
                const formData = new FormData();
                formData.append('audio', file, file.name);
    
                const response = await axios.post('/transcript/transcribe-audio', formData, {
                    headers: {
                        'x-access-token': isAuth,
                        'Content-Type': 'multipart/form-data'
                    }
                })
    
                if(response.status === 500) {
                    throw new Error("Something went wrong, Try again")
                }
                
                if(response.data.length < 1) {
                    throw new Error("Something went wrong, Try again")
                }
                setTranscripts(response.data)
                setFetching(false)
                setAudioTranscriptionDone(true)
    
            } catch (error) {
                console.error(error)
                setFetching(false)
                setError("Something went wrong, Try again")
            }
        } else {
            localStorage?.removeItem('token')
            navigate('/popin')
        }
        
    
      };

    const dragDropAudio = (
        <div className='content'>
            <div className='explanation-points'>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">Within this bubble, I can convert your audio files to text</Alert>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">Click the panel below to upload</Alert>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">Alternatively, drag and drop your audio file from a folder</Alert>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">I accept only audio files here in mp3, wav, audio/webm formats</Alert>
            </div>

            <div className='error'>{error}</div>

            <div className="Segment">
                {!file ? (
                    <div
                        className={depoCss.DragnDrop}
                        style={{ border: "4px dashed #c0d1d4" }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current.click()}
                    >
                        <h1>Drag & Drop Audio File</h1>
                        <h4>or</h4>
                        <input
                            type='file'
                            accept="audio/*"
                            onChange={handleUploadFile}
                            hidden
                            ref={inputRef}
                        />
                        <h2>click to select</h2>
                    </div>
                ) : (
                    <div
                        className={depoCss.DragnDrop}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current.click()}
                    >
                        <h1>{file.name}</h1>
                        <h4>selected</h4>
                        <input
                            type='file'
                            accept="audio/*"
                            onChange={handleUploadFile}
                            hidden
                            ref={inputRef}
                        />
                        <h2>click to change</h2>
                    </div>
                )}
            </div>

            <div style={{ width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px" }}>
                <div style={{ width: "150px" }}>
                    <ButtonSubmitGreen onClick={handleAudioTranscription}>
                        <span style={{ marginRight: "5px", paddingTop: "1px" }}>Transcribe </span> <ArrowForwardIosIcon fontSize='inherit' />
                    </ButtonSubmitGreen>
                </div>
            </div>
        </div>
    )


    const transcriptionDone = (
        <div className='content'>

            <div className='error'>{error}</div>

            <div className="Segment">
                <div ref={printRef} className={resumeTemplateCss.StandardContainer} style={{padding: '10px'}}>
                    {transcripts.map((transcript, index) => {
                        return <p key={index}>{transcript}</p>
                    })}
                </div>
            </div>

            <div style={{width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px"}}>
                <div style={{width: "150px"}}>
                    <ButtonSubmitGreen type='button' onClick={handlePrint}>
                        <span style={{marginRight: "5px", paddingTop: "1px"}}>Save Document</span> <ArrowForwardIosIcon fontSize='inherit' />
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
                    <div className={!audioTranscriptionDone ? "ActiveNav" : undefined}><span>1</span>Upload Audio</div>
                    <div className={audioTranscriptionDone ? "ActiveNav" : undefined}><span>2</span>Transcribed</div>
                </div>

                {!audioTranscriptionDone ? dragDropAudio : transcriptionDone}

            </div>
            {fetching ? <Fetching /> : undefined}
        </div>

    )
}

export default TranscribeAudio;