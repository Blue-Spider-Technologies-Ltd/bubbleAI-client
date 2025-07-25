import React, { useState, useCallback, useEffect } from "react";
import mockCss from "../Mock.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setError, setSuccessMini, setFetching, setExamDetails } from "../../../redux/states";
import {
    errorAnimation,
    successMiniAnimation,
    checkAuthenticatedUser,
    useCountdown
} from "../../../utils/client-functions";
import { ButtonThin, ButtonOutlineGreenWithDiffStyle, ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { TfiWrite } from "react-icons/tfi";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { PlainModalOverlay, Modal } from "../../UI/Modal/Modal";


const ExamStarted = (props) => {
    const { error, successMini, examDetails } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [timeAlloted, setTimeAlloted] = useState(20); //DO NOT INITIALIZE AT ZERO
    const [subject, setSubject] = useState("");
    const [answers, setAnswers] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    //state to track average time per question
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [progressStatus, setProgressStatus] = useState('Submitting...');
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showFailedSubmissionModal, setShowFailedSubmissionModal] = useState(false);

    // const totalQuestions = accounting2020.length;
    const countdown = useCountdown(timeAlloted)
   

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
    
    const handleSubmit = async () => {
        await checkIfAuth();

        const fiftyPercentOfQ =  Math.floor(totalQuestions / 2);
        if (Object.keys(answers).length < fiftyPercentOfQ) {
            errorSetter("Please answer at least 50% of the questions before submitting.");
            return;
        }
        //get event progress
        const eventSource = new EventSource('/user/progress');
        //listen for SSE
        eventSource.onmessage = (event) =>  {
            const progressUpdate = JSON.parse(event.data)
            setProgressPercentage(progressUpdate.percent);
            setProgressStatus(progressUpdate.status)
        };
        // Start submission
        try {
            setLoading(true)
            const examObj = {
                examMeta: examDetails.examMeta,
                questions: questions
            }
            const response = await axios.post("/mock/submit-exam", examObj, {
                headers: {
                    "x-access-token": isAuth,
                },
            });

            if (response.status !== 201 && response.status !== 200) {
                setShowFailedSubmissionModal(true)
                return;
            }
            const gradedExamId = response.data.gradedExamId;
            dispatch(setExamDetails({}))
            // Navigate to the exam started page
            navigate(`/user/dashboard/mock/exam-insight?examId=${gradedExamId}`);
        } catch (error) {
            setShowFailedSubmissionModal(true)
        } finally {
            eventSource.close(); // Close the SSE connection after exam starts
            setLoading(false);
        }
    };

    //use effect to track average time per question
    useEffect(() => {
        setQuestionStartTime(Date.now());
    }, [currentQuestion]);


    useEffect(() => {
        let isMounted = true;
        const initializeExam = async () => {
            dispatch(setFetching(true));
            try {
                await checkIfAuth();
                if (!examDetails || Object.keys(examDetails).length === 0) {
                    errorSetter("No exam found. Redirecting to mock dashboard...");
                    setTimeout(() => {
                        navigate("/user/dashboard/mock");
                    }, 5000);
                    return;
                }
                if (isMounted) {
                    setQuestions(examDetails.questions);
                    setTotalQuestions(examDetails.questions.length);
                    setTimeAlloted(examDetails.examMeta.duration);
                    setSubject(examDetails.examMeta.subject);
                }
            } catch (err) {
                errorSetter("An error occurred while initializing the exam.");
                setTimeout(() => {
                    navigate("/user/dashboard/mock");
                }, 5000);
            } finally {
                if (isMounted) dispatch(setFetching(false));
            }
        };

        initializeExam();
        return () => { isMounted = false; };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (countdown === "00:00" || countdown === "00:00:00") {
            setIsTimeOut(true);
            setTimeout(() => {
                handleSubmit();
            }, 5000);
        }
        // eslint-disable-next-line
    }, [countdown]);

    const handleOptionChange = (qNum, optionIdx) => {
        //time spent on question
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000); // in seconds

        // Update answers state (for quick navigator)
        setAnswers(prev => ({ ...prev, [qNum]: optionIdx }));

        // Update chosen_answer, time_taken, and attempts in questions state
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.question_number === qNum
                    ? {
                        ...q,
                        chosen_answer: q.options[optionIdx],
                        time_taken: timeSpent,
                        attempts: (q.attempts || 0) + 1 // increment attempts or start at 1
                    }
                    : q
            )
        );

        setQuestionStartTime(Date.now());
    };

    const goToQuestion = (idx) => setCurrentQuestion(idx);

    const handlePrev = () => setCurrentQuestion(q => Math.max(0, q - 1));
    const handleNext = () => setCurrentQuestion(q => Math.min(totalQuestions - 1, q + 1));


    return (
        <div className="auth-container">
            <div style={{ width: "100%", padding: "0" }}>
                <div className="auth-bg-blob"></div>
            </div>

            <div className="auth-container-inner">

                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>

                <div className="BodyWrapper">
                    <div className={mockCss.ExamHeader}>
                        <div>
                            <ButtonThin
                                fontSize='.6rem' 
                                border='2px solid #987070' 
                                width={screenWidth > 700 ? '80px' : "30px"} 
                                height={screenWidth > 700 ? '25px' : "30px"} 
                                color='black'
                                // onClick={() => chooseActStr("Cover Letter", job)}
                            >
                                <FaPowerOff style={{fontSize: ".9rem", color: "rgb(216, 7, 7)"}} /> {screenWidth > 700 && <>&nbsp;Abort</>}
                            </ButtonThin>                           
                        </div>
                        <div className={mockCss.ActiveNav}> 
                            <span><TfiWrite className={mockCss.Icon} /></span>
                            {subject || "Mock Exam"}
                        </div>

                        <div>
                            <span><PiClockCountdownFill className={mockCss.Icon} style={{color: 'rgb(216, 7, 7)'}} /></span>
                            {countdown}
                        </div>
                    </div>
                    {questions[currentQuestion] && (
                        <div className={mockCss.QuestionArea}>
                            <h4>
                                <span style={{ color: 'black' }}>
                                    {questions[currentQuestion].question_number}
                                </span> of {totalQuestions}
                            </h4>
                            {questions[currentQuestion].instructions && (
                                <p className={mockCss.QuestionInstructions}>
                                    {questions[currentQuestion].instructions}
                                </p>
                            )}
                            <p className={mockCss.QuestionText}>
                                {questions[currentQuestion].question_text}
                            </p>
                            <div className={mockCss.OptionsList}>
                                {questions[currentQuestion].options.map((opt, idx) => (
                                    <label key={idx} className={mockCss.OptionLabel}>
                                        <input
                                            type="radio"
                                            name={`question_${currentQuestion}`}
                                            checked={answers[questions[currentQuestion].question_number] === idx}
                                            onChange={() => handleOptionChange(questions[currentQuestion].question_number, idx)}
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                            <div className={mockCss.NavButtons}>
                                <button
                                    disabled={currentQuestion === 0}
                                    style={{ marginRight: 8 }}
                                    className={`${mockCss.QuickNavBtn}`}
                                    onClick={handlePrev}
                                >
                                    <GrPrevious />
                                </button>
                                <button
                                    disabled={currentQuestion === totalQuestions - 1}
                                    style={{ marginRight: 8 }}
                                    className={`${mockCss.QuickNavBtn}`}
                                    onClick={handleNext}
                                >
                                    <GrNext />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="Segment">
                        <h4>Quick navigator</h4>
                        <div className={mockCss.QuickNavArea}>
                        {questions.map((q, idx) => {
                            const isAnswered = answers[q.question_number] !== undefined;
                            return (
                            <button
                                key={q.question_number}
                                className={`
                                    ${mockCss.QuickNavBtn}
                                    ${currentQuestion === idx ? mockCss.ActiveQuickNav : ""}
                                    ${isAnswered ? mockCss.QuickNavAnswered : ""}
                                `}
                                onClick={() => goToQuestion(idx)}
                            >
                                {q.question_number}
                                {isAnswered && <span className={mockCss.AnsweredCheck}>✅</span>}
                            </button>
                            );
                        })}
                        </div>

                        <ButtonOutlineGreenWithDiffStyle onClick={() => setReadyToSubmit(true)}>
                            <b>Submit Exam</b>
                        </ButtonOutlineGreenWithDiffStyle>
                    </div>

                </div>
            </div>

       
            {readyToSubmit && (
                <PlainModalOverlay>
                    <div className='prev-page' onClick={() => setReadyToSubmit(false)}>
                        <FaLongArrowAltLeft />
                    </div>
                    <div className={mockCss.modalOverlayContainer}>
                        <h2 className={mockCss.modalOverlayHeader}>
                            Ready to submit?
                        </h2>

                        {/* Confirmation Section */}
                        <div className={mockCss.modalOverlayBody}>
                            {(() => {
                                // Find unanswered questions
                                const unanswered = questions.filter(
                                    q => q.chosen_answer === undefined || q.chosen_answer === ""
                                );
                                if (unanswered.length > 0) {
                                    return (
                                        <>
                                            <div style={{ color: "#d60707", marginBottom: 10 }}>
                                                <b>You have {unanswered.length} unanswered question{unanswered.length > 1 ? "s" : ""}:</b>
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                {unanswered.map(q => (
                                                    <span
                                                        key={q.question_number}
                                                        style={{
                                                            display: "inline-block",
                                                            margin: "2px 6px",
                                                            padding: "3px 8px",
                                                            background: "#fff3cd",
                                                            color: "#856404",
                                                            borderRadius: "12px",
                                                            fontWeight: 600,
                                                            fontSize: "0.95em",
                                                            border: "1px solid #ffeeba"
                                                        }}
                                                    >
                                                        Q{q.question_number}
                                                    </span>
                                                ))}
                                            </div>
                                            <div style={{ margin: "12px 0 0 0", color: "#222" }}>
                                                Are you sure you want to submit your exam with unanswered questions?
                                            </div>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <div style={{ color: "#3E8F93", marginBottom: 10 }}>
                                                <b>All questions answered!</b>
                                            </div>
                                            <div style={{ margin: "12px 0 0 0", color: "#222" }}>
                                                Are you sure you want to submit your exam?
                                            </div>
                                        </>
                                    );
                                }
                            })()}
                        </div>

                        <div className={mockCss.modalOverlayStartBtn}>
                            <ButtonSubmitGreen type="button" onClick={handleSubmit}>
                                <b>Proceed to Submit</b>
                            </ButtonSubmitGreen>
                        </div>
                    </div>
                </PlainModalOverlay>
            )}

            {isTimeOut && (
                <PlainModalOverlay>
                    <div className={mockCss.modalOverlayContainer}>
                        <h2 className={mockCss.modalOverlayHeader} style={{ color: "#d60707" }}>
                            Time's Up!
                        </h2>
                        <div className={mockCss.modalOverlayBody}>
                            <div style={{ marginBottom: 16 }}>
                                Unanswered questions will be submitted as blank.
                            </div>
                            <h6 style={{ color: "#d60707" }}>
                                Submitting in 5 seconds...
                            </h6>
                        </div>
                    </div>
                </PlainModalOverlay>
            )}

            {showFailedSubmissionModal && (
                <PlainModalOverlay>
                    <div className={mockCss.modalOverlayContainer}>
                        <h2 className={mockCss.modalOverlayHeader} style={{ color: "#d60707" }}>
                            Exam Submission Failed!
                        </h2>
                        <div className={mockCss.modalOverlayBody}>
                            <div style={{ marginBottom: 16 }}>
                                Failed to grade exam. We are deeply sorry about this. If issue persist, please chat with us.
                            </div>
                            <div style={{width: "80%", margin: "0 auto"}}>
                                <ButtonSubmitGreen 
                                    type="button" 
                                    onClick={() => {
                                        setShowFailedSubmissionModal(false)
                                        handleSubmit()
                                    }}
                                >
                                    <b>ReTry Submission</b>
                                </ButtonSubmitGreen>
                            </div>
                        </div>
                    </div>
                </PlainModalOverlay>
            )}
            
            {loading && (
                <Modal
                    header4={`PROCESSING... DO NOT RELOAD`}
                    header3={progressStatus}
                    progress={progressPercentage}
                />
            )}
        </div>
    );
};

export default ExamStarted;
