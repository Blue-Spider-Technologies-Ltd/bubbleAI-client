// Bubble Ai Insights & Tutor Stage - Dummy Data

export const gradingData = {
  score: 82,
  percentage: 82,
  pass: true,
  subject: "Financial Accounting",
  comparative: { user: 82, average: 68 },
  topicBreakdown: [
    { topic: "Depreciation", correct: 4, total: 5 },
    { topic: "Petty Cash", correct: 3, total: 5 },
    { topic: "Double Entry", correct: 2, total: 5 },
  ],
  questionAnalysis: [
    { number: 1, question: "The formula for calculating depreciation...", correct: true, chose: "A. Straight Line Method", right: "A. Straight Line Method", time: 45, difficulty: "Medium", topic: "Depreciation" },
    { number: 2, question: "Petty cash book records transactions on...", correct: false, chose: "C. Cash basis", right: "B. Accrual basis", time: 30, difficulty: "Easy", topic: "Petty Cash" },
    { number: 3, question: "Double entry principle means...", correct: true, chose: "D. Every transaction has a debit and credit", right: "D. Every transaction has a debit and credit", time: 60, difficulty: "Hard", topic: "Double Entry" },
  ],
  errors: [
    { question: 2, mistake: "Chose debit only, should be both sides", explanation: "Petty cash book records both credit and debit sides." }
  ],
  feedback: "Great job! You excelled in Depreciation but need to review Petty Cash concepts. Focus on time management for harder questions."
};

export const studyPlanData = {
  schedule: [
    {
      date: "2025-07-01",
      tasks: [
        {
          title: "Review Depreciation notes",
          timeAllocation: 40,
          importance: 4,
          resource: { type: "Notes", title: "Depreciation Explained", link: "#" },
          done: true
        },
        {
          title: "Practice 10 questions",
          timeAllocation: 30,
          importance: 3,
          resource: { type: "Practice", title: "Depreciation Quiz", link: "#" },
          done: false
        }
      ]
    },
    {
      date: "2025-07-02",
      tasks: [
        {
          title: "Watch Petty Cash video",
          timeAllocation: 25,
          importance: 5,
          resource: { type: "Video", title: "Petty Cash Book", link: "#" },
          done: false
        },
        {
          title: "Take mock test",
          timeAllocation: 60,
          importance: 4,
          resource: { type: "Practice", title: "Mock Test", link: "#" },
          done: false
        }
      ]
    },
    {
      date: "2025-07-03",
      tasks: [
        {
          title: "Revise Double Entry",
          timeAllocation: 35,
          importance: 3,
          resource: { type: "Notes", title: "Double Entry Notes", link: "#" },
          done: false
        },
        {
          title: "Group discussion",
          timeAllocation: 30,
          importance: 2,
          resource: null,
          done: false
        }
      ]
    }
  ],
  timeAllocation: [
    { topic: "Petty Cash", percent: 40 },
    { topic: "Double Entry", percent: 35 },
    { topic: "Depreciation", percent: 25 }
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
    { year: 2021, avg: 70 },
    { year: 2022, avg: 65 },
    { year: 2023, avg: 72 },
    { year: 2024, avg: 74 }
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