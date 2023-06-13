import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import MenuBar from "../UI/Menu/Menu";
import "./Home.css"
import { Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import Blob from "../UI/Blob/Blob";
import categoriesData from "./categories"
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessage, setUser } from "../../redux/states";
import { Assistant, User } from "../UI/ChatBoxes/ChatBoxes";
import axios from 'axios';


const Home = () => {
    const [isFocused, setFocused] = useState(false)
    const [chatBgFocused, setChatBgFocused] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(loading);
    const [error, setError] = useState("")
    const { messages, user } = useSelector(state => state.stateData)
    const dispatch = useDispatch();
    const chatBoxRef = useRef(null);
    const navigate = useNavigate()
  

    useEffect(() => {
        const isAuth = localStorage.getItem('token')
        const populateUser = async () => {
            if (isAuth) {
                //Check if user and messages set for authenticated user, if not, set
                if(Object.keys(user).length > 0 ) {
                    dispatch(setMessages(user.messages))
                } else {
                    try {
                        const headers = {
                            'x-access-token': isAuth
                        }
                        const response = await axios.get('/user/user', {headers})
                        if (response.data.status === "unauthenticated") {
                            localStorage?.removeItem('token')
                            return navigate('/popin')
                        }
                        dispatch(setMessages(response.data.user.messages))
                        dispatch(setUser(response.data.user))
                    } catch (error) {
                        console.log(error);
                        setError("Reload page to fetch data")
                    }
                }
            } else {
                //console.log("unauthenticated");
            }
        }
        populateUser()

    }, [dispatch, user, navigate]);

    useEffect(() => {
        // Scroll to bottom on new message
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);
    //Chat Effect on ask me anything styling changes on input focus
    useEffect(() => {
        const chatBg = document.getElementById("chat-bg")
        const askMeContainer = document.getElementById("ask-me")
        const askMeContainerInner = askMeContainer.querySelector(".container-inner")
        const categories = document.getElementById("categories")

        if(isFocused) {
            chatBg.classList.add('chat-bg-in')
            chatBg.classList.remove('chat-bg-out')
            chatBg.style.height = window.innerHeight + "px"
            askMeContainer.classList.remove('container')
            askMeContainerInner.classList.add('container-inner-borderless')
            askMeContainerInner.style.position = "fixed"
            askMeContainerInner.style.top = window.innerHeight
            askMeContainerInner.style.bottom = "30px"
            askMeContainer.querySelector('.ask-me-h2').style.display = "none"
            categories.classList.add('categories')
            //This if block will align the chat bg and input field on mobile when the keyboard pops in
            if(chatBgFocused) {
                chatBg.style.position = "absolute"
                chatBg.style.bottom = "0"
                askMeContainerInner.style.position = "fixed"
                askMeContainerInner.style.bottom = "20px"
            }
        } else {
            chatBg.classList.remove('chat-bg-in')
            chatBg.classList.add('chat-bg-out')
            chatBg.style.height = "80vh"
            askMeContainer.classList.add('container')
            askMeContainerInner.style.position = "static"
            askMeContainerInner.classList.remove('container-inner-borderless')
            askMeContainer.querySelector('.ask-me-h2').style.display = "block"
            categories.classList.remove('categories')
        }
    }, [isFocused, chatBgFocused]);

    const chatExchange = messages.map((message, index) => {
        return message.role === "assistant" ? <div key={index}><Assistant>{message.content}</Assistant></div> : <div key={index}><User>{message.content}</User></div>
    })

    const handleFocus = () => {
        setFocused(true)
        setChatBgFocused(false)
    }

    const handleAskMeAnything = async (e) => {
        e.preventDefault();
        setLoading(true)
        const newMessage = {
            role: 'user',
            content: e.target.elements[0].value
        } 
        const isAuth = localStorage?.getItem('token')
        if (isAuth) {
            //save authenticated user message
            dispatch(setMessage(newMessage))
            e.target.elements[0].value = ''
            try {
                let response = await axios.post('/askme', newMessage, {
                    headers: {
                        'x-access-token': isAuth
                    }
                })
                //save ai response for auth user
                console.log(response.data);
                dispatch(setMessage(response.data))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        } else {
            //prevent overuse when not registered/logged in
            const now = new Date().getTime()
            const itemJson = localStorage.getItem('oats_3297')
            const item = JSON.parse(itemJson)
            const useCount = item ? item.count : 0
            const useIndicator = {
                count: useCount + 1,
                expiration: now + (24 * 60 * 60 * 1000) //current time + 24hr in milliseconds
            }
            const useIndicatorJson = JSON.stringify(useIndicator)
            localStorage.setItem('oats_3297', useIndicatorJson)
            if(useCount > 1) {
                dispatch(setMessage(newMessage))
                const overUseMessage = {
                    role: 'assistant',
                    content: 'You have used up your free interactions for the day, kindly register to enjoy more'
                } 
                dispatch(setMessage(overUseMessage))
                e.target.elements[0].value = ''
            } else {
                //THIS BLOCK FOR unauthenticated users below 3 usage within the day
                dispatch(setMessage(newMessage))
                e.target.elements[0].value = ''
    
                try {
                    let response = await axios.post('/askme', newMessage)
                    console.log(response);
                    dispatch(setMessage(response.data))
                    setLoading(false)
                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
            }

        }
    }

    const handleChatBgFocus = () => {
        setChatBgFocused(true)
    }
    
    return (
        <div>
            {!isFocused ? <MenuBar /> : null}

            <section id="chat-bg" className="chat-bg" onClick={handleChatBgFocus}>
                <div className="close-icon" title="Close Chat" onClick={() => setFocused(false)}>
                    <CloseIcon sx={{fontSize: '1.5rem'}} />  
                </div>
                <div className="chatbg-overlay" ref={chatBoxRef}>
                    {chatExchange}
                </div>
            </section>

            <section id="ask-me" className="container" style={{marginTop: "100px"}}>
                <div className="container-inner" onFocus={handleFocus}>
                    <h1 className="ask-me-h2">Ask me anything</h1>
                    <div className="error">{error}</div>
                    <form onSubmit={handleAskMeAnything} className="form-ask-anything">
                        <Grid container>
                            <Input placeholder="Ask a Question..." inputType="text" name="askMe" inputGrid={10} inputGridSm={10} /> 
                            <Grid item xs={2} sx={{textAlign: isFocused ? "center" : "right"}}><ButtonSubmitBlack><SendIcon /></ButtonSubmitBlack></Grid>
                        </Grid>
                        
                    </form>
                </div>
            </section>

            <section id="categories" className="container">
                <div className="container-inner">
                    <h2>I can help you with:</h2>
                    <Grid container>
                        {categoriesData.map((data, index) => {
                            return (
                                <Grid item xs={12} md={6} lg={4} mb={5} key={index}>
                                    <Blob link={data.url} bgImage={data.image} altText={data.title} desc={data.desc} title={data.title} />
                                    <h3>{data.title}</h3>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </section>
        </div>
    )
}

export default Home;