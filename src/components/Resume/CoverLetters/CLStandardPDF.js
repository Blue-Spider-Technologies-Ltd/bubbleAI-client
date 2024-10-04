import React from "react";
import { capitalizeAllLetters, capitalizeWords } from "../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import mobileIcon from '../../../images/mobile.png'
import pinIcon from '../../../images/pin.png'
import emailIcon from '../../../images/email.png'
import linkIcon from '../../../images/link.png'


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






const CLStandardPDF = ({resume, letter}) => (
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
                    <Text style={styles.sectionHeader}>Cover Letter</Text>
                    {letter && letter.split("\n").map((paragraph, index) => (
                        <Text key={index} style={{ display: 'block', marginBottom: 8 }}>
                            {paragraph}
                        </Text>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default CLStandardPDF;