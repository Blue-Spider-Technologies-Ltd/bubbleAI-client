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






const EuroPass = ({resume, letter, imgUrl}) => (
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

export default EuroPass;