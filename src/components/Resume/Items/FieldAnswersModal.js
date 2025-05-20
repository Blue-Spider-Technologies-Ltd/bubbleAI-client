import React, { useEffect, useRef } from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparentSquare } from "../../UI/Buttons/Buttons";
import AuthInput from '../../UI/Input/AuthInputs';
import { FaCopy } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaSuitcase } from "react-icons/fa6";
import { TfiNewWindow } from "react-icons/tfi";
import { SiAnswer } from "react-icons/si";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const styles = {
    modalInner: {
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        textAlign: 'center'
    },
    resumesCont: {
        maxHeight: 300,
        width: "100%",
        overflowY: 'scroll',
        textAlign: "left",
        padding: "15px 5px",
        backgroundColor: "#c0d1d457",
        borderRadius: "10px",
        margin: '15px auto',
        wordBreak: "break-word",
        lineHeight: "1",
        boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
    }
};

const FieldAnswersModal = React.memo(({
    closeModalsAndReset,
    fieldAnswers,
    fieldAnswersUrl,
    handleCopy,
    handleGetResumeDirect,
    handleGetCoverLetterDirect,
    handleCompanySiteAutoApply,
    loginQnAInput,
    handleLoginQnAInputChange,
    handleLoginQnASubmit,
    loginQnALoading
}) => {
    const answersContainerRef = useRef(null);
    // Scroll to bottom whenever fieldAnswers changes
    useEffect(() => {
        if (answersContainerRef.current) {
            answersContainerRef.current.scrollTop = answersContainerRef.current.scrollHeight;
        }
    }, [fieldAnswers]);

    return (
        <PlainModalOverlay>
            <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>

                <h4 style={{ color: '#3E8F93', marginBottom: 10 }}>Application Form Answers</h4>
                <Alert sx={{ mb: 2, fontSize: '.8rem', textAlign: 'left' }} severity="info">
                    Below are the questions you'll find in the application page and best-fit answers based on my analysis. Tap to copy. I have also tailored a resume and cover letter for this application. Scroll all the way down to Download or Regenerate if needed.
                </Alert>
                
                <div style={{marginBottom: "15px", width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ButtonThin
                        fontSize='.8rem' 
                        border='2px solid #F8E231' 
                        width={'100%'} 
                        height='30px' 
                        color='black'
                        onClick={() => window.open(fieldAnswersUrl, '_blank', 'noopener,noreferrer')}
                    >
                        <TfiNewWindow style={{color: "#F8E231", fontSize: ".9rem"}} />&nbsp;&nbsp; Open Application Page
                    </ButtonThin>
                </div>
                <div ref={answersContainerRef} style={{maxHeight: 300, ...styles.resumesCont}}>
                    {fieldAnswers.map((f, idx) => (
                        <div key={idx}>
                            <div style={{ flex: 1, margin: '10px auto', fontSize: '.8rem'}}>
                                <span><BsFillPatchQuestionFill style={{color: "black", fontSize: ".8rem"}} /></span> <b>{f.label}:</b>
                            </div>
                            <div style={{textAlign: 'left'}}>
                                <ButtonTransparentSquare 
                                    type="button" 
                                    onClick={() => handleCopy(f.value)}
                                    color=""
                                    width="100%"
                                    bgColor="#f3f0f15c"
                                    borderRadius="10px"
                                >
                                    <div style={{margin: '10px'}}>
                                        <div style={{width: '100%', textAlign: 'left !important', fontWeight: '400'}}>{f.value}</div>
                                        <div style={{width: '100%', textAlign: 'right'}}>
                                            <FaCopy onClick={() => handleCopy(f.value)} style={{color: "#56A8AC", fontSize: ".8rem"}} />
                                        </div>
                                    </div>

                                </ButtonTransparentSquare>
                            </div>

                        </div>
                    ))}
                </div>

                {/* QnA Input */}
                <h3>ask question</h3>
                <div style={{ marginBottom: 16 }}>
                    <AuthInput
                        id="appQuestion"
                        name="appQuestion"
                        value={loginQnAInput}
                        placeholder="Ask me more application questions..."
                        inputGridSm={12}
                        multiline={true}
                        rows={2}
                        maxRows={2}
                        mt={1}
                        mb={1}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleLoginQnASubmit(); }}
                        onChange={handleLoginQnAInputChange}
                    />
                    <div style={{marginBottom: "10px", width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <ButtonThin
                            fontSize='.8rem' 
                            width={'110px'} 
                            height='25px' 
                            color='#3E8F93'
                            onClick={handleLoginQnASubmit}
                        >
                            {!loginQnALoading && <SiAnswer style={{color: "#3E8F93", fontSize: ".9rem"}} />}&nbsp;{loginQnALoading ? 'Generating...' : 'Get Answer'}
                        </ButtonThin>
                    </div>
                </div>

                <h3>other actions</h3>
                <Box sx={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 1 }}> 
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #3E8F93' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={handleGetResumeDirect}
                        >
                            <FaSuitcase style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Resume
                        </ButtonThin>
                    </div>

                    <div style={{marginBottom: "10px", marginRight: '3px'}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #987070' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={handleGetCoverLetterDirect}
                        >
                            <SlEnvolopeLetter style={{color: "#987070", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Cover Ltr
                        </ButtonThin>
                    </div>
        
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid black' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={handleCompanySiteAutoApply}
                        >
                            <AiOutlineReload style={{color: "black", fontSize: ".9rem"}} />&nbsp;&nbsp; Regenerate
                        </ButtonThin>
                    </div>
                </Box>

                <div>
                    <ButtonSubmitGreen onClick={closeModalsAndReset}>
                        Done
                    </ButtonSubmitGreen>
                </div>
            </div>
        </PlainModalOverlay>
    );
});

export default FieldAnswersModal;