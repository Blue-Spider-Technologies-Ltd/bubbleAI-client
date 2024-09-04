import React from "react";
import radiantCss from "./RadiantMoon.module.css"
import BuildIcon from '@mui/icons-material/Build';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from "@mui/material";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../../utils/client-functions";



const RadiantMoon = (props) => {

    return (
        <div className={radiantCss.RadiantContainer}>
            <Grid container>
                <Grid item xs={4} className={radiantCss.LeftBg}>
                    <div className={radiantCss.ImgContainer}>
                        <img src={props.imgUrl} alt="avatar" width={"100%"} />
                    </div>

                    <h3>PROFILE</h3>
                    <div>
                        {props.resume?.basicInfo?.profSummary}
                    </div>

                    <h3>CONTACT</h3>

                    <h5>PHONE</h5>
                    <div>
                        {props.resume?.basicInfo?.mobile}
                    </div>

                    <p></p>
                    <h5>EMAIL</h5>
                    <div>
                        {props.resume?.basicInfo?.email}
                    </div>
                    
                    <p></p>
                    {props.resume?.linkInfo?.length > 0 && (
                        <div>
                            <h5>WEBSITE</h5>
                            {props.resume.linkInfo.map((link, index) => (
                                <div key={index}>
                                    <a href={link} className={radiantCss.link}>{link}</a>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {props.resume?.skills?.length > 0 && (
                        <div>
                            <h3>SKILLS</h3>
                            {props.resume.skills.map((skill, index) => (
                                <span key={index} className={radiantCss.SkillItems}><BuildIcon fontSize="inherit" /> <span>{skill}</span></span>
                            ))}
                        </div>
                    )}

                    {props.resume?.interests?.length > 0 && (
                        <div>
                            <h3>HOBBIES</h3>
                            {props.resume.interests.map((interest, index) => (
                                <span key={index} className={radiantCss.SkillItems}><FavoriteIcon fontSize="inherit" /> <span>{interest}</span></span>
                            ))}
                        </div>
                    )}

                   
                </Grid>

                <Grid item xs={8} className={radiantCss.RightBg}>
                    <h1 style={{marginBottom: "0"}}>{capitalizeWords(props.resume?.basicInfo?.firstName)}</h1>
                    <h1 style={{marginBottom: "0", marginTop: "-0.6rem"}}>{capitalizeWords(props.resume?.basicInfo?.lastName)}</h1>
                    <h3>{props.resume?.basicInfo?.jobPosition}</h3>

                    <div style={{marginTop: "1rem"}}>
                        <section>
                            <h4>EDUCATION</h4>
                            <hr />
                            {props.resume?.eduArray && (
                                <div>
                                    {props.resume?.eduArray?.map((eduInfo, index) => (
                                        <div key={index}>
                                            
                                            <div className={radiantCss.FlexContainer}>
                                                <h5>{capitalizeWords(eduInfo.institution)}</h5>
                                                <div>{getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}</div>
                                            </div>
                                            <div style={{marginBottom: "10px"}}><span>{eduInfo.degree}</span></div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </section>

                        <section>
                            <h4>WORK EXPERIENCE</h4>
                            <hr />

                            {props.resume?.workExpArray && (
                                <div>
                                    {props.resume?.workExpArray.map((workInfo, index) => (
                                        <div key={index}>
                                            <div className={radiantCss.WorkInfoCont}>
                                                <div>
                                                    <h5>
                                                        <span>{capitalizeWords(workInfo.company)} - {capitalizeAllLetters(workInfo.position)} </span>{" "}
                                                        {workInfo.workLink && <span sx={{float: "right"}}><a href={workInfo.workLink} className={radiantCss.link}>({workInfo.workLink})</a></span>}
                                                    </h5>
                                                </div>
                                                {/* <div style={{ textAlign: "right" }}>
                                                    <span>{workInfo.industry}</span>
                                                </div> */}
                                            </div>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)" }}>
                                                {getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4)}
                                            </div>
                                            
                                            {workInfo.jobDesc.split(";").map((item, index) => (
                                                <div key={index}>{item.trim()}</div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}


                            {props.resume?.awardArray && (
                                <div>
                                    {props.resume.awardArray.length > 0 && (
                                        <section>
                                            <h4>AWARDS & CERTIFICATIONS</h4>
                                            <hr />
                                            {props.resume.awardArray.map((awardInfo, index) => (
                                                <div key={index} style={{marginBottom: "10px"}}>
                                                    <h5>{capitalizeWords(awardInfo.org)}</h5>
                                                    <div className={radiantCss.FlexContainer}>
                                                        <div><span>{capitalizeWords(awardInfo.award)}</span></div>
                                                        <div>{getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </section>
                                    )}
                                </div>
                            )}

                            {props.resume.publications && (
                                <div>
                                    {props.resume.publications.length > 0 && (
                                        <section>
                                            <h4>Publications</h4>
                                            <hr />
                                            {props.resume.publications.map((publication, index) => (
                                                <p key={index}>{capitalizeWords(publication.title) + ", " + publication.source + ", " + getMonthShortName(publication?.date) + " " + publication?.date.slice(0, 4)}</p>
                                            ))}
                                        </section>
                                    )}
                                </div>
                            )}

                            <h4>Referees</h4>
                            <hr />
                            <p>Available on Request</p>

                          


                        </section>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default RadiantMoon;