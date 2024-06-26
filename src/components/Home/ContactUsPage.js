import React from "react";
import MenuBar from "../UI/Menu/Menu";
import leftImg from "../../images/contact-desk1.jpg"
import rightImg from "../../images/contact-desk2.jpg"
import mobileBg from "../../images/contact-mobile.jpg"
import { Grid } from "@mui/material";
import { FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const screenWidth =  window.innerWidth

const faqs = [
  {
    question: "What is Bubble Ai?",
    answer: ""
  },
  {
    question: "Is there a free trial?",
    answer: ""
  },
  {
    question: "Can I upgrade or downgrade?",
    answer: ""
  },
  {
    question: "Is my personal info secure?",
    answer: ""
  }
]

const ContactUsPage = () => {

  const handleQClick = index => {
    console.log(index);
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
              <div>PHONE: <br /> <strong>+2347013370222</strong></div>
              <div>EMAIL: <br /> <strong>hello@bubble-ai.tech</strong></div>
            </div>

            <h2>FAQs</h2>
            <div style={{overflowY: 'scroll', height: "220px"}}>
              {faqs.map((item, index) => {
                return (
                  <div key={index} style={styles.faqItem} onClick={() => handleQClick(index)}>
                    <p>{item.question}</p>
                    <p style={styles.plus}>+</p>
                  </div>
                )
              })}
            </div>


            <div style={styles.socialContainer}>
              <div>
                <FaTwitter style={styles.icon} /> <br /> @_bubbleai
              </div>
              <div>
                <FaInstagram style={styles.icon} /> <br /> @_bubble.ai
              </div>
              <div>
                <FaTiktok style={styles.icon} /> <br /> @_bubbleai
              </div>
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