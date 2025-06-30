import React, { useState, useCallback, useEffect } from "react";
import mockCss from "../../Mock.module.css";
import axios from "axios";
import { UtmeSubjects } from './subjects';
import AuthHeader from "../../../UI/AuthHeader/AuthHeader";
import AuthInput from '../../../UI/Input/AuthInputs';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ButtonThin, ButtonTransparentSquare, ButtonSubmitGreen } from "../../../UI/Buttons/Buttons";
import { PlainModalOverlay } from "../../../UI/Modal/Modal";
import { Oval } from 'react-loader-spinner';
import { GrSend } from "react-icons/gr";
import { LiaSchoolSolid } from "react-icons/lia";
import { GiTimeBomb } from "react-icons/gi";
import { LuInfo } from "react-icons/lu";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { setError, setSuccessMini, setFetching } from "../../../../redux/states";
import {
    errorAnimation,
    successMiniAnimation,
    checkAuthenticatedUser,
    formatTime
} from "../../../../utils/client-functions";

const Utme = (props) => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [chosenSubjectsLoading, setChosenSubjectsLoading] = useState(false);
    const [chosenSubjects, setChosenSubjects] = useState([]);
    const [subjects, setSubjects] = useState(UtmeSubjects);
    const [subject, setSubject] = useState({});
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
            await checkAuthenticatedUser();
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?mock");
        }
    };

    const closeModalsAndReset = () => {
        setSubject({});
    };

    const handleGetCourseSubjects = async () => {
        await checkIfAuth();

        if (courseOfStudy.trim() === "") {
            errorSetter("Please enter your course of study");
            return;
        }

        setChosenSubjectsLoading(true);

        const data = {
            courseOfStudy,
            subjects
        };

        try {
            const response = await axios.post("/mock/get-utme-course-subjects", data, {
                headers: {
                    "x-access-token": isAuth,
                },
            });

            setChosenSubjects(response.data.answer?.subjectsForCourse);
            if (response.data.answer?.isValidCourseOfStudy) {
                successSetter("Subjects fetched successfully");
            } else {
                errorSetter("Invalid course of study. Please try again with a valid one.");
            }
        } catch (error) {
            console.error("Error fetching course subjects:", error);
            errorSetter("Failed to fetch course subjects. Please try again.");
        }

        setChosenSubjectsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (screenWidth > 900) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGetCourseSubjects();
            }
        }
    };

    const handleCourseOfStudyChange = (e) => {
        if (e.target.value.length > 100) {
            const newValue = e.target.value.slice(0, 100);
            setCourseOfStudy(newValue);
            errorSetter("Course of study must not be more than 100 characters");
            return;
        }
        setCourseOfStudy(e.target.value);
    };

    const toggleAuthMenu = () => {
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
                    onClick={toggleAuthMenu}
                    headerText="UTME MOCK"
                />

                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>

                <div className="BodyWrapper">
                    <div className="BuildNavigator">
                        <div className="ActiveNav">
                            <span>1</span>Exam Rules
                        </div>
                        <div onClick={() => navigate("/user/dashboard/mock/utme?simulate")}> <span>2</span>Simulation </div>
                        <div onClick={() => navigate("/user/dashboard/mock/utme?insights")}> <span>3</span>Insights & Tutor </div>
                    </div>

                    <div style={{ padding: '20px 5px' }}>

                        <div style={{ marginBottom: 16 }}>
                            <h4>Get UTME Subjects</h4>
                            <div style={{ width: screenWidth < 900 ? '100%' : '50%', margin: '0 auto', position: 'relative' }}>
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
                                                height={20}
                                                width={20}
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

                        {chosenSubjects.length > 0 && (
                            <div>
                                <h4>Select a Subject to Start</h4>

                                <div style={{ display: 'flex', justifyContent: 'space-around', paddingLeft: 1, paddingBottom: 1, flexWrap: 'wrap' }}>
                                    {chosenSubjects.map((subject, index) => (
                                        <div key={index} style={{ marginBottom: "10px", maxWidth: "12rem", minWidth: "10rem" }}>
                                            <ButtonThin
                                                fontSize='.8rem'
                                                border='1px solid #E5E5EA'
                                                width={'100%'}
                                                height='40px'
                                                color='black'
                                                onClick={() => setSubject(subject)}
                                            >
                                                {subject.subject}
                                            </ButtonThin>
                                        </div>
                                    ))}
                                </div>

                                {chosenSubjects.length === 4 && (
                                    <div style={{ padding: '8px', width: '100%', textAlign: 'right' }}>
                                        <span
                                            onClick={() => setChosenSubjects(UtmeSubjects)}
                                            style={{ color: '#5fbec5', cursor: 'pointer', fontSize: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                                            View All UTME Subjects →
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        {Object.keys(subject).length >= 1 && (
            <PlainModalOverlay>
                <div className='prev-page' onClick={closeModalsAndReset}>
                    <FaLongArrowAltLeft />
                </div>
                <div className={mockCss.modalOverlayContainer}>
                    <h2 className={mockCss.modalOverlayHeader}>
                        Mock Exam Rules
                    </h2>
                    <div className={mockCss.modalOverlaySub}>
                        <span>
                            Unified Tertiary Matriculation Exam
                        </span>
                    </div>
                    <div className={mockCss.modalOverlayCard}>
                        <div className={mockCss.modalOverlaySubjectRow}>
                            <LiaSchoolSolid style={{ color: '#3E8F93', fontSize: '1.5rem' }} />
                            <span style={{ fontWeight: 600, fontSize: '1rem', color: '#222' }}>{subject?.subject}</span>
                        </div>
                        <div className={mockCss.modalOverlaySubjectRow}>
                            <GiTimeBomb style={{ color: '#3E8F93', fontSize: '1.5rem' }} />
                            <span style={{ fontWeight: 600, fontSize: '1rem', color: '#222' }}>{formatTime(subject?.timeAlloted)}</span>
                        </div>
                        <div className={mockCss.modalOverlaySubjectRow}>
                            <LuInfo style={{ color: '#3E8F93', fontSize: '1.4rem' }} />
                            <span style={{ fontSize: '.85rem', color: '#444', textAlign: 'left', width: '90%' }}>{subject?.description}</span>
                        </div>
                    </div>
                    <ul className={mockCss.modalOverlayList}>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>📝</span>
                            Have a pencil and blank paper ready for each session
                        </li>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>⏰</span>
                            All exams use real past questions, are time-based and will auto-close when time elapses
                        </li>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>🔕</span>
                            Find a quiet, distraction-free place to take your exam
                        </li>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>🚫</span>
                            Do not use external help—this affects your assessment and personalized plan
                        </li>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>📈</span>
                            Bubble Ai will grade, tutor you in weak areas, and curate a personalized study plan to help you focus only on what matters
                        </li>
                        <li className={mockCss.modalOverlayListItem}>
                            <span style={{ fontSize: '1.2rem' }}>🧘🏾‍♀️</span>
                            Finally, always BREATHE
                        </li>
                    </ul>
                    <div className={mockCss.modalOverlayStartBtn}>
                        <ButtonSubmitGreen type="button" onClick={() => {/* TODO: Start exam logic */}}>
                            Start Exam
                        </ButtonSubmitGreen>
                    </div>
                </div>
            </PlainModalOverlay>
        )}
        </div>
    );
};

export default Utme;
