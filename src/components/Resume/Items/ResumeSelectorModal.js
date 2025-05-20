import React from "react";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
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

const ResumeSelectorModal = React.memo(({
    closeModalsAndReset,
    allResumes,
    activeResIndex,
    handleResumeSelect,
    actionString,
    handleGenerate
}) => {
    return (
        <PlainModalOverlay>
            <div style={styles.modalInner}>
                <div className='prev-page' onClick={closeModalsAndReset}>
                    <FaLongArrowAltLeft />
                </div>
                <h4>Choose a resume for me to optimize your {actionString}, together with this job's real data.</h4>
                <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Using the "Get Resume" button on each job to optimize your resume per-job gives your application materials more relevance and hence, gives you a surer chance.</Alert>

                <div style={styles.resumesCont}>
                    {allResumes.length > 0 && (
                        allResumes.map((resume, index) => {
                            return (
                                <div key={index} style={activeResIndex === index + 1 ? styles.activeResume : styles.eachResume} onClick={() => handleResumeSelect(index)}>
                                    <div>{resume?.storageDetails?.name}</div> {activeResIndex === index + 1 && <div><GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /> </div>}
                                </div>
                            )
                        })
                    )}
                </div>

                <div style={{width: '100%'}}>
                    <ButtonSubmitGreen onClick={handleGenerate} >Get {actionString}</ButtonSubmitGreen>
                </div>

            </div>
        </PlainModalOverlay>
    );
});

export default ResumeSelectorModal;