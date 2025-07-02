import React, { useState, useCallback } from "react";
import mockCss from "../Mock.module.css";
import {
  gradingData,
  studyPlanData,
  aiTutorData,
  examInsightsData,
  peerBenchmarkingData,
  careerAlignmentData,
  progressMonitoringData
} from "./data";
import { ButtonThin, ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { FaChartPie, FaBookOpen, FaRobot, FaLightbulb, FaUsers, FaSuitcase, FaChartLine, FaChevronDown, FaChevronUp, FaTrophy, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaStar, FaArrowRight, FaDownload, FaMedal } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import AuthInput from "../../UI/Input/AuthInputs";
import { setError, setSuccessMini, setFetching } from "../../../redux/states";
import {
    errorAnimation,
    successMiniAnimation,
    checkAuthenticatedUser,
    formatTime
} from "../../../utils/client-functions";


const segments = [
    { key: "grading", label: "Grading", icon: <FaChartPie style={{color: "#3E8F93"}} /> },
    { key: "studyPlan", label: "Study Plan", icon: <FaBookOpen style={{color: "#FF6B6B"}} /> },
    { key: "aiTutor", label: "AI Tutor", icon: <FaRobot style={{color: "#6C63FF"}} /> },
    { key: "examInsights", label: "Exam Insights", icon: <FaLightbulb style={{color: "#F7B801"}} /> },
    { key: "peerBenchmarking", label: "Peer Benchmarking", icon: <FaUsers style={{color: "#43AA8B"}} /> },
    { key: "careerAlignment", label: "Career & Course", icon: <FaSuitcase style={{color: "black"}} /> },
    { key: "progressMonitoring", label: "Progress", icon: <FaChartLine style={{color: "#6C63FF"}} /> }
];

const examDateOptions = [
    { name: "In 1 week", value: 7 },
    { name: "In 2 weeks", value: 14 },
    { name: "In 1 month", value: 30 },
    { name: "In 2 months", value: 60 },
    { name: "In 3 months", value: 90 },
    { name: "Over 3 months", value: 120 },
];

const isMobile = () => window.innerWidth < 700;

const SegmentHeader = ({ icon, label, desc, open, onClick, mobile }) => (
  <div className={`${mockCss.Segment} ${mobile ? mockCss.AccordionHeader : ""}`} onClick={onClick}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {icon}
      <h3 style={{ margin: 0 }}>{label}</h3>
      {mobile && (open ? <FaChevronUp /> : <FaChevronDown />)}
    </div>
    <p className={mockCss.SegmentDesc}>{desc}</p>
  </div>
);

const GradingSegment = () => (
  <div className={mockCss.SegmentBody}>
    <div className={mockCss.ScoreCard}>
      <div className={mockCss.ScoreCircle} style={{ background: gradingData.pass ? "#3E8F93" : "#d80707" }}>
        <span className={mockCss.ScoreValue}>{gradingData.score}</span>
        <span className={mockCss.ScoreLabel}>Score</span>
      </div>
      <div className={mockCss.ScoreDetails}>
        <div>
          <span className={mockCss.ScorePercent}>{gradingData.percentage}%</span>
          <span className={mockCss.ScoreStatus} style={{ color: gradingData.pass ? "#3E8F93" : "#d80707" }}>
            {gradingData.pass ? <FaCheckCircle /> : <FaTimesCircle />} {gradingData.pass ? "Passed" : "Failed"}
          </span>
        </div>
        <div>
          <span className={mockCss.ScoreTopic}>Subject: {gradingData.topic}</span>
        </div>
        <div>
          <span className={mockCss.ScoreCompare}>
            You: {gradingData.comparative.user} | Peers: {gradingData.comparative.average}
          </span>
        </div>
      </div>
    </div>
    <div className={mockCss.ChartRow}>
      <div className={mockCss.ChartCard}>
        <h6>Topic Breakdown</h6>
        <div className={mockCss.BarChart}>
          {gradingData.topicBreakdown.map((t, i) => (
            <div key={i} className={mockCss.BarRow}>
              <span>{t.topic}</span>
              <div className={mockCss.BarTrack}>
                <div
                  className={mockCss.BarFill}
                  style={{
                    width: `${(t.correct / t.total) * 100}%`,
                    background: "#3E8F93"
                  }}
                />
              </div>
              <span>{t.correct}/{t.total}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={mockCss.ChartCard}>
        <h6>Comparative Metrics</h6>
        <div className={mockCss.CompareBar}>
          <span style={{ color: "#3E8F93" }}>You</span>
          <div className={mockCss.CompareTrack}>
            <div className={mockCss.CompareFill} style={{ width: `${gradingData.comparative.user}%`, background: "#3E8F93" }} />
          </div>
          <span>{gradingData.comparative.user}%</span>
        </div>
        <div className={mockCss.CompareBar}>
          <span style={{ color: "#d80707" }}>Peers</span>
          <div className={mockCss.CompareTrack}>
            <div className={mockCss.CompareFill} style={{ width: `${gradingData.comparative.average}%`, background: "#d80707" }} />
          </div>
          <span>{gradingData.comparative.average}%</span>
        </div>
      </div>
    </div>
    <div className={mockCss.TableCard}>
      <h6>Question-Level Analysis</h6>
      <table className={mockCss.AnalysisTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Correct</th>
            <th>Time (s)</th>
            <th>Difficulty</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {gradingData.questionAnalysis.map((q, i) => (
            <tr key={i}>
              <td>{q.number}</td>
              <td>{q.question}</td>
              <td>{q.correct ? <FaCheckCircle color="#3E8F93" /> : <FaTimesCircle color="#d80707" />}</td>
              <td>{q.time}</td>
              <td>{q.difficulty}</td>
              <td>{q.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={mockCss.ErrorCard}>
      <h6>Error Categorization</h6>
      {gradingData.errors.length === 0 ? (
        <p>No mistakes! 🎉</p>
      ) : (
        gradingData.errors.map((e, i) => (
          <div key={i} className={mockCss.ErrorItem}>
            <b>Q{e.question}:</b> {e.mistake}
            <div className={mockCss.ErrorExplain}>{e.explanation}</div>
          </div>
        ))
      )}
    </div>
    <div className={mockCss.FeedbackCard}>
      <h6>Feedback Summary</h6>
      <p>{gradingData.feedback}</p>
    </div>
  </div>
);

const StudyPlanSegment = () => {
  const [showModal, setShowModal] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  const handleContinue = () => {
    setShowPlan(true);
    setShowModal(false);
  };

  return (
    <div className={mockCss.SegmentBody}>
      {!showPlan && (
        <div className={mockCss.Overlay}>
          <ButtonSubmitGreen onClick={() => setShowModal(true)}>
            <FaCalendarAlt style={{ marginRight: 8 }} /> Get Study Plan
          </ButtonSubmitGreen>
        </div>
      )}
    {showModal && (
        <div className={mockCss.ModalOverlay}>
            <div className={mockCss.ModalContent}>
                <h4>When is your exam?</h4>
                <div style={{width: '100%'}}>
                    <AuthInput
                        inputType="select2"
                        label="Select Exam Date"
                        name="examDate"
                        value={examDate}
                        onChange={e => setExamDate(e.target.value)}
                        list={examDateOptions}
                        required
                    />
                </div>
                <ButtonSubmitGreen onClick={handleContinue} disabled={!examDate}>
                    Continue
                </ButtonSubmitGreen>
            </div>
        </div>
    )}
      {showPlan && (
        <>
          <div className={mockCss.StudySchedule}>
            <h6>Study Schedule</h6>
            <ul>
              {studyPlanData.schedule.map((d, i) => (
                <li key={i}>
                  <b>{d.date}:</b> {d.tasks.join(", ")}
                </li>
              ))}
            </ul>
          </div>
          <div className={mockCss.PrioritizedTopics}>
            <h6>Prioritized Topics</h6>
            <ul>
              {studyPlanData.prioritizedTopics.map((t, i) => (
                <li key={i}>
                  {t.topic}{" "}
                  {[...Array(t.importance)].map((_, j) => (
                    <FaStar key={j} color="#FFD700" />
                  ))}
                </li>
              ))}
            </ul>
          </div>
          <div className={mockCss.Resources}>
            <h6>Resource Recommendations</h6>
            <div className={mockCss.ResourceCards}>
              {studyPlanData.resources.map((r, i) => (
                <a key={i} href={r.link} className={mockCss.ResourceCard}>
                  <span>{r.type}</span>
                  <b>{r.title}</b>
                </a>
              ))}
            </div>
          </div>
          <div className={mockCss.TimeAllocation}>
            <h6>Time Allocation Guide</h6>
            <div className={mockCss.PieChart}>
              {studyPlanData.timeAllocation.map((t, i) => (
                <div
                  key={i}
                  className={mockCss.PieSlice}
                  style={{
                    "--percent": t.percent,
                    background: `conic-gradient(#3E8F93 0% ${t.percent}%, #e6f6f7 ${t.percent}% 100%)`
                  }}
                >
                  <span>{t.topic}: {t.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className={mockCss.ProgressTracker}>
            <h6>Progress Tracker</h6>
            <ul>
              {studyPlanData.progress.map((p, i) => (
                <li key={i}>
                  {p.done ? <FaCheckCircle color="#3E8F93" /> : <FaTimesCircle color="#d80707" />} {p.task}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const AiTutorSegment = () => {
  const handleAskAi = () => {
    localStorage.setItem("bubbleai_exam_details", JSON.stringify(gradingData));
    window.open("/chat", "_blank");
  };
  return (
    <div className={mockCss.SegmentBody}>
      <div className={mockCss.AiTutorCard}>
        <h6>Interactive Q&A</h6>
        <ButtonThin onClick={handleAskAi}>
          <FaRobot style={{ marginRight: 8 }} /> Ask Bubble Ai Tutor
        </ButtonThin>
      </div>
      <div className={mockCss.ConceptExplanations}>
        <h6>Concept Explanations</h6>
        <div className={mockCss.ConceptExplanationsInner}>
            {aiTutorData.failedConcepts.map((c, i) => (
            <div key={i} className={mockCss.ConceptCard}>
                <b>{c.topic}:</b> {c.explanation}
            </div>
            ))}
        </div>
      </div>
      <div className={mockCss.Motivational}>
        {aiTutorData.motivational.map((m, i) => (
          <div key={i} className={mockCss.MotivationalMsg}>
            <FaTrophy color="#FFD700" /> {m}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamInsightsSegment = () => (
  <div className={mockCss.SegmentBody}>
    <div className={mockCss.ExamStructure}>
      <h6>Exam Structure Overview</h6>
      <p>{examInsightsData.structure}</p>
    </div>
    <div className={mockCss.HistoricalTrends}>
      <h6>Historical Trends</h6>
      <div className={mockCss.LineChart}>
        {examInsightsData.trends.map((t, i) => (
          <div key={i} className={mockCss.LinePoint}>
            <span>{t.year}</span>
            <div className={mockCss.LineBar} style={{ height: `${t.avg}%`, background: "#3E8F93" }} />
            <span>{t.avg}%</span>
          </div>
        ))}
      </div>
    </div>
    <div className={mockCss.RubricTable}>
      <h6>Scoring Rubric</h6>
      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {examInsightsData.rubric.map((r, i) => (
            <tr key={i}>
              <td>{r.section}</td>
              <td>{r.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={mockCss.Pitfalls}>
      <h6>Common Pitfalls</h6>
      <ul>
        {examInsightsData.pitfalls.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
    <div className={mockCss.Logistics}>
      <h6>Exam Logistics</h6>
      <ul>
        {examInsightsData.logistics.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
    <div className={mockCss.SuccessStories}>
      <h6>Success Stories</h6>
      <div className={mockCss.StorySlider}>
        {examInsightsData.successStories.map((s, i) => (
          <div key={i} className={mockCss.StoryCard}>
            <FaMedal color="#FFD700" size={24} />
            <blockquote>"{s.quote}"</blockquote>
            <span>- {s.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PeerBenchmarkingSegment = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  return (
    <div className={mockCss.SegmentBody}>
      {showOverlay && (
        <div className={mockCss.Overlay}>
          <ButtonSubmitGreen onClick={() => setShowOverlay(false)}>
            <FaUsers style={{ marginRight: 8 }} /> View how Others Performed
          </ButtonSubmitGreen>
        </div>
      )}
      {!showOverlay && (
        <>
          <div className={mockCss.PercentileCard}>
            <h6>Percentile Ranking</h6>
            <div className={mockCss.Gauge}>
              <span>{peerBenchmarkingData.percentile}th</span>
            </div>
          </div>
          <div className={mockCss.StrengthComparison}>
            <h6>Strength Comparison</h6>
            {peerBenchmarkingData.strengthComparison.map((s, i) => (
              <div key={i} className={mockCss.CompareBar}>
                <span>{s.topic}</span>
                <div className={mockCss.CompareTrack}>
                  <div className={mockCss.CompareFill} style={{ width: `${s.user}%`, background: "#3E8F93" }} />
                  <div className={mockCss.CompareFill} style={{ width: `${s.peers - s.user}%`, background: "#d80707", left: `${s.user}%` }} />
                </div>
                <span>You: {s.user}% | Peers: {s.peers}%</span>
              </div>
            ))}
          </div>
          <div className={mockCss.GapAnalysis}>
            <h6>Gap Analysis</h6>
            {peerBenchmarkingData.gapAnalysis.map((g, i) => (
              <div key={i} className={mockCss.GapCard}>
                {g.topic}: {g.gap > 0 ? "+" : ""}{g.gap}%
              </div>
            ))}
          </div>
          <div className={mockCss.CommunityInsights}>
            <h6>Community Insights</h6>
            <p>{peerBenchmarkingData.communityInsights}</p>
          </div>
          <div className={mockCss.Motivational}>
            {peerBenchmarkingData.motivational.map((m, i) => (
              <div key={i} className={mockCss.MotivationalMsg}>
                <FaTrophy color="#FFD700" /> {m.text}
              </div>
            ))}
          </div>
          <div className={mockCss.PrivacyAssurance}>
            <FaLock /> Data is anonymized for your privacy.
          </div>
        </>
      )}
    </div>
  );
};

const CareerAlignmentSegment = () => (
  <div className={mockCss.SegmentBody}>
    <div className={mockCss.CareerMapping}>
      <h6>Career Mapping</h6>
      <ul>
        {careerAlignmentData.mapping.map((c, i) => (
          <li key={i}>
            {c.career} <span className={mockCss.MatchPercent}>{c.match}% match</span>
          </li>
        ))}
      </ul>
    </div>
    <div className={mockCss.Courses}>
      <h6>Course Recommendations</h6>
      <div className={mockCss.CourseCards}>
        {careerAlignmentData.courses.map((c, i) => (
          <a key={i} href={c.link} className={mockCss.CourseCard}>
            <b>{c.name}</b>
            <span>Requirements: {c.requirements}</span>
          </a>
        ))}
      </div>
    </div>
    <div className={mockCss.SkillGap}>
      <h6>Skill Gap Analysis</h6>
      {careerAlignmentData.skillGap.map((s, i) => (
        <div key={i} className={mockCss.SkillGapBar}>
          <span>{s.skill}</span>
          <div className={mockCss.SkillTrack}>
            <div className={mockCss.SkillFill} style={{ width: `${s.current}%`, background: "#3E8F93" }} />
            <div className={mockCss.SkillFill} style={{ width: `${s.required - s.current}%`, background: "#d80707", left: `${s.current}%` }} />
          </div>
          <span>Required: {s.required}% | Current: {s.current}%</span>
        </div>
      ))}
    </div>
    <div className={mockCss.Requirements}>
      <h6>Requirements</h6>
      <ul>
        {careerAlignmentData.requirements.map((r, i) => (
          <li key={i}>{r.course}: {r.criteria}</li>
        ))}
      </ul>
    </div>
    <div className={mockCss.Alternatives}>
      <h6>Alternative Pathways</h6>
      <ul>
        {careerAlignmentData.alternatives.map((a, i) => (
          <li key={i}><a href={a.link}>{a.name}</a></li>
        ))}
      </ul>
    </div>
    <div className={mockCss.NextSteps}>
      <h6>Actionable Next Steps</h6>
      <ul>
        {careerAlignmentData.nextSteps.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ProgressMonitoringSegment = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goal, setGoal] = useState("");
  return (
    <div className={mockCss.SegmentBody}>
      <div className={mockCss.PerformanceDashboard}>
        <h6>Performance Dashboard</h6>
        <div className={mockCss.LineChart}>
          {progressMonitoringData.performance.map((p, i) => (
            <div key={i} className={mockCss.LinePoint}>
              <span>{p.date}</span>
              <div className={mockCss.LineBar} style={{ height: `${p.score}%`, background: "#3E8F93" }} />
              <span>{p.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={mockCss.Milestones}>
        <h6>Milestone Alerts</h6>
        {progressMonitoringData.milestones.map((m, i) => (
          <div key={i} className={mockCss.MilestoneCard}>
            <FaTrophy color="#FFD700" /> {m.text} <span>{m.date}</span>
          </div>
        ))}
      </div>
      <div className={mockCss.WeaknessTracker}>
        <h6>Weakness Reduction Tracker</h6>
        {progressMonitoringData.weaknessTracker.map((w, i) => (
          <div key={i} className={mockCss.WeaknessBar}>
            <span>{w.topic}</span>
            <div className={mockCss.WeaknessTrack}>
              <div className={mockCss.WeaknessFill} style={{ width: `${w.before}%`, background: "#d80707" }} />
              <div className={mockCss.WeaknessFill} style={{ width: `${w.after - w.before}%`, background: "#3E8F93", left: `${w.before}%` }} />
            </div>
            <span>Before: {w.before}% | After: {w.after}%</span>
          </div>
        ))}
      </div>
      <div className={mockCss.StudyTimeAnalytics}>
        <h6>Study Time Analytics</h6>
        <div className={mockCss.PieChart}>
          {progressMonitoringData.studyTime.map((s, i) => (
            <div
              key={i}
              className={mockCss.PieSlice}
              style={{
                "--percent": s.hours * 10,
                background: `conic-gradient(#3E8F93 0% ${s.hours * 10}%, #e6f6f7 ${s.hours * 10}% 100%)`
              }}
            >
              <span>{s.topic}: {s.hours}h</span>
            </div>
          ))}
        </div>
      </div>
      <div className={mockCss.GoalSetting}>
        <h6>Goal Setting</h6>
        <ButtonThin onClick={() => setShowGoalModal(true)}>
          <FaArrowRight style={{ marginRight: 8 }} /> Set a New Goal
        </ButtonThin>
        {showGoalModal && (
          <div className={mockCss.ModalOverlay}>
            <div className={mockCss.ModalContent}>
              <h4>Set a New Goal</h4>
              <input
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="e.g. Score 90% in next mock"
                className={mockCss.GoalInput}
              />
              <ButtonSubmitGreen onClick={() => setShowGoalModal(false)} disabled={!goal}>
                Save Goal
              </ButtonSubmitGreen>
            </div>
          </div>
        )}
        <ul>
          {progressMonitoringData.goals.map((g, i) => (
            <li key={i}>
              {g.done ? <FaCheckCircle color="#3E8F93" /> : <FaTimesCircle color="#d80707" />} {g.goal}
            </li>
          ))}
        </ul>
      </div>
      <div className={mockCss.ExportReport}>
        <ButtonThin>
          <FaDownload style={{ marginRight: 8 }} /> Export PDF Report
        </ButtonThin>
      </div>
    </div>
  );
};

const segmentComponents = {
  grading: GradingSegment,
  studyPlan: StudyPlanSegment,
  aiTutor: AiTutorSegment,
  examInsights: ExamInsightsSegment,
  peerBenchmarking: PeerBenchmarkingSegment,
  careerAlignment: CareerAlignmentSegment,
  progressMonitoring: ProgressMonitoringSegment
};

const segmentDescriptions = {
  grading: "See your score, strengths, and where you can improve. Dive deep into your exam performance.",
  studyPlan: "Get a personalized study plan to maximize your success. Stay on track with daily tasks and resources.",
  aiTutor: "Ask Bubble Ai Tutor anything! Get instant explanations and motivational coaching.",
  examInsights: "Understand the exam structure, trends, and tips for success. Learn from past patterns and top performers.",
  peerBenchmarking: "See how you compare to others. Discover your percentile, strengths, and community insights.",
  careerAlignment: "Map your results to careers and courses. Find your best fit and next steps.",
  progressMonitoring: "Track your progress over time. Celebrate milestones and set new goals."
};

export default function InsightNTutor() {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("grading");
    const [openAccordions, setOpenAccordions] = useState({ grading: true });

    const mobile = isMobile();

    const handleAccordion = key => {
        setOpenAccordions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

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
                headerText="MOCK Insights"
            />

            <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div>

            <div className="BodyWrapper">
                <div className="BuildNavigator">
                    <div>
                        <span>1</span>Exam Rules
                    </div>
                    <div> 
                        <span>2</span>Simulation 
                    </div>
                    <div className="ActiveNav"> 
                        <span>3</span>Insights & Tutor
                    </div>
                </div>

                <div className={mockCss.InsightNTutorWrapper}>
                    {/* Tabs for desktop, Accordions for mobile */}
                    {!mobile ? (
                        <div className={mockCss.TabNav}>
                          {segments.map(seg => (
                              <div
                                key={seg.key}
                                className={`${mockCss.TabItem} ${activeTab === seg.key ? mockCss.ActiveTab : ""}`}
                                onClick={() => setActiveTab(seg.key)}
                              >
                                {seg.icon} {seg.label}
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className={mockCss.AccordionNav}>
                          {segments.map(seg => (
                              <div key={seg.key}>
                              <SegmentHeader
                                  icon={seg.icon}
                                  label={seg.label}
                                  desc={segmentDescriptions[seg.key]}
                                  open={!!openAccordions[seg.key]}
                                  onClick={() => handleAccordion(seg.key)}
                                  mobile
                              />
                              {openAccordions[seg.key] && (
                                  <div className={mockCss.AccordionBody}>
                                  {React.createElement(segmentComponents[seg.key])}
                                  </div>
                              )}
                              </div>
                          ))}
                        </div>
                    )}

                    {/* Segment content for desktop */}
                    {!mobile && (
                        <div className={mockCss.TabContent}>
                            <SegmentHeader
                                icon={segments.find(s => s.key === activeTab).icon}
                                label={segments.find(s => s.key === activeTab).label}
                                desc={segmentDescriptions[activeTab]}
                            />
                            {React.createElement(segmentComponents[activeTab])}
                        </div>
                    )}
                </div>
            </div>

        </div>

    </div>
  );
}