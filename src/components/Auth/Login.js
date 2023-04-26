import React from "react";
import authCss from "./Auth.module.css"
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png"
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Facebook, Google, Apple } from '@mui/icons-material';
import { Link } from "@mui/material";


const screenWidth = window.innerWidth

const Login = () => {
    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="POP back in" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="POP back in" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                    <h2>Pop back in</h2>
                    <form>
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} /> 
                        <Input placeholder="Password..." inputType="password" inputGridSm={12} />
                        <Link href="/pwd-recovery" className={authCss.pwdRec}>forgot password?</Link>
                        <div >
                            <ButtonSubmitBlack type="submit"><Send /></ButtonSubmitBlack>
                        </div>
                    </form>
                    <p><strong>Or</strong></p>
                    <ButtonTransparent><span style={{ color: "#1956AE"}}><Facebook /></span><span> Login with Facebook</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#940101"}}><Google /></span><span> Login with Google</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#333333"}}><Apple /></span><span> Login with Apple</span></ButtonTransparent>
                </div>
            </div>
        </div>        
    )
}

export default Login;