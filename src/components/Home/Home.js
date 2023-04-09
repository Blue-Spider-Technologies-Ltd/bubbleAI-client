import React from "react";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css"
import { Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import Blob from "../UI/Blob/Blob";
import resumeImg from "../../images/resume.png"


const Home = () => {
    const categoriesData = [
        {
            title: "Resume Writer",
            desc: "I can help you create the perfect resume to get your dream job",
            url: '',
            image: resumeImg
        },
        {
            title: "Business Plan",
            desc: "I can help you define the purpose and a trajectory for your ideas",
            url: '',
            image: resumeImg
        },
        {
            title: "Product Price Setter",
            desc: "I can help you create the perfect resume to get your dream job",
            url: '',
            image: resumeImg
        },
        {
            title: "Fraud Detector",
            desc: "I can help you create the perfect resume to get your dream job",
            url: '',
            image: resumeImg
        },
        {
            title: "Business Plan",
            desc: "I can help you create the perfect resume to get your dream job",
            url: '',
            image: resumeImg
        },
        {
            title: "Business Plan",
            desc: "I can help you create the perfect resume to get your dream job",
            url: '',
            image: resumeImg
        }
    ];

    const handleAskMeAnything = (e) => {
        e.preventDefault();
    }
    
    return (
        <div>
            <MenuBar />

            <section className="container" style={{marginTop: "130px"}}>
                <div className="container-inner">
                    <h1>Ask me anything</h1>
                    <form onSubmit={handleAskMeAnything} className="form-ask-anything">
                        <Grid container>
                            <Input placeholder="Ask a Question..." inputType="text" inputGrid={10} inputGridSm={11} /> 
                            <Grid item xs={1} sx={{textAlign: "right"}}><ButtonSubmitBlack><SendIcon /></ButtonSubmitBlack></Grid>
                        </Grid>
                        
                    </form>
                </div>
            </section>

            <section className="container">
                <div className="container-inner">
                    <h2>I can help you with:</h2>
                    <Grid container>
                        {categoriesData.map((data, index) => {
                            return (
                                <Grid item xs={12} md={6} lg={4} mb={5} key={index}>
                                    <Blob link={data.url} bgImage={data.image} altText={data.title} desc={data.desc} title={data.title} />
                                    <h3>{data.title}</h3>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </section>
        </div>
    )
}

export default Home;