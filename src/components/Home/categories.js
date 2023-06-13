
import resumeImg from "../../images/resume.png"
import businessPlanImg from "../../images/business-plan.jpg";
import productImg from "../../images/product.jpg"
import fraudImg from "../../images/fraud-detector.jpg"
import reportImg from "../../images/report.jpg"
import relationshipImg from "../../images/relationship.jpg"
import sttImg from "../../images/stt2.jpg"

const categoriesData = [
    {
        title: "Resume Writer",
        desc: "Enter to create the perfect resume",
        isAuthURL: '/user/dashboard/resume',
        unAuthURL: '/popin?resume',
        image: resumeImg
    },
    {
        title: "Business Plan",
        desc: "Enter to define the purpose and a trajectory for your ideas",
        isAuthURL: '/user/dashboard/business-plan',
        unAuthURL: '/popin?business-plan',
        image: businessPlanImg
    },
    {
        title: "Depositions",
        desc: "Minutes of Proceedings (Speech to Text & Voice Recognition) AI",
        isAuthURL: '/user/dashboard/depositions',
        unAuthURL: '/popin?depositions',
        image: sttImg
    },
    {
        title: "Product Price Setter",
        desc: "I can help you create the perfect price, beat competition",
        isAuthURL: '/user/dashboard/product-price',
        unAuthURL: '/popin?product-price',
        image: productImg
    },
    {
        title: "Relationship Fixer",
        desc: "Simulate with me to calm the tone",
        isAuthURL: '/user/dashboard/relationship',
        unAuthURL: '/popin?relationship',
        image: relationshipImg
    },
    {
        title: "Fraud Detector",
        desc: "Pass me a suspicious file, link or message...",
        isAuthURL: '/user/dashboard/fraud-detector',
        unAuthURL: '/popin?fraud-detector',
        image: fraudImg
    },
    {
        title: "Generate Report",
        desc: "Generate an amazing report with a few queries, want chart data? No problem!",
        isAuthURL: '/user/dashboard/generate-report',
        unAuthURL: '/popin?generate-report',
        image: reportImg
    }
];

export default categoriesData