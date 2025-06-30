// Bubble Ai Insights & Tutor Stage - Dummy Data

export const gradingData = {
  score: 82,
  percentage: 82,
  pass: true,
  topic: "Financial Accounting",
  comparative: { user: 82, average: 68 },
  topicBreakdown: [
    { topic: "Depreciation", correct: 4, total: 5 },
    { topic: "Petty Cash", correct: 3, total: 5 },
    { topic: "Double Entry", correct: 2, total: 5 },
  ],
  questionAnalysis: [
    { number: 1, question: "The formula for calculating depreciation...", correct: true, time: 45, difficulty: "Medium", topic: "Depreciation" },
    { number: 2, question: "Petty cash book records transactions on...", correct: false, time: 30, difficulty: "Easy", topic: "Petty Cash" },
    { number: 3, question: "Double entry principle means...", correct: true, time: 60, difficulty: "Hard", topic: "Double Entry" },
  ],
  errors: [
    { question: 2, mistake: "Chose debit only, should be both sides", explanation: "Petty cash book records both credit and debit sides." }
  ],
  feedback: "Great job! You excelled in Depreciation but need to review Petty Cash concepts. Focus on time management for harder questions."
};

export const studyPlanData = {
  schedule: [
    { date: "2025-07-01", tasks: ["Review Depreciation notes", "Practice 10 questions"] },
    { date: "2025-07-02", tasks: ["Watch Petty Cash video", "Take mock test"] },
    { date: "2025-07-03", tasks: ["Revise Double Entry", "Group discussion"] },
  ],
  prioritizedTopics: [
    { topic: "Petty Cash", importance: 5 },
    { topic: "Double Entry", importance: 4 },
    { topic: "Depreciation", importance: 3 },
  ],
  resources: [
    { type: "Video", title: "Depreciation Explained", link: "#" },
    { type: "Notes", title: "Petty Cash Book", link: "#" },
    { type: "Practice", title: "Double Entry Quiz", link: "#" },
  ],
  timeAllocation: [
    { topic: "Petty Cash", percent: 40 },
    { topic: "Double Entry", percent: 35 },
    { topic: "Depreciation", percent: 25 },
  ],
  progress: [
    { task: "Review Depreciation notes", done: true },
    { task: "Practice 10 questions", done: false },
    { task: "Watch Petty Cash video", done: false },
  ]
};

export const aiTutorData = {
  failedConcepts: [
    { topic: "Petty Cash", explanation: "Petty cash book records both credit and debit sides. Remember to check both columns." },
    { topic: "Double Entry", explanation: "Every transaction affects two accounts: debit and credit." }
  ],
  motivational: [
    "Keep going! Every mistake is a step closer to mastery.",
    "You’re doing great! Consistency is key."
  ]
};

export const examInsightsData = {
  structure: "The exam consists of 50 multiple-choice questions covering Depreciation, Petty Cash, and Double Entry. Duration: 60 minutes.",
  trends: [
    { year: 2022, avg: 65 },
    { year: 2023, avg: 68 },
    { year: 2024, avg: 70 }
  ],
  rubric: [
    { section: "Depreciation", marks: 20 },
    { section: "Petty Cash", marks: 15 },
    { section: "Double Entry", marks: 15 }
  ],
  pitfalls: [
    "Not reading questions carefully.",
    "Spending too much time on one question.",
    "Ignoring instructions."
  ],
  logistics: [
    "Bring your exam slip and ID.",
    "Arrive 30 minutes early.",
    "No calculators allowed."
  ],
  successStories: [
    { name: "Ada", quote: "Bubble Ai helped me boost my score by 20%!", image: "" },
    { name: "Chinedu", quote: "The study plan kept me on track.", image: "" }
  ]
};

export const peerBenchmarkingData = {
  percentile: 85,
  strengthComparison: [
    { topic: "Depreciation", user: 80, peers: 70 },
    { topic: "Petty Cash", user: 60, peers: 75 },
    { topic: "Double Entry", user: 90, peers: 65 }
  ],
  gapAnalysis: [
    { topic: "Petty Cash", gap: -15 }
  ],
  communityInsights: "Most students struggle with Petty Cash. Top performers review notes daily.",
  motivational: [
    { badge: "Top 15%", text: "You’re among the top 15%!" }
  ]
};

export const careerAlignmentData = {
  mapping: [
    { career: "Accountant", match: 90 },
    { career: "Auditor", match: 80 },
    { career: "Finance Analyst", match: 70 }
  ],
  courses: [
    { name: "BSc Accounting", requirements: "Math, English, Economics", link: "#" },
    { name: "Diploma in Auditing", requirements: "Math, English", link: "#" }
  ],
  skillGap: [
    { skill: "Petty Cash", required: 80, current: 60 }
  ],
  requirements: [
    { course: "BSc Accounting", criteria: "5 credits incl. Math & English" }
  ],
  alternatives: [
    { name: "Online Bookkeeping Course", link: "#" }
  ],
  nextSteps: [
    "Register for JAMB.",
    "Join a study group.",
    "Take a practice test."
  ]
};

export const progressMonitoringData = {
  performance: [
    { date: "2025-06-01", score: 60 },
    { date: "2025-06-15", score: 70 },
    { date: "2025-06-30", score: 82 }
  ],
  milestones: [
    { text: "Completed first mock exam!", date: "2025-06-01" },
    { text: "Improved score by 10 points!", date: "2025-06-15" }
  ],
  weaknessTracker: [
    { topic: "Petty Cash", before: 40, after: 60 }
  ],
  studyTime: [
    { topic: "Depreciation", hours: 5 },
    { topic: "Petty Cash", hours: 8 },
    { topic: "Double Entry", hours: 4 }
  ],
  goals: [
    { goal: "Score 90% in next mock", done: false }
  ]
};