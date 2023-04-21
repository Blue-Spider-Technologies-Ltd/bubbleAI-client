import React from "react";
import authCss from "./Auth.module.css"
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png"
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Facebook, Google, Apple } from '@mui/icons-material';
import { Link, Grid } from "@mui/material";


const screenWidth = window.innerWidth

const Register = () => {
    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner}>
                    <h2>Get an Account</h2>
                    <form>
                        <Grid container>
                            <Input placeholder="First name..." inputType="text" inputGridSm={12} inputGrid={6} /> 
                            <Input placeholder="Last name..." inputType="text" inputGridSm={12} inputGrid={6} /> 
                        </Grid>
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} /> 
                        <Input placeholder="Password..." inputType="password" inputGridSm={12} />
                        <Input placeholder="Confirm password..." inputType="password" inputGridSm={12} />
                        <Link href="/popin" className={authCss.pwdRec}>Login?</Link>
                        <div >
                            <ButtonSubmitBlack type="submit"><Send /></ButtonSubmitBlack>
                        </div>
                    </form>
                    <p><strong>Or</strong></p>
                    <ButtonTransparent><span style={{ color: "#1956AE"}}><Facebook /></span><span> Register with Facebook</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#940101"}}><Google /></span><span> Register with Google</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#333333"}}><Apple /></span><span> Register with Apple</span></ButtonTransparent>
                </div>
            </div>
        </div>        
    )
}

export default Register;