import React, { useEffect, useRef } from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparentSquare } from "../../UI/Buttons/Buttons";
import AuthInput from '../../UI/Input/AuthInputs';
import { FaCopy } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaSuitcase } from "react-icons/fa6";
import { IoLink } from "react-icons/io5";
import { Oval } from 'react-loader-spinner'
import { GrSend } from "react-icons/gr";
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
    },
    stepNumber: {
        background: 'linear-gradient(135deg, #3E8F93 0%, #56A8AC 100%)',
        color: 'black',
        width: '60px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '10px',
        fontSize: '.85rem',
        fontWeight: '600'
    },
    stepContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px', 
        marginTop: '40px', 
        fontSize: '1rem',
        fontWeight: '500',
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

    const screenWidth = window.innerWidth;
    const handleKeyDown = e => { 
        if (screenWidth > 900 ) {
            if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault();
                handleLoginQnASubmit();
            }
        }
    }
    return (
        <PlainModalOverlay>
            <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>

                <h4 style={{ color: '#3E8F93', marginBottom: 10 }}>Application Form Answers</h4>
                <Alert sx={{ mb: 2, fontSize: '.8rem', textAlign: 'left' }} severity="info">
                    Below are the <b>questions you'll find in the application page</b> and <b>best-fit answers</b> based on my analysis. <b>Tap to copy</b>. I have also tailored a resume and cover letter for this application. Scroll all the way down to Download or Regenerate if needed.
                </Alert>
                
                {/* Open Job Page Button */}
                <div style={styles.stepContainer}><div style={styles.stepNumber}>Step 1</div> <div>Open Application Page</div></div>
                <div style={{marginBottom: "15px", width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ButtonThin
                        fontSize='.8rem' 
                        border='2px solid #61AFF1' 
                        width={'100%'} 
                        height='30px' 
                        color='#61AFF1'
                        onClick={() => handleCopy(fieldAnswersUrl, true)}
                    >
                        <IoLink style={{fontSize: ".9rem", color: "#61AFF1"}} />&nbsp;&nbsp; Tap to copy page link
                    </ButtonThin>
                </div>

                <div style={styles.stepContainer}><div style={styles.stepNumber}>Step 2</div> <div>Copy Application Answers</div></div>
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
                                        <div style={{width: '100%', textAlign: 'left', fontWeight: '400'}}>{f.value}</div>
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
                <div style={{ marginBottom: 16, position: 'relative' }}>
                    <div style={styles.stepContainer}><div style={styles.stepNumber}>Step 3</div> <div>Ask Application Questions</div></div>
                    <AuthInput
                        id="appQuestion"
                        name="appQuestion"
                        value={loginQnAInput}
                        placeholder="Ask more application questions..."
                        inputGridSm={12}
                        multiline={true}
                        buttonInInput={true}
                        rows={2}
                        maxRows={2}
                        mt={1}
                        mb={1}
                        onKeyDown={handleKeyDown}
                        onChange={handleLoginQnAInputChange}
                    />
                    <div style={{position: 'absolute', top: '2.5rem', right: '15px', zIndex: 1}}>
                        <ButtonTransparentSquare 
                            type="button" 
                            onClick={!loginQnALoading && handleLoginQnASubmit}
                            color=""
                            width="35px"
                            height="35px"
                            bgColor="black"
                            borderRadius="50%"
                        >
                            {loginQnALoading ? (
                                <Oval
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#3E8F93"
                                    ariaLabel="oval-loading"
                                />
                            ) : (
                                <GrSend style={{ color: "#3E8F93", fontSize: '1.5em' }} />
                            )}
                        </ButtonTransparentSquare>
                    </div>
                </div>

                <h3>other actions</h3>
                <Box sx={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 1 }}> 
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #3E8F93' 
                            width={'160px'} 
                            height='25px' 
                            color='black'
                            onClick={handleGetResumeDirect}
                        >
                            <FaSuitcase style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Resume in PDF
                        </ButtonThin>
                    </div>

                    <div style={{marginBottom: "10px", marginRight: '3px'}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #987070' 
                            width={'160px'} 
                            height='25px' 
                            color='black'
                            onClick={handleGetCoverLetterDirect}
                        >
                            <SlEnvolopeLetter style={{color: "#987070", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Cover Ltr in PDF
                        </ButtonThin>
                    </div>
        
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid black' 
                            width={'160px'} 
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