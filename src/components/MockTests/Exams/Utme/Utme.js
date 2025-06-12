import React, { useState, useCallback, useEffect } from "react";
import mockCss from "../../Mock.module.css"
import axios from "axios";
import { UtmeSubjects } from './subjects'
import Alert from '@mui/material/Alert';
import AuthHeader from "../../../UI/AuthHeader/AuthHeader";
import AuthInput from '../../../UI/Input/AuthInputs';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ButtonThin, ButtonTransparentSquare } from "../../../UI/Buttons/Buttons";
import { Oval } from 'react-loader-spinner'
import { GrSend } from "react-icons/gr";
import { setError, setSuccessMini, setFetching } from "../../../../redux/states";
import { 
    errorAnimation,
    successMiniAnimation,
    checkAuthenticatedUser
} from "../../../../utils/client-functions";



const Utme = (props) => {
    const { 
        error,
        successMini
    } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authMenuOpen, setAuthMenuOpen] = useState(false);

    const [chosenSubjectsLoading, setChosenSubjectsLoading] = useState(false);
    const [chosenSubjects, setChosenSubjects] = useState([]);
    const [subjects, setSubjects] = useState(UtmeSubjects);
    const [courseOfStudy, setCourseOfStudy] = useState("");

    const screenWidth = window.innerWidth;
    const isAuth = localStorage?.getItem("token");

    const errorSetter = useCallback((string) => {
        dispatch(setError(string));
        errorAnimation();
    }, [dispatch]);

    const successSetter = useCallback((string) => {
        dispatch(setSuccessMini(string));
        successMiniAnimation();
    }, [dispatch]);

    const checkIfAuth = async () => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?mock");      
        }
    }

    const handleGetCourseSubjects = async () => {
        checkIfAuth();
        if (courseOfStudy.trim() === "") {
            errorSetter("Please enter your course of study");
            return;
        }
        
        setChosenSubjectsLoading(true);

        const data = {
            courseOfStudy,
            subjects
        }
        try {
            
            let response = await axios.post("/mock/get-utme-course-subjects", data, {
                headers: {
                    "x-access-token": isAuth,
                },
            });

            console.log(response)
            setChosenSubjects(response.data.answer?.subjectsForCourse);
            if (response.data.answer.isValidCourseOfStudy) {
                successSetter("Subjects fetched successfully");
            } else {
                errorSetter("Invalid course of study. Please try again with a valid one.");
            }
            

        } catch (error) {
            console.error("Error fetching course subjects:", error);
            errorSetter("Failed to fetch course subjects. Please try again.");
            
        }
        setChosenSubjectsLoading(false);
    }

    const handleKeyDown = e => {
        if (screenWidth > 900) {
            if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault();
                handleGetCourseSubjects();
            }
        }
    }

    const handleCourseOfStudyChange = (e) => {
        if (e.target.value.length > 100) {
            let newValue = e.target.value.slice(0, 100);
            setCourseOfStudy(newValue);
            errorSetter("Course of study must not be more than 100 characters");
            return;
        }
        setCourseOfStudy(e.target.value);
    };

    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen);
    };
    return (
        <div className="auth-container">
            <div style={{ width: "100%", padding: "0" }}>
                <div className="auth-bg-blob"></div>
            </div>

            <div className="auth-container-inner">

                <AuthHeader
                    authMenuOpen={authMenuOpen}
                    onClick={toggleResumes}
                    headerText="UTME MOCK"
                />

                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>

                <div className="BodyWrapper">
                    <div className="BuildNavigator">
                        <div className="ActiveNav">
                            <span>1</span>Exam Rules
                        </div>
                        <div onClick={() => navigate("/user/dashboard/mock/utme?simulate")}>
                            <span>2</span>Simulation
                        </div>
                        <div onClick={() => navigate("/user/dashboard/mock/utme?insights")}>
                            <span>3</span>Insights & Tutor
                        </div>
                    </div>

                    <div style={{padding: '20px 5px'}}>
                        <div className='explanation-points'>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Kindly have a pencil and a blank paper for each session</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">All Mock Exams are <b>TIME-BASED</b> and <b>CLOSES AUTOMATICALLY</b> after time elapses</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Avoid distractions by finding a quiet place, preferably an empty room</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Avoid using help as this will affect how well I can assess your skills and assist you succeed</Alert>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">You will be graded and <b>tutored in identified weak areas</b> + a <b>personalized study plan</b> afterwards</Alert>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <h4>Get UTME Subjects</h4>
                            <div style={{width: screenWidth < 900 ? '100%' : '50%', margin: '0 auto', position: 'relative'}}>
                                <AuthInput
                                    id="courseOfStudy"
                                    name="courseOfStudy"
                                    value={courseOfStudy}
                                    placeholder="Tell me your chosen course to get the right UTME subjects."
                                    inputGridSm={12}
                                    multiline={true}
                                    buttonInInput={true}
                                    rows={2}
                                    maxRows={2}
                                    mt={1}
                                    mb={1}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleCourseOfStudyChange}
                                />
                                <div style={{ position: 'absolute', top: '.5rem', right: '18px', zIndex: 1 }}>
                                    <ButtonTransparentSquare 
                                        type="button" 
                                        onClick={handleGetCourseSubjects}
                                        color=""
                                        width="35px"
                                        height="35px"
                                        bgColor="black"
                                        borderRadius="50%"
                                    >
                                        {chosenSubjectsLoading ? (
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

                        </div>

                        {chosenSubjects.length > 0 ? (
                            <div>
                                <h4>Select a Subject to Start</h4>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap' }}>
                                    {chosenSubjects.length > 0 && chosenSubjects.map((subject, index) => (
                                        <div key={index} style={{marginBottom: "10px", maxWidth: "12rem", minWidth: "10rem"}}>
                                            <ButtonThin
                                                fontSize='.8rem' 
                                                border='1px solid #E5E5EA' 
                                                width={'100%'} 
                                                height='40px' 
                                                color='black'
                                                // onClick={() => getJob(job?.url || job.company_object.linkedin_url, job?.external_url || job.final_url, job?.applicants_count, job)}
                                            >
                                                {subject.subject}
                                            </ButtonThin>
                                        </div>
                                    ))}
                                </div>
                                
                                {chosenSubjects.length === 4 && (
                                    <div style={{ padding: '8px', width: '100%', textAlign: 'right' }}>
                                        <span onClick={() => setChosenSubjects(UtmeSubjects)} style={{color: '#5fbec5', cursor: 'pointer', fontSize: '12px', textDecoration: 'none', fontWeight: 'bold'}}>View All UTME Subjects →</span>
                                    </div>
                                )}
                            </div>) : null
                        }

                    </div>

                </div>


            </div>
       </div>
    );
};

export default Utme;
