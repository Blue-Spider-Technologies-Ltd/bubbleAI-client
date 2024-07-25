import React, { useState } from "react";
import MenuBar from "../UI/Menu/Menu";
import leftImg from "../../images/contact-desk1.jpg"
import rightImg from "../../images/contact-desk2.jpg"
import mobileBg from "../../images/contact-mobile.jpg"
import { Grid } from "@mui/material";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { faqs } from "../../utils/faqs";

const screenWidth =  window.innerWidth

const ContactUsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleQClick = index => {
    setActiveIndex(index === activeIndex ? null : index);
  }
  return (
    <div style={styles.pageContainer}>
      <MenuBar />

      <Grid container sx={styles.faqsContainer}>
        <Grid item md={4} xs={0} >
          <Grid container>
            <Grid item xs={6}>
              <img src={leftImg} style={styles.leftImg} alt="Contact Us" />
            </Grid>
            <Grid item xs={6}>
              <img src={rightImg} style={styles.rightImg} alt="Contact Us" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7} xs={12}>
          <div>
            <h1>Contact Us</h1>
            <div style={styles.header}>
              <div>EMAIL: <br /> <strong>support@bubble-ai.tech</strong></div>
            </div>

            <h2>FAQs</h2>
            <div style={{overflowY: 'scroll', height: "220px"}}>
              {faqs.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={styles.faqItem} onClick={() => handleQClick(index)}>
                      <p>{item.q}</p>
                      <p style={styles.plus}>+</p>
                    </div>
                    <div style={activeIndex !== index ? styles.faqAnswer : styles.faqClicked}>{item.a}</div>
                  </div>
                )
              })}
            </div>


            <div style={styles.socialContainer}>
              <a style={styles.a} href="https://www.instagram.com/_bubble.ai?igsh=MW9vZXJ0NmtlbW5mMQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">
                <FaInstagram style={styles.icon} />
                {screenWidth > 900 && <br />}
                {screenWidth > 900 && "@_bubble.ai"}
              </a>
              <a style={styles.a} href="https://www.tiktok.com/@_bubbleai?_t=8nWYhlFhczl&_r=1" target="_blank" rel="noreferrer">
                <FaTiktok style={styles.icon} />
                {screenWidth > 900 && <br />}
                {screenWidth > 900 && "@_bubbleai"}
              </a>
              <a style={styles.a} href="https://x.com/_BubbleAI" target="_blank" rel="noreferrer">
                <FaXTwitter style={styles.icon} />
                {screenWidth > 900 && <br />}
                {screenWidth > 900 && "@_bubbleai"}
              </a>
            </div>
          </div>
        </Grid>
      </Grid>

      <button style={styles.liveChatButton}><IoChatbubbleEllipsesSharp style={{marginBottom: '-2px'}} /> Live chat</button>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: screenWidth < 900 && `url(${mobileBg})`,
    backgroundSize: 'cover',
    boxSizing: 'border-box',
    alignItems: 'center',
    height: '100vh',
    overflowY: 'hidden',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    margin: '0',
    position: 'absolute',
    maxWidth: '100vw'
  },
  header: {
    color: screenWidth < 900 && '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    width: screenWidth > 900 ? '70%' : '100%',
  },
  leftImg: {
    width: screenWidth > 900 ? '98%' : '0',
    height: '80%',
    borderRadius: '50px'
  },
  rightImg: {
    marginTop: '5%',
    width: screenWidth > 900 ? '90%' : '0',
    height: '80%',
    borderRadius: '50px'
  },
  faqsContainer: {
    width: '100vw',
    height: '87vh',
    background: 'linear-gradient(to right, rgba(63, 106, 108, 0.1), rgba(63, 106, 108, 0.4))',
    borderRadius: '30px',
    padding: '20px 40px',
    boxSizing: 'border-box',
    position: 'relative',
    bottom: '0',
    top: '100px',
  },
  faqItem: {
    cursor: 'pointer',
    color: '#FFF',
    display: 'flex',
    height: '45px',
    justifyContent: 'space-between',
    background: 'linear-gradient(to right, rgba(63, 106, 108, 0.9), rgba(63, 106, 108, 0.178))',
    margin: '0 0 10px 0',
    padding: '0 20px',
    borderRadius: '50px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    alignItems: 'center'
  },
  faqAnswer: {
    overflow: 'hidden',
    fontSize: screenWidth < 900 && '.9rem',
    marginLeft: '5%',
    width: '90%',
    height: 0,
    transition: 'all 0.3s ease'
  },
  faqClicked: {
    color: screenWidth < 900 && '#fff',
    fontSize: screenWidth < 900 && '.9rem',
    width: '90%',
    marginLeft: '5%',
    opacity: 1,
    height: 'auto',
    marginBottom: '10px',
    transition: 'all 0.3s ease'
  },
  plus: {
    fontSize: '20px',
    color: '#FFF'
  },
  socialContainer: {
    color: screenWidth < 900 && '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '60px',
    marginLeft: screenWidth < 900 && '-20px',
  },
  a: {
    textDecoration: 'none',
    color: screenWidth < 900 ? '#fff' : "#000",
  },
  icon: {
    margin: '0 10px',
    fontSize: '24px',
    marginLeft: '2.2rem'
  },
  liveChatButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: 'rgba(63, 106, 108, 0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: '99'
  }
};

export default ContactUsPage;