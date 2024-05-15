import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ButtonCard } from "../UI/Buttons/Buttons";
import { Grid } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GavelIcon from '@mui/icons-material/Gavel';
import DialpadIcon from '@mui/icons-material/Dialpad';

const DashSupport = (props) => {
  const navigate = useNavigate();


    const goBackPrevPage = () => {
        const prevPath = localStorage?.getItem("prevPath")
        navigate(prevPath)
    }

    const openNewTab = (url) => {
        window.open(url, '_blank');
    };

    const faqIconImg = (<QuizIcon sx={{fontSize: '4rem'}} /> )
    const howIWorkIcon = (<EngineeringIcon sx={{fontSize: '4rem'}} /> )
    const termsIcon = (<GavelIcon sx={{fontSize: '4rem'}} /> )
    const contactIcon = (<DialpadIcon sx={{fontSize: '4rem'}} /> )


  return (
    <div className="auth-container">
        {/* For SIDE MENU */}
        <div style={{ width: "100%", padding: "0" }}>
            <div className="auth-bg-blob"></div>
        </div>
        <div className='go-back' style={{position: "absolute", top: "1.3rem", left: "1rem"}}>
            <div onClick={goBackPrevPage} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: '80px'}}>
                <ArrowCircleLeftIcon fontSize='large' />
            </div>
        </div>

        <div className="auth-container-inner">
            {/* for TOP MENU */}
            <AuthHeader
                noAuthMenu={true}
                headerText="Choose Support"
            />

            <Grid container>
                                
                <Grid item xs={12} md={6}>
                    <ButtonCard 
                        iconImg={faqIconImg}
                        title="FAQs"
                        description="Most of your questions are likely already answered here"
                        onClick={() => openNewTab("/faqs")}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ButtonCard 
                        iconImg={howIWorkIcon}
                        title="How Bubble Works"
                        description="Learn how to use different AI solutions that Bubble AI offers"
                        onClick={() => openNewTab("/how-i-work")}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ButtonCard 
                        iconImg={termsIcon}
                        title="Terms & Conditions"
                        description="Understand all legally binding agreements for the usage of Bubble AI"
                        onClick={() => openNewTab("/terms")}
                    />
                </Grid>
                                
                <Grid item xs={12} md={6}>
                    <ButtonCard 
                        iconImg={contactIcon}
                        title="Talk to us Directly"
                        description="Contains all platforms to reach us directly. We are here to help"
                        onClick={() => openNewTab("/contact")}
                    />
                </Grid>
            </Grid>
        </div>
    </div>
  );
};

export default DashSupport;
