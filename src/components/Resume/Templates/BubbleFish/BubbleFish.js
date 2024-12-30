import React from "react";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import phnIcon from '../../../../images/phnfish.png'
import pinIcon from '../../../../images/pinfish.png'
import emIcon from '../../../../images/emfish.png'
import linkIcon from '../../../../images/www.png'


////FONTS
import RobotoConBlack from '../../../../assets/fonts/RobotoCondenced/RobotoCondensed-Black.ttf';
import RobotoConBold from '../../../../assets/fonts/RobotoCondenced/RobotoCondensed-Bold.ttf';
import RobotoConMed from '../../../../assets/fonts/RobotoCondenced/RobotoCondensed-Medium.ttf';

Font.register({
    family: 'RobotoConBlack',
    fonts: [
      { src: RobotoConBlack }
    ],
});

Font.register({
    family: 'RobotoConBold',
    fonts: [
      { src: RobotoConBold }
    ],
});

Font.register({
    family: 'RobotoConMed',
    fonts: [
      { src: RobotoConMed }
    ],
});


const styles = StyleSheet.create({
    Container: {
        color: '#000000eb',
        display: "block",
        padding: 20,
        textAlign: 'left',
        lineHeight: 1.2,
        fontSize: 9.3,
        fontFamily: 'RobotoConMed',
        margin: 0
    },
    basicInfo: {
        lineHeight: 1,
        marginBottom: 2
    },
    name: {
        color: '#000000',
        display: 'block',
        fontSize: 22,
        fontFamily: 'RobotoConBlack',
        marginBottom: 1,
    },
    jobPosition: {
        color: '#19ADB2',
        display: 'block',
        fontSize: 13,
        fontFamily: 'RobotoConBold',
        marginBottom: 2,
    },
    contact: {
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    link: {
        color: '#19ADB2'
    },
    profSummary: {
        display: 'block',
        marginBottom: 2,
    },
    sectionHeader: {
        color: '#000000',
        display: 'block',
        textTransform: 'uppercase',
        borderBottom: '2px solid black',
        marginTop: 10,
        marginBottom: 4,
        fontSize: 13,
        fontFamily: 'RobotoConBold',
    },
    leftCont: {
        width: '65%',
        paddingRight: 30
    },
    rightCont: {
        width: '35%',
    },
    date: {
        fontSize: 8,
        color: 'rgba(0, 0, 0, 0.454)',
        margin: 0
    },
    jobDescGroup: {
        display: 'block',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 6,
        marginBottom: 4,
    },
    jobDesc: {
        display: 'flex', // Use flex to align items horizontally
        alignItems: 'flex-start', // Align items to the start
        flexDirection: 'row', 
        marginBottom: 3,
    },
    jobText: {
        display: 'block', // Ensure the text behaves as a block element
        marginLeft: 8, // Add left margin if you want to indent the text further
    },
    Education: {
        marginBottom: 7,
        display: 'block'
    },
    FlexContainer: {
        display: 'flex',
        flexDirection: 'row', 
        // justifyContent: 'space-between',
    },
    SkillContainer: {
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',     
        marginBottom: 5,      
    },
    SkillItems: {
        color: 'black',
        marginTop: 4,
        marginRight: 10,
        position: 'relative',
        borderBottom: '1px solid #19ADB2'
    },
    smallIcon: {
        height: 9,
        width: 9
    },
});


const BubbleFish = ({resume}) => {
    return (
        <Document>
            <Page size="A4" style={styles.Container}>
                <View>
                    <Text style={styles.name}>
                        {capitalizeAllLetters(resume?.basicInfo?.firstName || '')} {capitalizeAllLetters(resume?.basicInfo?.lastName || '')}
                    </Text>
                    <Text style={styles.jobPosition}>{capitalizeWords(resume?.basicInfo?.jobPosition)}</Text>

                    <View style={styles.basicInfo}>
                        <View style={styles.contact}>
                            <Text><Image style={styles.smallIcon} src={phnIcon} /> &nbsp;&nbsp;&nbsp;{resume?.basicInfo?.mobile}</Text> 
                            <Text href={`mailto:${resume?.basicInfo?.email}`}><Image style={styles.smallIcon} src={emIcon} /> &nbsp;&nbsp;&nbsp;{resume?.basicInfo?.email}</Text>
                            <Text><Image style={styles.smallIcon} src={pinIcon} /> &nbsp;&nbsp;{resume?.basicInfo?.city}, {resume?.basicInfo?.country}</Text>
                        </View>
                        
                        {resume?.linkInfo && (
                            <View style={styles.contact}>
                                {resume.linkInfo.map((link, index) => (
                                    <Text key={index} style={styles.link} href={link}>
                                        <Image style={styles.smallIcon} src={linkIcon} /> &nbsp;&nbsp;&nbsp;{link}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>

                    <View>
                        <Text style={styles.sectionHeader}>Profile</Text>
                        <Text style={styles.profSummary}>{resume?.basicInfo?.profSummary}</Text>
                    </View>

                    <View style={styles.FlexContainer}>

                        <View style={styles.leftCont}>
                            {resume?.workExpArray && (
                                <View>
                                    <Text style={styles.sectionHeader}>Experience</Text>
                                    {resume.workExpArray.map((workInfo, index) => (
                                        <View key={index} style={styles.Education}>
                                            <Text style={{fontSize: 13}}>{capitalizeWords(workInfo.position)}</Text> 
                                            <Text style={{color: '#19ADB2'}}>{workInfo?.company} {workInfo.workLink && <Text style={styles.link} href={workInfo.workLink}> ({workInfo.workLink})</Text>}</Text>
                                            <Text>{workInfo.industry}</Text>
                                            <Text style={styles.date}>
                                                {getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4)}
                                            </Text>

                                            <View style={styles.jobDescGroup}>
                                                {workInfo.jobDesc.split(";").map((item, index) => (
                                                    <View key={index} style={styles.jobDesc}>
                                                        <Text>• </Text>
                                                        <Text style={styles.jobText}>{item.trim()}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {resume?.publications && (
                                <View>
                                    {resume.publications.length > 0 && (
                                        <View>
                                            <Text style={styles.sectionHeader}>Publications</Text>
                                            <View>
                                                {resume.publications.map((publication, index) => (
                                                    <View key={index} style={styles.jobDesc}>
                                                        <Text>• </Text>
                                                        <Text style={styles.jobText}>{capitalizeWords(publication.title) + ", " + publication.source + ", " + getMonthShortName(publication?.date) + " " + publication?.date.slice(0, 4)}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}

                            {resume?.eduArray && (
                                <View>
                                    <Text style={styles.sectionHeader}>Education</Text>
                                    {resume.eduArray.map((eduInfo, index) => (
                                        <View key={index} style={styles.Education}>
                                            <Text style={{fontSize: 13}}>{capitalizeWords(eduInfo.degree)}</Text> 
                                            <Text style={{color: '#19ADB2'}}>{capitalizeWords(eduInfo.institution)}</Text>
                                            <Text style={styles.date}>{getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.rightCont}>
                            {resume?.skills && (
                                <View>
                                    <Text style={styles.sectionHeader}>Skills & Expertise</Text>
                                    <View style={styles.SkillContainer}>
                                        {resume.skills.map((skill, index) => (
                                            <Text key={index} style={styles.SkillItems}>{skill}</Text>
                                        ))}
                                    </View>
                                </View>
                            )}


                            {resume?.awardArray && (
                                <View>
                                    {resume.awardArray.length > 0 && (
                                        <View>
                                            <Text style={styles.sectionHeader}>Certifications & Awards</Text>
                                            {resume.awardArray.map((awardInfo, index) => (
                                                <View key={index} style={styles.Education}>
                                                    <Text style={{fontSize: 13}}>{capitalizeWords(awardInfo.award)}</Text> 
                                                    <Text style={{color: '#19ADB2'}}>{capitalizeWords(awardInfo.org)}</Text>
                                                    <Text style={styles.date}>{getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}

                            {resume?.languages && (
                                <View>
                                    {resume.languages.length > 0 && (
                                        <View>
                                            <Text style={styles.sectionHeader}>LANGUAGE PROFICIENCIES</Text>
                                            <View style={styles.SkillContainer}>
                                                {resume.languages.map((language, index) => (
                                                    <Text key={index} style={styles.SkillItems}>{language.language} ({language.level}/5)</Text>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}

                            {resume?.interests && (
                                <View>
                                    {resume.interests.length > 0 && (
                                        <View>
                                            <Text style={styles.sectionHeader}>Interests</Text>
                                            <View style={styles.SkillContainer}>
                                                {resume.interests.map((interest, index) => (
                                                    <Text key={index} style={styles.SkillItems}>{interest}</Text>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                        
                    </View>
                </View>
            </Page>
        </Document>
    )

};

export default BubbleFish;