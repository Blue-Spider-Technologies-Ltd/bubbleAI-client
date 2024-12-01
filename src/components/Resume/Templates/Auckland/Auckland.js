import React from "react";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import arrowIcon from '../../../../images/arrow.png'
import mobileIcon from '../../../../images/phone.png'
import pinIcon from '../../../../images/pin2.png'
import emailIcon from '../../../../images/mail.png'
import linkIcon from '../../../../images/globe.png'

////FONTS
import TinosRegular from '../../../../assets/fonts/tinos/Tinos-Regular.ttf';
import RobotoBold from '../../../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../../../assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoLightItalic from '../../../../assets/fonts/Roboto/Roboto-LightItalic.ttf'
import TinosBold from '../../../../assets/fonts/tinos/Tinos-Bold.ttf';
// import TinosItalic from '../../../../assets/fonts/Tinos-Italic.ttf';


Font.register({
    family: 'Tinos',
    fonts: [
      { src: TinosRegular }
    ],
});

Font.register({
    family: 'TinosBold',
    fonts: [
      { src: TinosBold }
    ],
});

// Register the fonts
Font.register({
  family: 'RobotoLightItalic',
  fonts: [
    { src: RobotoLightItalic },
  ],
});

Font.register({
    family: 'RobotoBold',
    fonts: [
      { src: RobotoBold }
    ],
});

Font.register({
    family: 'RobotoRegular',
    fonts: [
      { src: RobotoRegular }
    ],
});




const styles = StyleSheet.create({
    Container: {
        boxSizing: 'border-box',
        display: "block",
        textAlign: 'left',
        lineHeight: 1.2,
        fontSize: 9.5,
        fontFamily: 'RobotoRegular',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    flexCont: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto'
    },
    leftCont: {
        backgroundColor: '#F1F1F1',
        width: '37.5%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        height: 'auto'
    },
    rightCont: {
        boxSizing: 'border-box',
        width: '62.5%',
        height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
    },
    imgCont: {
        boxSizing: 'border-box',
        width: 110,
        height: 110,
        borderRadius: '50%',
        border: '2px solid black',
        margin: 'auto',
        overflow: 'hidden'
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: '50%',
        margin: 'auto',
    },
    sectionHeader: {
        textTransform: 'uppercase',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        marginTop: 15,
        fontSize: 12.2,
        fontFamily: 'Tinos',
        fontWeight: '400',
        letterSpacing: 2,
        display: 'flex',
        justifyContent: 'center',
        height: 20
    },
    group: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%'
    },
    member: {
        marginBottom: 13
    },
    contact: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 4,
        paddingBottom: 4,
        width: '100%'
    },
    contactIcon: {
        height: 12,
        width: 12,
        marginRight: 9
    },
    contactText: {
        paddingBottom: 4,
        borderBottom: '0.5px solid black',
        width: '100%'
    },
    title: {
        fontFamily: 'RobotoBold',
        fontSize: 10.5,
        marginBottom: 1
    },
    date: {
        fontFamily: 'RobotoLightItalic',
    },
    name: {
        display: 'block',
        fontFamily: 'Tinos',
        marginBottom: 10,
        marginTop: 10
    },
    jobPosition: {
        fontFamily: 'RobotoBold',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    link: {
        color: '#0077b6'
    },
    profSummary: {
        display: 'block',
        marginBottom: 2,
        marginTop: 10
    },
    workExpBall: {
        boxSizing: 'border-box',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid #323033',
        padding: 2,
        marginTop: -5
    },
    workExpBallInner: {
        color: 'white',
        backgroundColor: '#323033',
        boxSizing: 'border-box',
        width: 34,
        height: 34,
        borderRadius: '50%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    industry: {
        color: 'rgba(0, 0, 0, 0.454)',
        margin: 0
    },
    jobDescGroup: {
        display: 'block',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 6,
        marginBottom: 10,
        borderBottom: '1.2px solid #323033',
        paddingBottom: 25
    },
    jobDesc: {
        display: 'flex', 
        alignItems: 'flex-start', 
        flexDirection: 'row', 
        marginBottom: 3,
    },
    jobText: {
        display: 'block', 
        marginLeft: 8
    },
    verticalLine: {
        width: 1.2, // Width of the line
        height: '73%', 
        position: 'absolute',
        top: 53,
        left: 18,
        backgroundColor: '#323033', 
    },
    SkillItems: {
        display: 'block'
    },
    bulletIcon: {
        height: 2,
        width: 2,
        marginRight: 4
    },
});






