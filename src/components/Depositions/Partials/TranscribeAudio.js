import React, { useState, useRef } from 'react';
import depoCss from '../Depositions.module.css'
// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
import { Fetching } from '../../UI/Modal/Modal';
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from '@mui/material/Alert';

const TranscribeAudio = (props) => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const isAuth = localStorage?.getItem('token')
    const inputRef = useRef()
    const [audioTranscriptionDone, setAudioTranscriptionDone] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [fetching, setFetching] = useState(false)


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
                    <ButtonSubmitGreen>
                        <span style={{ marginRight: "5px", paddingTop: "1px" }}>Transcribe </span> <ArrowForwardIosIcon fontSize='inherit' />
                    </ButtonSubmitGreen>
                </div>
            </div>
        </div>
    )


    // const meetingContainer = (
    //     <div className='content'>
    //         <div className='explanation-points'>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click on any participant's name to view or start transcriptions</Alert>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click the red record button to start</Alert>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="info">Click the stop button that shows only while recording to stop and automatically transcribe</Alert>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">Transcriptions can not be deleted or editted as a security measure to information minuted</Alert>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">Avoid reloading page once transcription has started to reduce the risk of any data loss</Alert>
    //             <Alert sx={{padding: '0 5px', fontSize: '.8rem'}} severity="warning">For best transcriptions, pause recording when participant is not actively speaking</Alert>
    //         </div>

    //         <div className='error'>{error}</div>

    //         <div className="Segment">

    //         </div>
    //         <div style={{width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px"}}>
    //             <div style={{width: "150px"}}>
    //                 <ButtonSubmitGreen onClick={handleMeetingEnd}>
    //                     <span style={{marginRight: "5px", paddingTop: "1px"}}>Finish Meeting</span> <ArrowForwardIosIcon fontSize='inherit' />
    //                 </ButtonSubmitGreen>
    //             </div>
    //         </div>
    //     </div>
    // )






    return (
        <div>
            <div className="BodyWrapper">
                {/* ALL MEETINGS HEADER */}
                <div className="BuildNavigator">
                    <div className={!audioTranscriptionDone ? "ActiveNav" : undefined}><span>1</span>Upload Audio</div>
                    <div className={audioTranscriptionDone ? "ActiveNav" : undefined}><span>2</span>Transcribed</div>
                </div>

                {!audioTranscriptionDone && dragDropAudio}

            </div>
            {fetching ? <Fetching /> : undefined}
        </div>

    )
}

export default TranscribeAudio;