import React, { useState, useEffect } from 'react';
import depoCss from './Depositions.module.css'
import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import { ButtonCard } from '../UI/Buttons/Buttons';
import { Grid } from "@mui/material"
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'


const Depositions = () => {
    const navigate = useNavigate()
    const isAuth = localStorage?.getItem('token')
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)
        const now = Date.now()        
        const authUser = jwt_decode(isAuth)
        if (isAuth && (now < authUser.expiration)) {
            
        } else {
            setFetching(false)
            localStorage?.removeItem('token')
            navigate('/popin')
        }
    }, [isAuth, navigate])

    const toggleOptions = () => {
        setAuthMenuOpen(!authMenuOpen)
    }
    
    return (
        <div>
            <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search Transcriptions" hidden={!authMenuOpen} />  
            
            <div style={{width: '100%', padding: '0'}}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleOptions} headerText="Minutes of Proceedings AI" />

                <Grid container sx={{padding: '50px 30px'}}>

                    <Grid item lg="4" md="6" xs="12">
                        <ButtonCard icon="meeting" title="Set up Meeting" description="Convert your conversations in a meeting into text, mapping each person's contributions to their identity" />
                    </Grid>
                    <Grid item lg="4" md="6" xs="12">
                        <ButtonCard icon="transcribe" title="Transcribe Audio File" description="Import or upload an audio file to get a text output. Save or download output for later use" />
                    </Grid>
                    <Grid item lg="4" md="12" xs="12">
                        <ButtonCard icon="translate" title="Translate Audio File" description="upload or record an audio file and translate it to a wide variety of languages I have available for you" />
                    </Grid>
                    
                </Grid>
            </div>
        </div>
    )
}

export default Depositions;