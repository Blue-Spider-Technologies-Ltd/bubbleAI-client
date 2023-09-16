import React, { useState, useRef } from 'react';
import depoCss from '../Depositions.module.css';
import resumeTemplateCss from '../../Resume/Templates/Standard/Standard.module.css';
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
import { Modal } from '../../UI/Modal/Modal';
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from '@mui/material/Alert';
import axios from  'axios';
import jwt_decode from "jwt-decode";
import { useReactToPrint  } from 'react-to-print';
import { useConfirm } from "material-ui-confirm";
import AuthInput from '../../UI/Input/AuthInputs';
import { LANGUAGES } from '../../../utils/languages';

const TranslateAudio = (props) => {
    const confirm = useConfirm();
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem('token')
    const inputRef = useRef()
    const printRef = useRef()
    const [audioTranscriptionDone, setAudioTranscriptionDone] = useState(false);
    const [translations, setTranslations] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [languageSelectError, setLanguageSelectError] = useState(false);
    const [language, setLanguage] = useState('');
    const [fetching, setFetching] = useState(false);


    const handleDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file.type);
        if (!file.type.startsWith('audio/') && !file.type.startsWith('video/') ) {
            alert('Please drop only audio or video file.');
            return;
        }
        setFile(file)
    }

    const handleUploadFile = e => {
        setFile(e.target.files[0])
    }

    const handleAfterPrint = () => {
        confirm({ title: 'Done Transcribing?', description: `If you are finished transcribing click OK` })
        .then(() => {
            window.location.reload()
        })
        .catch(err => console.log(err));
    }

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => handleAfterPrint(),
    });

    const handleAudioTranslation = async () => {
        const now = new Date().getTime()
        const authUser =  jwt_decode(isAuth)
        if (isAuth && (now < authUser.expiration)) {

            try {
                if (!file) {
                    setError('No file audio selected');
                    return
                }
                if (language === '' || language === undefined ) {
                    setLanguageSelectError('Select a valid language');
                    return
                }
                setFetching(true)
                setError('')
        
                const formData = new FormData();
                formData.append('language', language);
                formData.append('audio', file, file.name);
    
                const response = await axios.post('/transcript/translate-file', formData, {
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
                setTranslations(response.data)
                setFetching(false)
                setAudioTranscriptionDone(true)
    
            } catch (error) {
                console.error(error)
                setFetching(false)
                setError(error.response.data.error)
            }
        } else {
            localStorage?.removeItem('token')
            navigate('/popin')
        }
        
    };

    const handleSelectChange = (e) => {
        setLanguageSelectError('')
        if (!e.target.value) {
            setLanguage('')
            return
        }
        setLanguage(e.target.value)
    }

    const dragDropAudio = (
        <div className='content'>
            <div className='explanation-points'>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">I can translate your audio video files to text in several languages from the dropdown</Alert>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">Click the panel below to upload</Alert>
                <Alert sx={{ padding: '0 5px', fontSize: '.8rem' }} severity="info">I accept only audio & video files here</Alert>
            </div>

            <div className='error'>{error || languageSelectError}</div>

            <div className='Segment'>
                <h4>Choose Language</h4>
                <Grid container sx={{border: languageSelectError && '1px dashed rgb(216, 7, 7)'}}>
                    <AuthInput value={language} label="Translate to:" inputType="select2" inputGridSm={12} inputGrid={12} mb={2} list={LANGUAGES} required={true} onChange={handleSelectChange} />     
                </Grid>
            </div>

            <div className="Segment">
                {!file ? (
                    <div
                        className={depoCss.DragnDrop}
                        style={{ border: "4px dashed #c0d1d4" }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current.click()}
                    >
                        <h1>Drag & Drop File</h1>
                        <h4>or</h4>
                        <input
                            type='file'
                            accept="audio/*,video/*"
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
                        style={{border: error && '4px dashed rgb(216, 7, 7)'}}
                    >
                        <h1>{file.name}</h1>
                        <h4 style={{color: error && 'rgb(216, 7, 7)'}}>
                            selected
                        </h4>
                        <input
                            type='file'
                            accept="audio/*,video/*"
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
                    <ButtonSubmitGreen onClick={handleAudioTranslation}>
                        <span style={{ marginRight: "5px", paddingTop: "1px" }}>Translate </span> <ArrowForwardIosIcon fontSize='inherit' />
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
                    {translations.map((translation, index) => {
                        return <p key={index}>{translation}</p>
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
                    <div className={!audioTranscriptionDone ? "ActiveNav" : undefined}><span>1</span>Upload File</div>
                    <div className={audioTranscriptionDone ? "ActiveNav" : undefined}><span>2</span>Translated</div>
                </div>

                {!audioTranscriptionDone ? dragDropAudio : transcriptionDone}

            </div>
            {fetching && <Modal 
                            header4='Just a moment'
                            header3='Translating your file...'
                        />}
        </div>

    )
}

export default TranslateAudio;