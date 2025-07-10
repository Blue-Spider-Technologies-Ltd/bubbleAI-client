import React, { useState, useCallback, useEffect } from "react";
import mockCss from "../Mock.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setError, setSuccessMini, setFetching } from "../../../redux/states";
import {
    errorAnimation,
    successMiniAnimation,
    checkAuthenticatedUser,
    useCountdown
} from "../../../utils/client-functions";
import { ButtonThin, ButtonTransparentSquare, ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { TfiWrite } from "react-icons/tfi";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

// const accounting2020 = [
//     {
//         question_number: 1,
//         question_text: "The formula for calculating depreciation using straight line method is",
//         options: [
//             "A. (Scrape Value + Sales) / Useful life",
//             "B. (Cost - Scrape Value) / Useful life",
//             "C. (Sales - Scrape Value) / Useful life",
//             "D. (Purchases + Sales) / Useful life"
//         ]
//     },
//     {
//         question_number: 2,
//         question_text: "Petty cash book records transactions on",
//         options: [
//             "A. the debit side only",
//             "B. the credit side only",
//             "C. both credit and debit sides",
//             "D. reversed entry"
//         ]
//     },
//     {
//         "question_number": 3,
//         "question_text": "When a bill is negotiated to a bank, it is said be?",
//         "options": [
//             "A. surrendered",
//             "B. cashed",
//             "C. discounted",
//             "D. accepted"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 4,
//         "question_text": "The main difference between the ordinary and preference shareholders is that?",
//         "options": [
//             "A. the former receive dividends while the latter do not",
//             "B. the latter are not members of the company while the former are",
//             "C. in the case of winding up, the former are paid first before the latter",
//             "D. the former have voting rights while the latter do not"
//         ],
//         "correct_answer": "D"
//     },
//     {
//         "question_number": 5,
//         "question_text": "Given an incomplete record without sufficient information to determine profit, the necessary thing to do is to?",
//         "options": [
//             "A. draw up the statement of affairs",
//             "B. draw up a T-account to establish the amount",
//             "C. compare the journal entries with the cash book",
//             "D. cross-check the cash book for further information"
//         ],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 6,
//         "question_text": "keeping records under the single entry system has the advantage of?",
//         "options": [
//             "A. quality in terms of records",
//             "B. completeness in terms of records",
//             "C. accuracy in terms of operation",
//             "D. simplicity in terms of operation"
//         ],
//         "correct_answer": "D"
//     },
//     {
//         "question_number": 7,
//         "question_text": "Which of the following branches of accounting was first developed?",
//         "options": [
//             "A. Cost accounting",
//             "B. Financial acounting",
//             "C. Management accounting",
//             "D. Petroleum accounting"
//         ],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 8,
//         "question_text": "The process of bookkeeping includes records produced from?",
//         "options": [
//             "A. ledgers",
//             "B. source documents",
//             "C. minutes of meeting",
//             "D. imtuitive reasoning"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 9,
//         "question_text": "The purchase ledger control account of a company had an opening balance of N45,600 credit and closing balance of N72,600 credit. The company made payments of 437,000 to credit suppliers during the period: and had discount received of N18,600 on this account. What were the credit purchase for the period?",
//         "options": [
//             "A. N509,600",
//             "B. N482,600",
//             "C. N428,600",
//             "D. N418,400"
//         ],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 10,
//         "question_text": "Which of the following accounting records are source documents?",
//         "options": [
//             "A. Journal and ledgers",
//             "B. Sales invoice and cash book",
//             "C. Cash book and debit note",
//             "D. sales invoice and debit note"
//         ],
//         "correct_answer": "D"
//     },
//     {
//         "question_number": 11,
//         "question_text": "Accounting information is used by investors and creditors of a company to predict",
//         "options": [
//             "A. future cash flows of the company",
//             "B. future tax payments of the company",
//             "C. potential merger candidates for the company",
//             "D. appropriate remunerations for the company's staff"
//         ],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 12,
//         "question_text": "The receipt from a special tax levy to pay maturing interest obligation are recorded in",
//         "options": [
//             "A. capital fund project",
//             "B. Debt Service Fund",
//             "C. Tax Assessment Fund",
//             "D. Special Revenue Fund"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 13,
//         "question_text": "The principle use of control accounts is to",
//         "options": [
//             "A. localize error within the ledger",
//             "B. prevent fraud",
//             "C. increase sales",
//             "D. record assets and liabilities"
//         ],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 14,
//         "question_text": "The acid test ratio in the company is",
//         "options": [
//             "A. 1:1",
//             "B. 1:2",
//             "C. 2:3",
//             "D. 3:2"
//         ],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 15,
//         "question_text": "The interest on Keme's drawings is calculated as?",
//         "options": [
//             "A. N200",
//             "B. N150",
//             "C. N300",
//             "D. N100"
//         ],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 16,
//         "question_text": "Which of the following is a signatory to federal government account?",
//         "options": [
//             "A. Auditor‑General",
//             "B. Governor of Central Bank",
//             "C. Accountant‑General",
//             "D. President"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 17,
//         "question_text": "An instrument which allows public officers to increase expenditure within a year is",
//         "options": [
//             "A. statutory allocation",
//             "B. supplementary budget",
//             "C. virement",
//             "D. warrant"
//         ],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 18,
//         "question_text": "The debenture issued at par above the nominal value is said to be issued at a",
//         "options": [
//             "A. cost price",
//             "B. mark‑up",
//             "C. premium",
//             "D. margin"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 19,
//         "question_text": "Which of the following methods of invoicing goods to branches facilitate easy checks on the activities of branches?",
//         "options": [
//             "A. cost price",
//             "B. fixed percentage on cost",
//             "C. selling price",
//             "D. invoice price"
//         ],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 20,
//         "question_text": "The correct posting in a double entry system of account when there is an increase in double assets, expenses, capital or liabilities is to debit",
//         "options": [
//             "A. capital and debit liabilities",
//             "B. liabilities and credit assets",
//             "C. assets and credit capital",
//             "D. capital and credit assets"
//         ],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 21,
//         "question_text": "The market value of goods produced is?",
//         "options": ["A. N30,500", "B. N30,600", "C. N31,600", "D. N31,620"],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 22,
//         "question_text": "The expenses incurred in promoting a company are?",
//         "options": ["A. promoters' expenses", "B. floating expenses", "C. preliminary expenses", "D. the borad's expenses"],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 23,
//         "question_text": "After receiving the financial statement the Auditor General of the Federation must submit a report to the National Assembly within?",
//         "options": ["A. 60 days", "B. 30 days", "C. 120 days", "D. 90 days"],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 24,
//         "question_text": "Use the information below to answer questions.  On January 1/2005, a machine was bought for N56,000 to last for five years with a residual value of N1000.  the rate of the yearly depreciation expense would be?",
//         "options": ["A. 50%", "B. 40%", "C. 30%", "D. 20%"],
//         "correct_answer": "D"
//     },
//     {
//         "question_number": 25,
//         "question_text": "Given:   I. Settlement of debts   II. Cessation of business  III. Introduction of assets   IV. Disposal of assets   Which of these constitutes dissolution of partnership?",
//         "options": ["A. II and IV only", "B. I,II and IV only", "C. I,II and III only", "D. II,III and IV only"],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 26,
//         "question_text": "The accounting entries for goods stolen in branch will be to debit",
//         "options": ["A. profit and loss account and credit branch stock account", "B. branch stock account and credit branch adjustment account", "C. branch adjustment account and credit profit and loss account", "D. branch adjustment account and credit branch stock account"],
//         "correct_answer": "A"
//     },
//     {
//         "question_number": 27,
//         "question_text": "The two legally recognized professional accounting bodies in Nigeria are the?",
//         "options": ["A. Institute of Certified Public Accountants of Nigeria and the Institute of cost and Management Accountants of Nigeria", "B. Association of Accountants of Nigeria and the Institute of Management Accountants of Nigeria", "C. Institute of Chartered Accountants of Nigeria and the Association of National Accountants of Nigeria", "D. Nigeria Accounting Association and the Excutive Cost and Management Accounts of Nigeria"],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 28,
//         "question_text": "Use the information to answer this question.  ..............ZEBRA PLC..............  .............Balance sheet as at 31st March, 2002  ...............N...............N............N......  Capital......100,000...Fixed assets:  Current................Land &..................  Liabilities...........buildings..50,000......  Creditors........30000..Furniture..10,000....60,000  .......................Current..................  .......................Assets: .......  ..................Stock .........30,000...........  ..................Debtors.......30,000.............  ..................Cash..........10,000......70,000..  .............130,000.........................130,000  The business was acquired on 1st April, 2002 at a purchase consideration of N120,000 by SOZ. All assets and liabilities were taken over except the cash to open the new firm's bank account additional N20,000 was paid into the bank.  The goodwill on purchase is",
//         "options": ["A. N90,000", "B. N30,000", "C. N19,000", "D. N18,000"],
//         "correct_answer": "B"
//     },
//     {
//         "question_number": 29,
//         "question_text": "Calls in advance are treated in the balance sheet as_______",
//         "options": ["A. Current asset", "B. Fixed asset", "C. Current liability", "D. Fixed liability"],
//         "correct_answer": "C"
//     },
//     {
//         "question_number": 30,
//         "question_text": "The amount called in respect of a share but not paid before or on the date fixed for payment is referred to as:",
//         "options": ["A. Call in advance", "B. call in arrears", "C. forfeiture", "D. shares"],
//         "correct_answer": "B"
//     }
// ];

const ExamStarted = (props) => {
    const { error, successMini, examDetails } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [timeAlloted, setTimeAlloted] = useState(0);
    const [subject, setSubject] = useState("");
    const [answers, setAnswers] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(0);

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

    const handleOptionChange = (qNum, optionIdx) => {
        setAnswers(prev => ({ ...prev, [qNum]: optionIdx }));
    };
    const goToQuestion = (idx) => setCurrentQuestion(idx);

    const handlePrev = () => setCurrentQuestion(q => Math.max(0, q - 1));
    const handleNext = () => setCurrentQuestion(q => Math.min(totalQuestions - 1, q + 1));

    const handleSubmit = () => {
        // Submit logic here
        alert("Exam submitted!");
    };

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

                        <ButtonSubmitGreen onClick={handleSubmit}>
                            Submit Exam
                        </ButtonSubmitGreen>
                    </div>

                </div>
            </div>

       
        </div>
    );
};

export default ExamStarted;
