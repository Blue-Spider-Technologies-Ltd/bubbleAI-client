import React, { useState, useEffect } from "react";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css"
import { Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import Blob from "../UI/Blob/Blob";
import resumeImg from "../../images/resume.png"


const Home = () => {
    const [isFocused, setFocused] = useState(false)

    //Chat Effect on ask me anything
    useEffect(() => {
        const chatBg = document.getElementById("chat-bg")
        const askMeContainer = document.getElementById("ask-me")
        const askMeContainerInner = askMeContainer.querySelector(".container-inner")
        const categories = document.getElementById("categories")

        if(isFocused) {
            chatBg.classList.add('chat-bg-in')
            chatBg.classList.remove('chat-bg-out')
            askMeContainer.classList.remove('container')
            askMeContainerInner.classList.add('container-inner-borderless')
            askMeContainer.querySelector('.ask-me-h2').style.display = "none"
            categories.classList.add('categories')
        } else {
            chatBg.classList.remove('chat-bg-in')
            chatBg.classList.add('chat-bg-out')
            askMeContainer.classList.add('container')
            askMeContainerInner.classList.remove('container-inner-borderless')
            askMeContainer.querySelector('.ask-me-h2').style.display = "block"
            categories.classList.remove('categories')
        }
    }, [isFocused])

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

    const handleFocus = () => {
        setFocused(true)
    }

    const handleAskMeAnything = (e) => {
        e.preventDefault();
    }
    
    return (
        <div>
            {!isFocused ? <MenuBar /> : null}

            <section id="chat-bg" className="chat-bg">
                <div className="close-icon" title="Close Chat" onClick={() => setFocused(false)}>
                    <CloseIcon sx={{fontSize: '2.5rem'}} />  
                </div>
            </section>

            <section id="ask-me" className="container" style={{marginTop: "100px"}}>
                <div className="container-inner" onFocus={handleFocus}>
                    <h1 className="ask-me-h2">Ask me anything</h1>
                    <form onSubmit={handleAskMeAnything} className="form-ask-anything">
                        <Grid container>
                            <Input placeholder="Ask a Question..." inputType="text" inputGrid={10} inputGridSm={11} /> 
                            <Grid item xs={1} sx={{textAlign: "right"}}><ButtonSubmitBlack><SendIcon /></ButtonSubmitBlack></Grid>
                        </Grid>
                        
                    </form>
                </div>
            </section>

            <section id="categories" className="container">
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