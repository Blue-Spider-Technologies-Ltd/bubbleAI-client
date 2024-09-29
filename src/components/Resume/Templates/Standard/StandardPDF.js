import React from "react";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import favIcon from '../../../../images/fav.png'
import psychIcon from '../../../../images/psych.png'
import mobileIcon from '../../../../images/mobile.png'
import pinIcon from '../../../../images/pin.png'
import emailIcon from '../../../../images/email.png'
import pointIcon from '../../../../images/point.png'
import linkIcon from '../../../../images/link.png'


const styles = StyleSheet.create({
    StandardContainer: {
        display: "block",
        padding: 20,
        textAlign: 'left',
        lineHeight: 1.2,
        fontSize: 9,
        fontWeight: '400',
        margin: 0
    },
    basicInfo: {
        lineHeight: 1,
        marginBottom: 2
    },
    name: {
        display: 'block',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    jobPosition: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 2,
    },
    contact: {
        marginBottom: 2,
        display: 'block',
    },
    link: {
        color: '#0077b6'
    },
    profSummary: {
        display: 'block',
        marginBottom: 2,
        marginTop: 10
    },
    sectionHeader: {
        display: 'block',
        textTransform: 'uppercase',
        borderBottom: '1px solid black',
        marginTop: 10,
        marginBottom: 4,
        fontSize: 10,
        fontWeight: 'bold',
    },
    workInfo: {
        margin: 0,
        fontSize: 11,
        fontWeight: 'bold'
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
    eduInstitution: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    FlexContainer: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    SkillContainer: {
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',     
        marginBottom: 5,      
    },
    SkillItems: {
        marginTop: 4,
        marginRight: 10,
        position: 'relative'
    },
    publication: {
        display: 'block'
    },
    icon: {
        display: "flex",
        height: 7,
        width: 7,
        margin: 0,
        marginRight: 10,
        color: "black"
    },
    smallIcon: {
        height: 9,
        width: 9
    },
    bulletIcon: {
        height: 2,
        width: 2,
        marginRight: 4
    },
});






const StandardPDF = ({resume}) => (
    <Document>
        <Page size="A4" style={styles.StandardContainer}>
            <View>
                <Text style={styles.name}>
                    {capitalizeAllLetters(resume?.basicInfo?.firstName || '')} {capitalizeAllLetters(resume?.basicInfo?.lastName || '')}
                </Text>
                <Text style={styles.jobPosition}>{capitalizeWords(resume?.basicInfo?.jobPosition)}</Text>

                <View style={styles.basicInfo}>
                    <Text style={styles.contact}>
                        <Image style={styles.smallIcon} src={mobileIcon} /> {resume?.basicInfo?.mobile} | <Text style={styles.link} href={`mailto:${resume?.basicInfo?.email}`}><Image style={styles.smallIcon} src={emailIcon} /> {resume?.basicInfo?.email}</Text> | <Image style={styles.smallIcon} src={pinIcon} /> {resume?.basicInfo?.city}, {resume?.basicInfo?.country}.
                    </Text>
                    
                    {resume?.linkInfo && (
                        <View style={styles.contact}>
                            {resume.linkInfo.map((link, index) => (
                                <Text key={index} style={styles.link} href={link}>
                                    <Image style={styles.smallIcon} src={linkIcon} /> {link}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.profSummary}>{resume?.basicInfo?.profSummary}</Text>
                    {resume?.skills && (
                        <View>
                            <Text style={styles.sectionHeader}>Skills & Expertise</Text>
                            <View style={styles.SkillContainer}>
                                {resume.skills.map((skill, index) => (
                                    <Text key={index} style={styles.SkillItems}><Image style={styles.icon} src={psychIcon} />{skill}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                    {resume?.workExpArray && (
                        <View>
                            <Text style={styles.sectionHeader}>Relevant Experience</Text>
                            {resume.workExpArray.map((workInfo, index) => (
                                <View key={index} style={styles.Education}>
                                    <View style={styles.FlexContainer}>
                                        <Text style={styles.workInfo}>
                                            <Text>{capitalizeWords(workInfo.position)} - {capitalizeAllLetters(workInfo?.company)} 
                                                {workInfo.workLink && <Text style={styles.link} href={workInfo.workLink}>({workInfo.workLink})</Text>} 
                                            </Text>
                                        </Text>
                                        <Text style={styles.date}>
                                            {getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4)}
                                        </Text>
                                    </View>
                                    <Text style={styles.industry}>{workInfo.industry}</Text>
                                    <View style={styles.jobDescGroup}>
                                        {workInfo.jobDesc.split(";").map((item, index) => (
                                            <View key={index} style={styles.jobDesc}>
                                                <Text><Image style={styles.bulletIcon} src={pointIcon} /></Text>
                                                <Text style={styles.jobText}>{item.trim()}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                    {resume?.eduArray && (
                        <View>
                            <Text style={styles.sectionHeader}>Education</Text>
                            {resume.eduArray.map((eduInfo, index) => (
                                <View key={index} style={styles.Education}>
                                    <Text style={styles.eduInstitution}>{capitalizeWords(eduInfo.institution)}</Text>
                                    <View style={styles.FlexContainer}>
                                        <Text style={styles.industry}>{capitalizeWords(eduInfo.degree)}</Text>
                                        <Text>{getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                    {resume?.awardArray && (
                        <View>
                            {resume.awardArray.length > 0 && (
                                <View>
                                    <Text style={styles.sectionHeader}>Certifications & Awards</Text>
                                    {resume.awardArray.map((awardInfo, index) => (
                                        <View key={index} style={styles.Education}>
                                            <Text style={styles.eduInstitution}>{capitalizeWords(awardInfo?.org)}</Text>
                                            <View style={styles.FlexContainer}>
                                                <Text style={styles.industry}>{capitalizeWords(awardInfo?.award)}</Text>
                                                <Text>{getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
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
                                                <Text><Image style={styles.bulletIcon} src={pointIcon} /></Text>
                                                <Text style={styles.jobText}>{capitalizeWords(publication.title) + ", " + publication.source + ", " + getMonthShortName(publication?.date) + " " + publication?.date.slice(0, 4)}</Text>
                                            </View>
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
                                            <Text key={index} style={styles.SkillItems}><Image style={styles.icon} src={favIcon} /> {interest}</Text>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </Page>
    </Document>
);

export default StandardPDF;