import React, { useEffect, useRef } from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparentSquare } from "../../UI/Buttons/Buttons";
import AuthInput from '../../UI/Input/AuthInputs';
import { FaCopy } from "react-icons/fa6";
import { TfiNewWindow } from "react-icons/tfi";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { SiAnswer } from "react-icons/si";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaSuitcase } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

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
    // Scroll to bottom whenever fieldAnswers changes
    useEffect(() => {
        if (answersContainerRef.current) {
            answersContainerRef.current.scrollTop = answersContainerRef.current.scrollHeight;
        }
    }, [loginQnAList]);
    return (
        <PlainModalOverlay>
            <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', background: '#fff', borderRadius: 12, padding: 24 }}>
                <Alert severity="warning" sx={{ mb: 2, fontSize: '.9rem', textAlign: 'left' }}>
                    This job requires login. Bubble Ai does not handle login yet.<br/>
                    <br/>
                    <b>But not to worry! Ask me application questions below and I'll answer.</b>
                </Alert>
                {/* Open Job Page Button */}
                <div style={{marginBottom: "15px", width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ButtonThin
                        fontSize='.8rem' 
                        border='2px solid #F8E231' 
                        width={'100%'} 
                        height='30px' 
                        color='black'
                        onClick={() => window.open(externalJobUrl || linkedinUrl, '_blank', 'noopener,noreferrer')}
                    >
                        <TfiNewWindow style={{color: "black", fontSize: ".9rem"}} />&nbsp;&nbsp; Open Application Page
                    </ButtonThin>
                </div>
                {/* Job Description Paste/Edit */}
                {!loginQnAJobDescSaved || loginQnAEditingDesc ? (
                    <div style={{ marginBottom: 16 }}>
                        <AuthInput
                            id="jobDescription"
                            name="jobDescription"
                            value={loginQnAJobDesc}
                            placeholder="Paste full job description from application page and click add..."
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
                                    setLoginQnAJobDescSaved(true);
                                    setLoginQnAEditingDesc(false);
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
                            {loginQnAJobDesc.slice(0, 100)}...
                            <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                                <ButtonThin width="120px" onClick={() => setLoginQnAEditingDesc(true)} style={{ fontSize: '.7rem'}}>
                                    <BiMessageSquareEdit style={{color: "black", fontSize: ".8rem"}} />&nbsp;Edit
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
                    <div style={{ marginBottom: 16 }}>
                        <AuthInput
                            id="appQuestion"
                            name="appQuestion"
                            value={loginQnAInput}
                            placeholder="Paste a question from the application form..."
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
                )}

                <h3>other actions</h3>
                <Box sx={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap', backgroundColor: '#f7f7f7', borderRadius: 8, padding: 1 }}>  
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #3E8F93' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={() => handleGetResumeDirect("loginAlgorithm")}
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