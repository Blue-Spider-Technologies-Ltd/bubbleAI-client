import React from "react";
import css from "./FlyingFish.module.css"
import { MdSettingsPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { Grid } from "@mui/material";
import { getMonthShortName, capitalizeWords } from "../../../../utils/client-functions";


const FlyingFish = (props) => {

    return (
        <div className={css.fishContainer}>
            <Grid container className={css.topCont}>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={8} sx={{textAlign: 'center'}}>
                    <h1>{capitalizeWords(props.resume?.basicInfo?.firstName) + " " + capitalizeWords(props.resume?.basicInfo?.lastName)}</h1>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={4}>
                    <section className={css.LeftBg}>
                        <div className={css.ImgContainer}>
                            <img src={props.imgUrl} alt="avatar" width={"100%"} />
                        </div>

                        <div style={{lineHeight: "2"}}>
                            <div>
                                <MdSettingsPhone className={css.Icons} /> {props.resume?.basicInfo?.mobile}
                            </div>

                            <div>
                                <MdEmail className={css.Icons} /> {props.resume?.basicInfo?.email}
                            </div>
                            
                            {props.resume?.linkInfo?.length > 0 && (
                                <div className={css.Sections}>
                                    {props.resume.linkInfo.map((link, index) => (
                                        <div key={index}>
                                            <TbWorldWww className={css.Icons} /> <a href={link} className={css.link}>{link}</a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {props.resume?.skills?.length > 0 && (
                            <div>
                                <h3>EXPERTISE</h3>
                                <hr />
                                {props.resume.skills.map((skill, index) => (
                                    <div key={index} className={css.SkillItems}>{skill}</div>
                                ))}
                            </div>
                        )}

                        {props.resume?.interests?.length > 0 && (
                            <div>
                                <h3>HOBBIES</h3>
                                <hr />
                                {props.resume.interests.map((interest, index) => (
                                    <div key={index} className={css.SkillItems}>{interest}</div>
                                ))}
                            </div>
                        )}

                    </section>                   
                </Grid>

                <Grid item xs={8} className={css.RightBg}>
                    <h3>{capitalizeWords(props.resume?.basicInfo?.jobPosition)}</h3>
                    <hr />

                    <div style={{marginTop: "1rem"}}>
                        <section>
                            <h4>PROFILE</h4>
                            <div style={{marginBottom: "30px"}}>
                                {props.resume?.basicInfo?.profSummary}
                            </div>

                        </section>

                        <section>
                            {props.resume?.workExpArray && (
                                <div>
                                    <h4>EXPERIENCE</h4>
                                    {props.resume?.workExpArray.map((workInfo, index) => (
                                        <div key={index} className={css.Sections}>
                                            <h5>
                                                <span>{workInfo.position} </span><br />
                                            </h5>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginBottom: '10px' }}>
                                                {capitalizeWords(workInfo.company) + " (" + getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present)" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4) + ") "}
                                            </div>
                                            
                                            {workInfo.jobDesc.split(";").map((item, index) => (
                                                <div key={index}>{item.trim()}</div>
                                            ))}
                                
                                        </div>
                                    ))}
                                </div>
                            )}

                            {props.resume?.eduArray && (
                                <div>
                                    <h4>EDUCATION</h4>
                                    {props.resume?.eduArray?.map((eduInfo, index) => (
                                        <div key={index}>
                                            <h5>
                                                <span>{capitalizeWords(eduInfo.degree)} </span><br />
                                            </h5>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginBottom: '25px' }}>
                                                {capitalizeWords(eduInfo.institution) + " | " + getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            
                            {props.resume?.awardArray && (
                                <div>
                                    {props.resume.awardArray.length > 0 && (
                                        <section>
                                            <h4>CERTIFICATIONS</h4>
                                            {props.resume.awardArray.map((awardInfo, index) => (
                                                <div key={index} style={{marginBottom: "10px"}}>
                                                    <h5>
                                                        <span>{awardInfo.award} </span><br />
                                                    </h5>
                                                    <div style={{ color: "rgba(0, 0, 0, 0.454)", marginBottom: '25px' }}>
                                                        {capitalizeWords(awardInfo.org) + " | " + getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}
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
                                            <h4>PUBLICATIONS</h4>
                                            {props.resume.publications.map((publication, index) => (
                                                <p key={index}>{publication.title + ", " + publication.source + ", " + getMonthShortName(publication?.date) + " " + publication.date.slice(0, 4)}</p>
                                            ))}
                                        </section>
                                    )}
                                </div>
                            )}                       

                        </section>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default FlyingFish;