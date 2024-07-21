
import resumeImg from "../../images/resume.png"
// import businessPlanImg from "../../images/business-plan.jpg";
// import productImg from "../../images/product.jpg"
// import fraudImg from "../../images/fraud-detector.jpg"
// import examImg from "../../images/exam.jpg"
// import reportImg from "../../images/report.jpg"
// import relationshipImg from "../../images/relationship.jpg"
import sttImg from "../../images/stt2.jpg"
// import bizProposalImg from "../../images/biz-proposal.jpg"

const categoriesData = [
    {
        title: "Resume Writer",
        desc: "Professional Résumé/CV in PDF, Cover Letters and Job Apps in 5mins",
        isAuthURL: '/user/dashboard/resume',
        unAuthURL: '/popin?resume',
        image: resumeImg
    },
    // {
    //     title: "Mock Exams and Tutor",
    //     desc: "Take standard time-based CBT mock: JAMB, IELTS etc. and get tutored on weak areas",
    //     isAuthURL: '/user/dashboard/mock',
    //     unAuthURL: '/popin?mock',
    //     image: examImg
    // },
    {
        title: "Depositions (Beta)",
        desc: "Minutes of Proceedings (Speech to Text & Voice Recognition) AI",
        isAuthURL: '/user/dashboard/depositions',
        unAuthURL: '/popin?depositions',
        image: sttImg
    },
    // {
    //     title: "Business Proposals",
    //     desc: "Enter for a professional proposal, 100% conversion of potential clients",
    //     isAuthURL: '/user/dashboard/business-proposals',
    //     unAuthURL: '/popin?business-proposals',
    //     image: bizProposalImg
    // },
    // {
    //     title: "Business Plan",
    //     desc: "Enter to define the purpose and a trajectory for your ideas",
    //     isAuthURL: '/user/dashboard/business-plan',
    //     unAuthURL: '/popin?business-plan',
    //     image: businessPlanImg
    // },
    // {
    //     title: "Product Price Setter",
    //     desc: "I can help you create the perfect price, beat competition",
    //     isAuthURL: '/user/dashboard/product-price',
    //     unAuthURL: '/popin?product-price',
    //     image: productImg
    // },
    // {
    //     title: "Professional/Career Councellor",
    //     desc: "Get career and professional pointers, tailored to your needs",
    //     isAuthURL: '/user/dashboard/councellor',
    //     unAuthURL: '/popin?councellor',
    //     image: relationshipImg
    // },
    // {
    //     title: "Fraud Detector",
    //     desc: "Pass me a suspicious file, link or message before interacting with it",
    //     isAuthURL: '/user/dashboard/fraud-detector',
    //     unAuthURL: '/popin?fraud-detector',
    //     image: fraudImg
    // },
    // {
    //     title: "Generate Report",
    //     desc: "Generate an amazing report with a few queries, want chart data? No problem!",
    //     isAuthURL: '/user/dashboard/generate-report',
    //     unAuthURL: '/popin?generate-report',
    //     image: reportImg
    // }
];

export default categoriesData