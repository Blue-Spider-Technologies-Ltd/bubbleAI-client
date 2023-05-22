
import resumeImg from "../../images/resume.png"
import businessPlanImg from "../../images/business-plan.jpg";
import productImg from "../../images/product.jpg"
import fraudImg from "../../images/fraud-detector.jpg"
import reportImg from "../../images/report.jpg"
import relationshipImg from "../../images/relationship.jpg"
export const categoriesData = [
    {
        title: "Resume Writer",
        desc: "Enter to create the perfect resume",
        url: '/popin?resume',
        image: resumeImg
    },
    {
        title: "Business Plan",
        desc: "Enter to define the purpose and a trajectory for your ideas",
        url: '/popin?business-plan',
        image: businessPlanImg
    },
    {
        title: "Product Price Setter",
        desc: "I can help you create the perfect price, beat competition",
        url: '/popin?product-price',
        image: productImg
    },
    {
        title: "Relationship Fixer",
        desc: "Simulate with me to calm the tone",
        url: '/popin?relationship',
        image: relationshipImg
    },
    {
        title: "Fraud Detector",
        desc: "Pass me a suspicious file, link or message...",
        url: '/popin?fraud-detector',
        image: fraudImg
    },
    {
        title: "Generate Report",
        desc: "Generate an amazing report with a few queries, want chart data? No problem!",
        url: '/popin?generate-report',
        image: reportImg
    }
];
