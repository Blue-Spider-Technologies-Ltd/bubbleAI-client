import React from "react";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import mobileIcon from '../../../../images/mobile.png'
import pinIcon from '../../../../images/pin.png'
import emailIcon from '../../../../images/email.png'
import linkIcon from '../../../../images/link.png'
import diamondIcon from '../../../../images/diamond.png'


const styles = StyleSheet.create({
    StandardContainer: {
        display: "block",
        padding: 20,
        textAlign: 'left',
        lineHeight: 1.2,
        fontSize: 9.3,
        fontWeight: '400',
        margin: 0
    },
    basicInfo: {
        lineHeight: 1,
        marginBottom: 2
    },
    image: {
        width: 120,
        height: '100%'
    },
    name: {
        color: '#002A7F',
        display: 'block',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    jobPosition: {
        color: '#59ACF3',
        display: 'block',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 2,
    },
    contact: {
        marginBottom: 2,
        display: 'block',
        fontSize: 10
    },
    link: {
        color: '#59ACF3',
    },
    profSummary: {
        display: 'block',
        marginBottom: 2,
        marginTop: 2
    },
    sectionHeader: {
        color: '#002A7F',
        display: 'block',
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 4,
        fontSize: 13,
        fontWeight: 'bold',
    },
    industry: {
        color: 'rgba(0, 0, 0, 0.454)',
    },
    jobDescGroup: {
        display: 'block',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        marginBottom: 6,
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
    position: {
        color: '#002A7F',
        display: 'block',
        fontSize: 12
    },
    FlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 15
    },
    leftOfFlex: {
        flex: '0 0 25%', // No growth, no shrink, 25% basis
    },
    rightOfFlex: {
        flex: '0 0 75%', // No growth, no shrink, 60% basis
        borderLeft: '1px solid #002A7F',
        paddingLeft: 15,
    },
    date: {
        color: '#002A7F',
        display: 'block',
        fontWeight: 'bold',
        marginBottom: 6
    },
    company: {
        color: '#59ACF3',
        fontWeight: 'bold'
    },
    SkillContainer: {
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',     
        marginBottom: 5,      
    },
    SkillItems: {
        marginRight: 10,
        marginBottom: 3,
        paddingBottom: 3,
        position: 'relative',
        borderBottom: '1px solid #002A7F'
    },
    publication: {
        display: 'block'
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
    diamondIcon: {
        height: 10,
        width: 10,
    },
});






const EuroPass = ({resume, imgUrl}) => (
    <Document>
        <Page size="A4" style={styles.StandardContainer}>
            <View>
                <View style={{ ...styles.FlexContainer, height: 120 }}>
                    <View style={styles.leftOfFlex}>
                        <Image style={styles.image} src={imgUrl} />
                    </View>

                    <View style={{ ...styles.rightOfFlex, borderLeft: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <Text style={styles.name}>
                            {capitalizeAllLetters(resume?.basicInfo?.firstName || '')} {capitalizeAllLetters(resume?.basicInfo?.lastName || '')}
                        </Text>
                        <Text style={styles.jobPosition}>{capitalizeWords(resume?.basicInfo?.jobPosition)}</Text>

                        <View style={styles.basicInfo}>
                            <Text style={styles.contact}>
                                <Text><Image style={styles.smallIcon} src={mobileIcon} /> {resume?.basicInfo?.mobile}</Text> | <Text style={styles.link} href={`mailto:${resume?.basicInfo?.email}`}><Image style={styles.smallIcon} src={emailIcon} /> {resume?.basicInfo?.email}</Text> | <Text><Image style={styles.smallIcon} src={pinIcon} /> {resume?.basicInfo?.city}, {resume?.basicInfo?.country}</Text>.
                            </Text>
                            
                            {resume?.linkInfo && (
                                <View style={{ ...styles.contact, display: 'flex', justifyContent: 'space-between'}}>
                                    {resume.linkInfo.map((link, index) => (
                                        <Text key={index} style={styles.link} href={link}>
                                            <Image style={styles.smallIcon} src={linkIcon} /> {link}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>


                <View>
                    <Text style={styles.sectionHeader}>Summary</Text>
                    <Text style={styles.profSummary}>{resume?.basicInfo?.profSummary}</Text>

                    {resume?.workExpArray && (
                        <View>
                            <Text style={styles.sectionHeader}>Relevant Experience</Text>
                            
                            {resume.workExpArray.map((workInfo, index) => (
                                <View key={index} style={styles.FlexContainer}>
                                    <View style={styles.leftOfFlex}>
                                        <Text style={styles.date}>
                                            {getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4)}
                                        </Text>
                                        <Text style={styles.industry}>
                                            {workInfo.industry}
                                        </Text>
                                    </View>
                                    <View style={styles.rightOfFlex}>
                                        <View key={index} style={{ ...styles.jobDesc, position: 'relative'}}>
                                            <Text style={{position: 'absolute', left: -20, top: 2}}><Image style={styles.diamondIcon} src={diamondIcon} /></Text>
                                            <Text style={styles.position}>{capitalizeWords(workInfo.position)}</Text>
                                        </View>
                                        
                                        <Text style={styles.company}>
                                            {capitalizeAllLetters(workInfo?.company)}
                                        </Text>
                                        {workInfo.workLink && <Text style={styles.link} href={workInfo.workLink}> ({workInfo.workLink})</Text>} 

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
                    )}

                    {resume?.eduArray && (
                        <View>
                            <Text style={styles.sectionHeader}>Education</Text>
                            
                            {resume.eduArray.map((eduInfo, index) => (
                                <View key={index} style={styles.FlexContainer}>
                                    <View style={styles.leftOfFlex}>
                                        <Text style={styles.date}>
                                            {getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}
                                        </Text>
                                    </View>
                                    <View style={styles.rightOfFlex}>
                                        <View key={index} style={{ ...styles.jobDesc, position: 'relative'}}>
                                            <Text style={{position: 'absolute', left: -20, top: 2}}><Image style={styles.diamondIcon} src={diamondIcon} /></Text>
                                            <Text style={styles.position}>{capitalizeWords(eduInfo.degree)}</Text>
                                        </View>
                                        
                                        <Text style={styles.company}>
                                            {capitalizeWords(eduInfo.institution)}
                                        </Text>

                                    </View>
                                </View>
                            ))}
                            
                        </View>
                    )}

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

                    {resume?.awardArray?.length > 0 && (
                        <View>
                            <Text style={styles.sectionHeader}>Achievements</Text>
                            
                            {resume.awardArray.map((awardInfo, index) => (
                                <View key={index} style={styles.FlexContainer}>
                                    <View style={styles.leftOfFlex}>
                                        <Text style={styles.date}>
                                            {getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}
                                        </Text>
                                    </View>
                                    <View style={styles.rightOfFlex}>
                                        <View key={index} style={{ ...styles.jobDesc, position: 'relative'}}>
                                            <Text style={{position: 'absolute', left: -20, top: 2}}><Image style={styles.diamondIcon} src={diamondIcon} /></Text>
                                            <Text style={styles.position}>{capitalizeWords(awardInfo?.award)}</Text>
                                        </View>
                                        
                                        <Text style={styles.company}>
                                            {capitalizeWords(awardInfo?.org)}
                                        </Text>
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
                    {resume?.interests && (
                        <View>
                            {resume.interests.length > 0 && (
                                <View>
                                    <Text style={styles.sectionHeader}>Hobbies</Text>
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
        </Page>
    </Document>
);

export default EuroPass;