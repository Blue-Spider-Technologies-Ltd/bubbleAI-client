import React from "react";
import standardCss from "./Standard.module.css"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Standard = (props) => {
    return (
        <div className={standardCss.StandardContainer}>
            <div className={standardCss.basicInfo}>
                <h3>{props.resume?.basicInfo?.firstName} {props.resume?.basicInfo?.lastName}</h3>
                <span>{props.resume?.basicInfo?.mobile}</span> <span><a href={`mailto:${props.resume?.basicInfo?.email}`}>{props.resume?.basicInfo?.email}</a></span>

                {props.resume?.linkInfo && (
                    <div>
                        {props.resume.linkInfo.length > 0 && props.resume.linkInfo.map((link, index) => (
                            <span key={index}><a href={link}>{link}</a> </span>
                        ))}
                    </div>
                )}

            </div>
            <div className={standardCss.resBody}>
                <div className={standardCss.profSummary}>{props.resume?.basicInfo?.profSummary}</div>

                {props.resume?.eduArray && (
                    <section>
                        <h3>Education</h3>
                        {props.resume.eduArray.map((eduInfo, index) => (
                            <div key={index} className={standardCss.Education}>
                                <h5>{eduInfo.institution}</h5>
                                <div className={standardCss.FlexContainer}>
                                    <div><span>{eduInfo.degree}</span></div>
                                    <div>{eduInfo.date.slice(0, 4)}</div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}


                {props.resume?.workExpArray && (
                    <section>
                        <h3>Relevant Experience</h3>
                        {props.resume.workExpArray.map((workInfo, index) => (
                            <div key={index}>
                                <div className={standardCss.FlexContainer}>
                                    <div>
                                        <h5 style={{ display: "inline" }}>
                                            <span>{workInfo.position} - {workInfo.company}</span>{" "}
                                            {workInfo.workLink && <a href={workInfo.workLink}>({workInfo.workLink})</a>}
                                        </h5>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <span>{workInfo.dateFrom} - {workInfo.currently ? "Present" : workInfo.dateTo}</span>
                                    </div>
                                </div>
                                <div style={{ color: "rgba(0, 0, 0, 0.454)" }}>{workInfo.industry}</div>
                                <ul>
                                    {workInfo.jobDesc.split(";").map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {props.resume?.skills && (
                    <section>
                        <h3>Skills & Proficiencies</h3>
                        <div className={standardCss.Skills}>
                            {props.resume.skills.map((skill, index) => (
                                <span key={index} className={standardCss.SkillItems}><PsychologyIcon fontSize="inherit" /> <span>{skill}</span></span>
                            ))}
                        </div>
                    </section>
                )}


                {props.resume?.awardArray && (
                    <div>
                        {props.resume.awardArray.length > 0 && (
                            <section>
                                <h3>Certifications & Awards</h3>
                                {props.resume.awardArray.map((awardInfo, index) => (
                                    <div key={index} className={standardCss.Education}>
                                        <h5>{awardInfo.org}</h5>
                                        <div className={standardCss.FlexContainer}>
                                            <div><span>{awardInfo.award}</span></div>
                                            <div>{awardInfo.date.slice(0, 4)}</div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>
                )}

                {props.resume?.publications && (
                    <div>
                        {props.resume.publications.length > 0 && (
                            <section>
                                <h3>Publications</h3>
                                <ul>
                                    {props.resume.publications.map((publication, index) => (
                                        <li key={index}>{publication.title + ", " + publication.source + ", " + publication.date.slice(0, 4)}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                )}

                {props.resume?.interests && (
                    <div>
                        {props.resume.interests.length > 0 && (
                            <section>
                                <h3>Interests</h3>
                                <div className={standardCss.Skills}>
                                    {props.resume.interests.map((interest, index) => (
                                        <span key={index} className={standardCss.SkillItems}><FavoriteIcon fontSize="inherit" /> <span>{interest}</span></span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Standard;