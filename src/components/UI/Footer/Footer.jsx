import React from 'react';
import {FooterContainerStyled} from "../../../styled/Footer";
import Logo from "../Logo/Logo";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import IconButtonStyled from "../../../styled/IconButton";
import {Link} from 'react-router-dom'



const Footer = () => {
    return (
        <FooterContainerStyled>
            <div className="topHalf">
                <Logo width='5rem' height='auto' />
                <span className="newsletter">
                    <p>Newsletter</p>
                    <div className="subscribe">
                        <input type="email" name="email" id="email" placeholder="Input your email" />
                        <button>Subscribe</button>
                    </div>
                </span>
            </div>

            <div className="midHalf">

                <span className="links">
                    <div className="items office">
                        <h3>office</h3>
                        <p>
                            Address: <br/>
                            Jabi, FCT <br/> Abuja Nigeria
                        </p>
                        <p>
                            Phone No: <br/>
                            +234800000000
                        </p>
                    </div>
                    <div className="items company">
                        <h3>company</h3>
                        <p>About us</p>
                        <p>Afilliate Program</p>
                        <p>Careers</p>
                        <p>Press & Partnership</p>
                    </div>
                    <div className="items support">
                        <h3>support</h3>
                        <p>Help & FAQ</p>
                        <p>Contact Us</p>
                        <p>Refunds</p>
                        <p>Customer Care</p>
                    </div>
                </span>
            </div>

            <div className="bottomHalf">
                <div className="socials">
                    <div className="background" >
                        <IconButtonStyled bg='#6FCBD1' color='#18343b' pad='0.4rem' fontSize='1.5rem'>
                            <FaFacebookF />
                        </IconButtonStyled>

                    </div>
                    <div className="background" >
                        <IconButtonStyled bg='#6FCBD1' color='#18343b' pad='0.4rem' fontSize='1.5rem'>
                            <FaInstagram />
                        </IconButtonStyled>
                    </div>
                    <div className="background" >
                        <IconButtonStyled bg='#6FCBD1' color='#18343b' pad='0.4rem' fontSize='1.5rem'>
                            <FaTiktok />
                        </IconButtonStyled>
                    </div>
                    <div className="background">
                        <IconButtonStyled bg='#6FCBD1' color='#18343b' pad='0.4rem' fontSize='1.5rem'>
                            <FaXTwitter />
                        </IconButtonStyled>
                    </div>

                </div>

            </div>

            <div className="copyright">
                <p>copyright @bubble-ai.tech  2025</p>
                <span className="others">
                    <Link className='copyLinks'>Terms of Service</Link>
                    <Link className='copyLinks'>Cookie Policy</Link>
                    <Link className='copyLinks'>Privacy Policy</Link>
                    <Link className='copyLinks'>General Terms and Conditions</Link>
                </span>
            </div>
        </FooterContainerStyled>

    )
};

export default Footer;