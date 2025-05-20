import React from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonOutlineGreenWithDiffStyle, ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { FaLinkedin } from 'react-icons/fa';
import { GrStatusGood } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Alert from '@mui/material/Alert';

const styles = {
    modalInner: {
        width: '100%',
        textAlign: 'center'
    },
    resumesCont: {
        width: "100%",
        maxHeight: '200px',
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
    eachResume: {
        width: '100%',
        border: '1px dashed black',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '.65rem',
        marginBottom: '5px',
        cursor: 'pointer',
        background: '#fff',
        color: 'black',
        transition: 'all 0.4s ease-out'
    },
    activeResume: {
        color: '#3E8F93',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        border: '1px solid #3E8F93',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '.65rem',
        fontWeight: '500',
        marginBottom: '5px',
        cursor: 'pointer', 
        background: '#e6f7f8',
        transition: 'all 0.4s ease-in-out'
    }
};

const InternalAppJobModal = React.memo(({
    closeModalsAndReset,
    linkedinUrl,
    companyUrl,
    applicants,
    allResumes,
    activeResIndex,
    handleResumeSelect,
    handleInternalJobModalSubmit
}) => {
    return (
        <PlainModalOverlay>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div className='prev-page' onClick={closeModalsAndReset}>
                    <FaLongArrowAltLeft />
                </div>
                <h4 style={{ color: '#3E8F93', marginBottom: 10 }}>Apply for Position</h4>
                {applicants > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, color: 'gray', fontSize: '.85rem' }}>
                        <span style={{ marginRight: 6 }}>Applicants:</span> {applicants}
                    </div>
                )}
                <Alert severity="info" sx={{ mb: 2, fontSize: '.8rem' }}>
                    Choose how you'd like to apply and a related resume. I'll automatically optimize it for this job, auto-answer the application form questions, then let you preview and submit yourself.
                </Alert>
                <div style={{ margin: '15px 0 10px 0', fontWeight: 600 }}>Select Resume</div>
                <div style={styles.resumesCont}>
                    {allResumes && allResumes.length > 0 && allResumes.map((resume, idx) => (
                        <div
                            key={idx}
                            style={activeResIndex === idx + 1 ? styles.activeResume : styles.eachResume}
                            onClick={() => handleResumeSelect(idx)}
                        >
                            <div>{resume?.storageDetails?.name}</div>
                            {activeResIndex === (idx + 1) && <div><GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /></div>}
                        </div>
                    ))}
                </div>
                <div style={{ margin: '20px 0 10px 0', fontWeight: 600 }}>Application Methods</div>
                {linkedinUrl && (
                    <ButtonOutlineGreenWithDiffStyle
                        onClick={() => handleInternalJobModalSubmit('linkedin')}
                    >
                        <FaLinkedin style={{ fontSize: '1.2rem' }} /> Apply via LinkedIn
                    </ButtonOutlineGreenWithDiffStyle>
                )}
                <p></p>
                {companyUrl && (
                    <ButtonSubmitGreen
                        style={{ marginBottom: 10, width: '100%', maxWidth: 300, background: '#3E8F93' }}
                        onClick={() => handleInternalJobModalSubmit('company-site')}
                    >
                        Apply via Company Website
                    </ButtonSubmitGreen>
                )}
                {!linkedinUrl && !companyUrl && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        No direct application methods available for this position.
                    </Alert>
                )}
            </div>
        </PlainModalOverlay>
    );
});

export default InternalAppJobModal;