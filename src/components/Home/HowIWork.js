import React from "react";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css";
import { Grid } from "@mui/material"
import { ButtonLogOut } from "../UI/Buttons/Buttons";



const HowIWork = () => {
    const onThisPage = [ 
        {
            name: "Registration",
            to: "/how-i-work#registration"
        },
        {
            name: "Ask Me",
            to: "/how-i-work#ask"
        },
        {
            name: "Resume Builder AI",
            to: "/how-i-work#resume"
        }
    ]

  return (
    <div>
      <MenuBar />

      <section id="not-found" className="container" style={{ marginTop: "70px" }}>
        <h1 className="ask-me-h2" style={{textAlign: "center"}}>How I Work</h1>
            <Grid container>
                {onThisPage.map((detail, index) => {
                    return (
                        <Grid key={index} item xs={6} sm={4} p={2}>
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <ButtonLogOut to={detail.to}>
                                    {detail.name}
                                </ButtonLogOut>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>

        <section id="registration" className="container-inner" style={{textAlign: "left", paddingBottom: "10px"}}>
            <h4 style={{color: "#56A8AC"}}>1. Registration</h4>

            <div style={{paddingLeft: "20px", fontSize: ".9rem"}}>
                <ul>
                    <li>All users must <a href="/join-bubble" target="_blank">register here</a> to enjoy the features provided by Bubble AI.</li>
                    <li>Registration is simple and takes under 2 minutes</li>
                    <li>After which a verification code is sent to the registered email to complete your sign up.</li>
                    <li>Please use only valid details (including email and names) as this will be used throughout your usage and stay with me; and might be tedious/impossible to change.</li>
                </ul>  
            </div>
        </section>

        <section id="ask" className="container-inner" style={{textAlign: "left", paddingBottom: "10px", marginTop: "20px"}}>
            <h4 style={{color: "#56A8AC"}}>2. Ask Me Anything</h4>

            <div style={{paddingLeft: "20px", fontSize: ".9rem"}}>
                <ul>
                    <li>This is the first section on the <a href="/chat" target="_blank">Bubble AI home page</a>.</li>
                    <li>It is totally free and unlimited for registered users</li>
                    <li>Click the input field to reveal the chat box and query away.</li>
                </ul>  
            </div>
        </section>

        <section id="resume" className="container-inner" style={{textAlign: "left", paddingBottom: "10px", marginTop: "20px"}}>
            <h4 style={{color: "#56A8AC"}}>3. Resume Builder AI</h4>

            <div style={{paddingLeft: "20px", fontSize: ".9rem"}}>
                <ul>
                    <li>The Resume builder AI is for individuals and even established professionals looking for new opportunities.</li>
                    <li>Career and resume development coaches can also opt for the monthly plan to enable them create several resumes for different people</li>
                    <li>To start, click the <a href="/user/dashboard/resume" target="_blank">Resume Writer</a> on the Bubble AI home page. You might be redirected to log in if you already are not</li>
                    <li>Very few details would be required from you to create an outstanding CV</li>
                    <li>Have your <strong>Education</strong> and <strong>Work history</strong> handy</li>
                    <li>For the relevant skills field, you can add one or more skills and allow me optimize and generate more. (AI optimized skills can be deleted in the preview page)</li>
                    <li>I will not generate your interests (hobbies). That is up to you for now, so include as many as you want</li>
                    <li>After the customization stage, I would <strong>take a few seconds to build your CV</strong> and allow you preview it</li>
                    <li>You might be required to make payment at this stage if you do not already have an active plan</li>
                    <li><a href="/pricing" target="_blank">Several affordable plans</a> are available for your convenience</li>
                    <li>On the preview page, you will be allowed to make minimalistic changes around the AI generated fields; other fields might not allow changes.</li>
                    <li>Use the "X" sign beside items to remove them. You would be asked for confirmation.</li>
                    <li>When you feel satisfied with the output, proceed to the download page</li>
                    <li>On this page, you would be required to give the resume a name to enable you search for it in the future</li>
                    <li>You would also be able to select from several templates if available to your subscription tier</li>
                    <li>Click on the <strong>Download button</strong> to reveal the download pop up</li>
                    <li>Here you can scale the resume page size, orientation and font size</li>
                    <li>You can also choose to either print, or save as PDF or both, depending on your subscription tier</li>
                    <li>After the Beta version, creators with certain subscription tier would be redirected to carefully curated and related job opportunities to submit their generated CVs</li>
                </ul>  
            </div>
        </section>
      </section>


    </div>
  );
};

export default HowIWork;

