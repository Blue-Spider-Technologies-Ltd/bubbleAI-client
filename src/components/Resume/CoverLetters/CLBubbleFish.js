import React from "react";
import { capitalizeAllLetters, capitalizeWords } from "../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import phnIcon from '../../../images/phnfish.png'
import pinIcon from '../../../images/pinfish.png'
import emIcon from '../../../images/emfish.png'
import linkIcon from '../../../images/www.png'


////FONTS
import RobotoConBlack from '../../../assets/fonts/RobotoCondenced/RobotoCondensed-Black.ttf';
import RobotoConBold from '../../../assets/fonts/RobotoCondenced/RobotoCondensed-Bold.ttf';
import RobotoConMed from '../../../assets/fonts/RobotoCondenced/RobotoCondensed-Medium.ttf';

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
    group: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%'
    },
    smallIcon: {
        height: 9,
        width: 9
    },
});


const CLBubbleFish = ({ resume, letter }) => {
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

                    <View style={styles.sectionHeader}><Text>COVER LETTER</Text></View>
                    <View style={styles.group}>
                        {letter && letter.split("\n").map((paragraph, index) => (
                            <Text key={index} style={{ display: 'block', marginBottom: 8 }}>
                                {paragraph}
                            </Text>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    )

};

export default CLBubbleFish;