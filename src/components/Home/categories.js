
import resumeImg from "../../images/resume.png"
import businessPlanImg from "../../images/business-plan.jpg";
import productImg from "../../images/product.jpg"
import fraudImg from "../../images/fraud-detector.jpg"
import reportImg from "../../images/report.jpg"
import relationshipImg from "../../images/relationship.jpg"
import sttImg from "../../images/stt2.jpg"
const isAuth = localStorage?.getItem('token')
const categoriesData = [
    {
        title: "Resume Writer",
        desc: "Enter to create the perfect resume",
        url: isAuth ? '/user/dashboard/resume' : '/popin?resume',
        image: resumeImg
    },
    {
        title: "Business Plan",
        desc: "Enter to define the purpose and a trajectory for your ideas",
        url: isAuth ? '/user/dashboard/business-plan' : '/popin?business-plan',
        image: businessPlanImg
    },
    {
        title: "Depositions",
        desc: "Minutes of Proceedings (Speech to Text & Voice Recognition) AI",
        url: isAuth ? '/user/dashboard/depositions' : '/popin?depositions',
        image: sttImg
    },
    {
        title: "Product Price Setter",
        desc: "I can help you create the perfect price, beat competition",
        url: isAuth ? '/user/dashboard/product-price' : '/popin?product-price',
        image: productImg
    },
    {
        title: "Relationship Fixer",
        desc: "Simulate with me to calm the tone",
        url: isAuth ? '/user/dashboard/relationship' : '/popin?relationship',
        image: relationshipImg
    },
    {
        title: "Fraud Detector",
        desc: "Pass me a suspicious file, link or message...",
        url: isAuth ? '/user/dashboard/fraud-detector' : '/popin?fraud-detector',
        image: fraudImg
    },
    {
        title: "Generate Report",
        desc: "Generate an amazing report with a few queries, want chart data? No problem!",
        url: isAuth ? '/user/dashboard/generate-report' : '/popin?generate-report',
        image: reportImg
    }
];

export default categoriesData