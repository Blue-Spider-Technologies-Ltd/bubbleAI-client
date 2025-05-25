import React, { useEffect, useRef, useCallback } from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparentSquare } from "../../UI/Buttons/Buttons";
import { successMiniAnimation, errorAnimation } from "../../../utils/client-functions.js";
import { setSuccessMini, setError } from "../../../redux/states";
import AuthInput from '../../UI/Input/AuthInputs';
import { Oval } from 'react-loader-spinner'
import { GrSend } from "react-icons/gr";
import { FaCopy } from "react-icons/fa6";
import { IoLink } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaSuitcase } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";

const styles = {
    modalInner: {
        width: '100%',
        textAlign: 'center'
    },
    link: {
        borderRadius: '20px',
        color: 'rgba(0, 0, 0, 0.634)',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 250, 250, 0.625)',
        cursor: 'copy',
        margin: '5px 0',
        width: '100%',
        padding: '5px',
        zIndex: '1',
        fontSize: '.75rem',
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
    desc: {
        fontSize: '.74rem',
        padding: '10px 0'
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

const QnAModal = React.memo(({
    closeModalsAndReset,
    externalJobUrl,
    linkedinUrl,
    loginQnAJobDesc,
    handleLoginQnAJobDescChange,
    loginQnAJobDescSaved,
    setLoginQnAJobDescSaved,
    loginQnAEditingDesc,
    setLoginQnAEditingDesc,
    loginQnAInput,
    handleLoginQnAInputChange,
    loginQnAList,
    handleLoginQnASubmit,
    loginQnALoading,
    handleCopy,
    handleGetResumeDirect,
    handleGetCoverLetterDirect
}) => {
    const answersContainerRef = useRef(null);
    const dispatch = useDispatch()
    const successSetter = useCallback((string) => {
        dispatch(setSuccessMini(string));
        successMiniAnimation();
    }, [dispatch]);
    const errorSetter = useCallback((string) => {
        dispatch(setError(string))
        errorAnimation()
    }, [dispatch]);
    const screenWidth = window.innerWidth;
    const handleKeyDown = e => { 
        if (screenWidth > 900 ) {
            if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault();
                handleLoginQnASubmit();
            }
        }
    }
    // Scroll to bottom whenever fieldAnswers changes
    useEffect(() => {
        if (answersContainerRef.current) {
            answersContainerRef.current.scrollTop = answersContainerRef.current.scrollHeight;
        }
    }, [loginQnAList]);    
    
    useEffect(() => {
        if (!loginQnAJobDesc || loginQnAJobDesc.length < 1) {
            setLoginQnAEditingDesc(true)
        }
    }, []);
    return (
        <PlainModalOverlay>
            <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', background: '#fff', borderRadius: 12, padding: 24 }}>
                <Alert severity="warning" sx={{ mb: 2, fontSize: '.9rem', textAlign: 'left' }}>
                    This job requires login. Bubble Ai does not handle login yet.<br/>
                    <br/>
                    <b>But not to worry! I'll still assist your application, including tailored answers and career insights if needed.</b>
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
                        onClick={() => handleCopy(externalJobUrl || linkedinUrl, true)}
                    >
                        <IoLink style={{fontSize: ".9rem", color: "#61AFF1"}} />&nbsp;&nbsp; Tap to copy page link
                    </ButtonThin>
                </div>
                
                {/* Job Description Paste/Edit */}
                <div style={styles.stepContainer}><div style={styles.stepNumber}>Step 2</div> <div>Save Job Description</div></div>
                {!loginQnAJobDescSaved || loginQnAEditingDesc ? (
                    <div style={{ marginBottom: 16 }}>
                        <AuthInput
                            id="jobDescription"
                            name="jobDescription"
                            value={loginQnAJobDesc}
                            placeholder="Paste full job description from application page and click save..."
                            multiline={true}
                            inputGridSm={12}
                            mt={1}
                            rows={4}
                            maxRows={4}
                            onChange={handleLoginQnAJobDescChange}
                        />
                        
                        <div style={{marginBottom: "10px", width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <ButtonThin
                                fontSize='.7rem' 
                                fontWeight='500'
                                border='2px solid #3E8F93' 
                                width={'150px'} 
                                height='25px' 
                                color='#3E8F93'
                                onClick={() => {
                                    if (!loginQnAJobDesc || loginQnAJobDesc.length < 1) {
                                        errorSetter("Add and save job description first")
                                        return;
                                    }
                                    setLoginQnAJobDescSaved(true);
                                    setLoginQnAEditingDesc(false);
                                    successSetter("Awesome! Now you can ask me any application questions")
                                }}
                            >
                                <MdOutlinePostAdd style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;Save Description
                            </ButtonThin>
                        </div>

                    </div>
                ) : (
                    <div style={{ marginBottom: 16 }}>
                        <Alert severity="info" sx={{ fontSize: '.85rem', mb: 1 }}>
                            Job description added. 
                        </Alert>
                        <div style={{ fontSize: '.85rem', background: '#f7f7f7', borderRadius: 6, padding: 8, marginBottom: 8, textAlign: 'left' }}>
                            {loginQnAJobDesc && loginQnAJobDesc.slice(0, 50)}...
                            <div style={{width: '100%', display: 'flex', justifyContent: 'right', textDecoration: 'underline', color: "#61AFF1" }}>
                                <ButtonThin color="#61AFF1" width="120px" onClick={() => setLoginQnAEditingDesc(true)} style={{ fontSize: '.7rem'}}>
                                    <BiMessageSquareEdit style={{color: "#61AFF1", fontSize: ".8rem"}} />&nbsp;Edit
                                </ButtonThin>
                            </div>
                        </div>
                    </div>
                )}

                {/* QnA List */}
                {loginQnAList.length > 0 && (
                    <div>
                        <h3>answers</h3>
                        <div ref={answersContainerRef} style={{maxHeight: 200, ...styles.resumesCont}}>
                            {loginQnAList.map((qa, idx) => (
                                <div key={idx}>
                                    <div style={{ flex: 1, margin: '10px auto', fontSize: '.8rem'}}>
                                        <span><BsFillPatchQuestionFill style={{color: "black", fontSize: ".8rem"}} /></span> <b>{qa.question}:</b>
                                    </div>

                                    <div style={{textAlign: 'left'}}>
                                        <ButtonTransparentSquare 
                                            type="button" 
                                            onClick={() => handleCopy(qa.answer)}
                                            color=""
                                            width="100%"
                                            bgColor="#f3f0f15c"
                                            borderRadius="10px"
                                        >
                                            <div style={{margin: '10px'}}>
                                                <div style={{width: '100%', textAlign: 'left', fontWeight: '400'}}>{qa.answer}</div>
                                                <div style={{width: '100%', textAlign: 'right'}}>
                                                    <FaCopy onClick={() => handleCopy(qa.answer)} style={{color: "#56A8AC", fontSize: ".8rem"}} />
                                                </div>
                                            </div>

                                        </ButtonTransparentSquare>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* QnA Input */}
                {loginQnAJobDescSaved && !loginQnAEditingDesc && (
                    <div style={{ marginBottom: 16, position: 'relative'}}>
                        <div style={styles.stepContainer}><div style={styles.stepNumber}>Step 3</div> <div>Ask Application Questions</div></div>
                        <AuthInput
                            id="appQuestion"
                            name="appQuestion"
                            value={loginQnAInput}
                            placeholder="Paste a question from the application form or any question you might have."
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
                )}

                <h3>other actions</h3>
                <Box sx={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 1 }}>  
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #3E8F93' 
                            width={'160px'} 
                            height='25px' 
                            color='black'
                            onClick={() => handleGetResumeDirect("loginAlgorithm")}
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
                </Box>

                {/* Done Button */}
                <div style={{ marginTop: 16 }}>
                    <ButtonSubmitGreen onClick={closeModalsAndReset}>
                        Done
                    </ButtonSubmitGreen>
                </div>
            </div>
        </PlainModalOverlay>
    );
});

export default QnAModal;