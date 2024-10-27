import React from "react";
import { getMonthShortName, capitalizeAllLetters, capitalizeWords } from "../../../utils/client-functions";
import { Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import mobileIcon from '../../../images/phone.png'
import pinIcon from '../../../images/pin2.png'
import emailIcon from '../../../images/mail.png'
import linkIcon from '../../../images/globe.png'
import arrowIcon from '../../../images/arrow.png'

////FONTS
import TinosRegular from '../../../assets/fonts/tinos/Tinos-Regular.ttf';
import RobotoBold from '../../../assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from '../../../assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoLightItalic from '../../../assets/fonts/Roboto/Roboto-LightItalic.ttf'
import TinosBold from '../../../assets/fonts/tinos/Tinos-Bold.ttf';


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
    }
});






const CLAuckland = ({ resume, imgUrl, letter }) => {

    return(
        <Document>
            <Page size="A4" style={styles.Container}>

                <View style={styles.flexCont}>
                    <View style={styles.leftCont}>

                        <View>
                            <Image style={styles.image} src={imgUrl} />
                            <View style={{...styles.sectionHeader, marginTop: 41.6}}><Text>CONTACT</Text></View>
                            
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
                                
                                <View style={styles.sectionHeader}><Text>COVER LETTER</Text></View>
                                <View style={styles.group}>
                                    {letter && letter.split("\n").map((paragraph, index) => (
                                        <Text key={index} style={{ display: 'block', marginBottom: 8 }}>
                                            {paragraph}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                    </View>

                </View>

            </Page>
        </Document>
)};

export default CLAuckland;