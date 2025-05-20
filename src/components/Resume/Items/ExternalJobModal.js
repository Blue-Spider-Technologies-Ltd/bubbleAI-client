import React from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import AuthInput from '../../UI/Input/AuthInputs';
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

const ExternalJobModal = React.memo(({
    closeModalsAndReset,
    externalJobUrl,
    handleExternalJobUrlChange,
    allResumes,
    activeResIndex,
    handleResumeSelect,
    handleExternalModalSubmit
}) => {
    return (

        <PlainModalOverlay>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div className='prev-page' onClick={closeModalsAndReset}>
                    <FaLongArrowAltLeft />
                </div>
                <h4 style={{ color: '#3E8F93', marginBottom: 10 }}>Auto-Apply to an External Job</h4>
                <Alert sx={{padding: '0 5px', fontSize: '.8rem', marginBottom: 2}} severity="info">Find a job somewhere and need assistance with application? Paste the <b>application overview or form page's full link</b>, select your best related resume, I'll automatically optimize it for the application, auto-answer the application questions, then let you preview and submit it yourself.</Alert>
                <AuthInput
                    id="externalJobUrl"
                    name="externalJobUrl"
                    value={externalJobUrl}
                    label="Paste job URL here..."
                    inputType="text"
                    inputGridSm={12}
                    onChange={handleExternalJobUrlChange}
                    required
                    mb={2}
                />
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
                <div style={{ width: '100%', marginTop: 20 }}>
                    <ButtonSubmitGreen onClick={handleExternalModalSubmit} style={{ width: '100%', maxWidth: 300, background: '#3E8F93' }}>
                        Auto-Apply External Job
                    </ButtonSubmitGreen>
                </div>
            </div>
        </PlainModalOverlay>
    );
});

export default ExternalJobModal;