const Auckland = ({ resume, imgUrl }) => {


    return(
        <Document>
            <Page size="A4" style={styles.Container}>

                <View style={styles.flexCont}>

                    <View style={styles.leftCont}>
                        <View style={styles.imgCont}>
                            <Image style={styles.image} src={imgUrl} />
                        </View>

                        <View  style={{marginTop: 25}}>
                            <View>
                                <View style={styles.sectionHeader}><Text>CONTACT</Text></View>
                                
                                <View style={styles.group}>
                                    <View style={styles.contact}>
                                        <View><Image style={styles.contactIcon} src={mobileIcon} /></View>
                                        <View style={styles.contactText}><Text>{resume?.basicInfo?.mobile}</Text></View>
                                    </View>

                                    <View style={styles.contact} href={`mailto:${resume?.basicInfo?.email}`}>
                                        <View><Image style={styles.contactIcon} src={emailIcon} /></View>
                                        <View style={styles.contactText}><Text>{resume?.basicInfo?.email}</Text></View>
                                    </View>

                                    <View style={styles.contact}>
                                        <View><Image style={styles.contactIcon} src={pinIcon} /></View>
                                        <View style={styles.contactText}><Text>{resume?.basicInfo?.city}, {resume?.basicInfo?.country}</Text></View>
                                    </View>

                                    {resume?.linkInfo && (
                                        <View>
                                            {resume.linkInfo.map((link, index) => (
                                                <View key={index} style={styles.contact}  href={link}>
                                                    <View><Image style={styles.contactIcon} src={linkIcon} /></View>
                                                    <View style={{...styles.contactText, borderBottom: index === resume.linkInfo.length - 1 ? 'none' : '0.5px solid black' }}><Text>{link}</Text></View>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                </View>
                            </View>

                            
                            {resume?.skills && (
                                <View>
                                    <View style={styles.sectionHeader}><Text>SKILLS</Text></View>

                                    <View style={styles.group}>
                                        {resume.skills.map((skill, index) => (
                                            <View key={index} style={styles.contact}>
                                                <View><Image style={styles.contactIcon} src={arrowIcon} /></View>
                                                <View style={styles.SkillItems}><Text>{capitalizeWords(skill)}</Text></View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}


                            {resume?.eduArray && (
                                <View>
                                    <View style={styles.sectionHeader}><Text>EDUCATION</Text></View>
                                    
                                    <View style={styles.group}>
                                        {resume.eduArray.map((eduInfo, index) => (
                                            <View key={index} style={styles.member}>
                                                <Text style={styles.title}>{capitalizeAllLetters(eduInfo.degree)}</Text>
                                                <Text>{capitalizeWords(eduInfo.institution)}</Text>
                                                <Text style={styles.date}>{getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {resume?.awardArray && (
                                <View>
                                    {resume.awardArray.length > 0 && (
                                        <View>
                                            <View style={styles.sectionHeader}><Text>AWARDS</Text></View>
                                            <View style={styles.group}>
                                                {resume.awardArray.map((awardInfo, index) => (
                                                    <View key={index} style={styles.member}>
                                                        <Text style={styles.title}>{capitalizeAllLetters(awardInfo?.award)}</Text>
                                                        <Text>{capitalizeWords(awardInfo.org)}</Text>
                                                        <Text style={styles.date}>{getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.rightCont}>
                        
                            <View style={styles.name}>
                                <Text style={{display: 'block', fontSize: 25, marginBottom: 0}}>{capitalizeAllLetters(resume?.basicInfo?.firstName || '')}</Text>
                                <Text style={{display: 'block', fontSize: 30, marginTop: -5}}>{capitalizeAllLetters(resume?.basicInfo?.lastName || '')}</Text>
                            </View>
                            <Text style={styles.jobPosition}>{resume?.basicInfo?.jobPosition}</Text>

                            <View style={{marginTop: 40}}>
                                <View>
                                    <View style={styles.sectionHeader}><Text>SUMMARY</Text></View>
                                    <Text style={styles.group}>{resume?.basicInfo?.profSummary}</Text>
                                </View>

                                {resume?.workExpArray && (
                                    <View style={{ position: 'relative' }}>
                                        <View style={styles.sectionHeader}><Text>WORK EXPERIENCE</Text></View>

                                        <View style={styles.group}>
                                            {resume.workExpArray.map((workInfo, index) => (
                                                <View key={index} style={{ marginBottom: 20, display: 'flex', flexDirection: 'row' }}>
                                                    <View style={{width: '15%', position: 'relative', flexDirection: 'column' }}>
                                                        <View style={styles.workExpBall}>
                                                            <View style={styles.workExpBallInner}>
                                                                <Text style={styles.date}>
                                                                    {workInfo.dateFrom.slice(0, 4)} {workInfo.currently ? "Present" : workInfo.dateTo.slice(0, 4)}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        <View style={styles.verticalLine} />
                                                    </View>

                                                    <View style={{width: '85%'}}>
                                                        <View>
                                                            <Text style={styles.title}>{capitalizeAllLetters(workInfo.position)} | {capitalizeWords(workInfo?.company)}</Text> 
                                                            {workInfo.workLink && <Text style={{...styles.link, marginBottom: 2}} href={workInfo.workLink}> ({workInfo.workLink})</Text>} 
                                                            

                                                        </View>
                                                        <Text style={styles.industry}>{workInfo.industry}</Text>
                                                        <View style={styles.jobDescGroup}>
                                                            {workInfo.jobDesc.split(";").map((item, index) => (
                                                                <View key={index} style={styles.jobDesc}>
                                                                    <Text>• </Text>
                                                                    <Text style={styles.jobText}>{item.trim()}</Text>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    </View>

                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {resume?.publications && (
                                    <View>
                                        {resume.publications.length > 0 && (
                                            <View>
                                                <View style={styles.sectionHeader}><Text>PROJECTS</Text></View>
                                                
                                                <View style={styles.group}>
                                                    {resume.publications.map((publication, index) => (
                                                        <View key={index} style={{ marginBottom: 20, display: 'flex', flexDirection: 'row' }}>
                                                            <View style={{width: '15%'}}>
                                                                <View style={styles.workExpBall}>
                                                                    <View style={styles.workExpBallInner}>
                                                                        <Text style={styles.date}>
                                                                            {getMonthShortName(publication?.date) + " " + publication?.date.slice(0, 4)}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>

                                                            <View style={{width: '85%'}}>
                                                                <View>
                                                                    <Text style={styles.title}>{capitalizeAllLetters(publication.title)}</Text> 
                                                                </View>
                                                                <Text style={styles.industry}>{publication.source}</Text>
                                                            </View>

                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                )}

                                <View>
                                    <View style={styles.sectionHeader}><Text>REFERENCES</Text></View>
                                    <View style={styles.group}>
                                        <Text>Available on request</Text>
                                    </View>
                                </View>
                            </View>
                    </View>

                </View>

            </Page>
        </Document>
    )
};

export default Auckland;