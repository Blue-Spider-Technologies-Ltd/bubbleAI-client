import React, { useCallback, memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IoSparklesSharp } from "react-icons/io5";
import { VscChecklist } from "react-icons/vsc";
import { FaSuitcase } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdMarkEmailRead } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { SiAnswer } from "react-icons/si";
import { ButtonThin } from "../../UI/Buttons/Buttons";
import { setError } from "../../../redux/states";
import { errorAnimation } from "../../../utils/client-functions";

const screenWidth = window.innerWidth;

const styles = {
    card: { 
        backgroundColor: '#c0d1d457',
        borderRadius: '20px',
        color: 'black',
        display: 'flex', 
        maxHeight: '500px',
        width: screenWidth < 900 ? '100%' : '90%',
        overflow: 'hidden',
        transition: 'all 3s ease-in-out',
    },
    cardLarge: { 
        backgroundColor: '#c0d1d457',
        borderRadius: '20px',
        color: 'black',
        display: 'flex', 
        maxHeight: 'none',
        width: screenWidth < 900 ? '100%' : '90%',
        overflow: 'visible',
        transition: 'all 3s ease-in-out',
    },
    img: {
        borderRadius: '50%',
        margin: '20px',
        maxWidth: '60px',
        maxHeight: '60px'
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
    desc: {
        fontSize: '.74rem',
        padding: '10px 0'
    },
};

const JobCard = memo(({
    job,
    img,
    index,
    activeIndex,
    setActiveIndex,
    app,
    expandedAppIndex,
    setExpandedAppIndex,
    handleCopy,
    getJob,
    getResume,
    chooseActStr,
    deleteJob,
    isResumeSubbed
}) => {
    const { 
        resumeSubDuration
    } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();

    const errorSetter = (string) => {
        dispatch(setError(string));
        errorAnimation();
    }

    const isApplied = app && app.status === 'completed';
    const handleMessageCompany = () => {
        if (isResumeSubbed && resumeSubDuration === "Per Month") {
            window.open(job.company_url || job.company_object?.linkedinurl, '_blank', 'noopener,noreferrer');
        } else {
            errorSetter("PER MONTH users only, redirecting to pricing.");
            setTimeout(() => {
                window.open('/pricing', '_blank', 'noopener,noreferrer');
            }, 5000);  
        }
    }

    return (
        <Card sx={activeIndex !== index + 1 ? styles.card : styles.cardLarge}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={styles.img}
                        image={job.company_object?.logo || img}
                        alt="Avatar"
                    />

                    <div style={{width: '90%'}}>
                        <Typography component="div" variant="h5">
                            {job.title || job.job_title}
                        </Typography>
                        <div style={styles.link} >
                            <div>
                                <ul>
                                    <li>
                                        <span 
                                            className="link"
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleMessageCompany}
                                            aria-label={`Message ${job?.company_name || job?.company_object?.name}`}
                                        >
                                           Message Recruiter - {isResumeSubbed ? job?.company_name || job?.company_object?.name : '(Paid Users Only)'} &nbsp;<SiAnswer style={{ fontSize: ".9rem", color: "#987070" }} />
                                        </span>
                                    </li>
                                    <li>
                                        <span style={styles.key}>Job Type - </span> 
                                        <span>{job?.remote === true ? "Remote" : job?.employment_type || "See Application Page"}</span>
                                    </li>
                                    <li>
                                        <span style={styles.key}>Location - </span> 
                                        <span>{job?.location || "Remote"}</span>
                                    </li>
                                    <li>
                                        <span style={styles.key}>Salary - </span> 
                                        <span>{job?.salary || job.salary_string || "Undisclosed"}</span>
                                    </li>
                                    <li>
                                        <span style={styles.key}>Experience - </span> 
                                        <span>{job?.seniority || "N/A"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <div style={{ margin: '20px', marginTop: '-20px' }}>
                    <h4 style={{ margin: '0' }}>Description</h4>
                    <div style={styles.desc}>
                        {activeIndex !== index + 1 
                            ? <>
                                {job.description.slice(0, 200)}... <span onClick={() => setActiveIndex(index + 1)} style={{ cursor: 'pointer', color: '#3E8F93' }}>see more</span>
                            </>
                            : <> {job.description} <span onClick={() => setActiveIndex(null)} style={{ cursor: 'pointer', color: '#3E8F93' }}>...see less</span></>}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 20px 8px 20px' }}>
                    {isApplied && (
                        <span style={{ color: '#3E8F93', fontWeight: 600, fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <GrStatusGood style={{ color: '#3E8F93', fontSize: '1.1rem' }} /> Applied
                            <ButtonThin style={{ fontSize: '.8rem', marginLeft: 8 }} onClick={() => setExpandedAppIndex(expandedAppIndex === index ? index : null)}>
                                {expandedAppIndex === index ? 'Hide Details' : 'Show Details'}
                            </ButtonThin>
                        </span>
                    )}
                </div>
                {expandedAppIndex === index && (
                    <div style={{ background: '#f7f7f7', borderRadius: 8, padding: 12, margin: '0 20px 12px 20px', fontSize: '.92rem' }}>
                        <div><b>Application Method:</b> {app.applicationMethod}</div>
                        <div><b>Status:</b> {app.status}</div>
                        {app.resumeUsed && <div><b>Resume Used:</b> {app.resumeUsed}</div>}
                        {app.qaPairs && app.qaPairs.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                                <b>Q/A Pairs:</b>
                                <ul style={{ paddingLeft: 18 }}>
                                    {app.qaPairs.map((qa, i) => (
                                        <li key={i} style={{ marginBottom: 4 }}>
                                            <b>Q:</b> {qa.question}<br /><b>A:</b> {qa.answer}
                                            <ButtonThin style={{ marginLeft: 8, fontSize: '.8rem', padding: '2px 8px' }} onClick={() => handleCopy(qa.answer)}>Copy</ButtonThin>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div style={{ marginTop: 8 }}>
                            <ButtonThin onClick={() => setExpandedAppIndex(null)}>Close</ButtonThin>
                        </div>
                    </div>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap' }}>
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #F8E231' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={() => getJob(job?.url || job.company_object.linkedin_url, job?.external_url || job.final_url, job?.applicants_count, job)}
                        >
                            <IoSparklesSharp style={{color: "#F8E231", fontSize: ".9rem"}} />&nbsp;&nbsp; Get This Job 
                        </ButtonThin>
                    </div>
                    
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #3E8F93' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={() => getResume(job?.description, job?.title || job.job_title)}
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
                            onClick={() => chooseActStr("Cover Letter", job)}
                        >
                            <SlEnvolopeLetter style={{color: "#987070", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Cover Ltr
                        </ButtonThin>
                    </div>

                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid #68A7AD' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={() => chooseActStr("Email", job)}
                        >
                            <MdMarkEmailRead style={{color: "#68A7AD", fontSize: ".9rem"}} />&nbsp;&nbsp; Email Follow-up
                        </ButtonThin>
                    </div>
                    
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid black' 
                            width={'110px'} 
                            height='25px' 
                            color='black'
                            onClick={() => chooseActStr("Interview", job)}
                        >
                            <VscChecklist style={{color: "black", fontSize: ".9rem"}} />&nbsp;&nbsp; Interview Prep
                        </ButtonThin>
                    </div>
                    
                    <div style={{marginBottom: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='2px solid rgba(158, 9, 9, 0.733)' 
                            width={'110px'} 
                            height='25px' 
                            color='rgba(158, 9, 9, 0.733)'
                            onClick={() => deleteJob(job?.id, job.title || job.job_title)}
                        >
                            <IoMdRemoveCircle style={{color: "rgba(158, 9, 9, 0.733)", fontSize: ".9rem"}} />&nbsp;&nbsp; Delete
                        </ButtonThin>
                    </div>

                </Box>
            </Box>

        </Card>
    );
});

export default JobCard;