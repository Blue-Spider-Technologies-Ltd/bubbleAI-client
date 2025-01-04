import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import AuthInput from "../UI/Input/AuthInputs";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons"
import { useSelector, useDispatch } from "react-redux";
import { setMessage, deleteLastMessage, setError, setSuccessMini, setMessages, setAllMessagesArray, setFetching } from "../../redux/states";
import { Assistant, User } from "../UI/ChatBoxes/ChatBoxes";
import { ThreeDots, Oval } from 'react-loader-spinner'
import  ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { LineWave } from 'react-loader-spinner'
import axios from "axios";
import { errorAnimation, successMiniAnimation, checkAuthenticatedUser } from "../../utils/client-functions";


const screenWidth = window.innerWidth

const suggestionOne = {
      title: "Generate follow-up email",
      description: `Generate a professional follow-up email to a recruiter using the following details: Recruiter's Name: [Recruiter's Name here], Recruiter's Email: [Recruiter's Email Address here], My full name: [Your Full Name here], Job Title: [The Job Title here], Date of application or interview: [Date of your application or interview], Reason for the follow-up: [Reason for Follow-Up], Specific questions to ask (optional): [Questions], Desired tone of the email: [professional]. Please generate the email based on the provided details`
}

const suggestionTwo = {
  title: "Job Interview Preparation",
  description: "You are a Job Interview preparation coach. Coach me on how to prepare and ace an interview with [COMPANY NAME HERE] that are in the [INDUSTRY NAME e.g HOSPITALITY] for the role of [PLACE ROLE HERE], given that the specific requirements for the role are [COPY AND PASTE REQUIREMENTS HERE]. After that, give me 10 possible interview questions that might be asked for this role and their best possible answers."
}

const suggestionThree = {
  title: "Create Video Content",
  description: "You are an expert content creator at a business development firm, create a social media video script of 1 minute 30 seconds on the importance of digital marketing with catchy illustrations"
}


const AskMe = () => {
  const { messages, error, successMini, allMessagesArray, user } = useSelector((state) => state.stateData);
  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const isAuth = localStorage?.getItem("token");
  const now = new Date().getTime();
  const countItemJson = localStorage?.getItem("oats_3297");
  const item = JSON.parse(countItemJson);
  const useCount = item ? item.cu78tgGgivhcountJVGIbGguguGhgh : 0;
  const expiration = item?.UYiygc768FYexpUVIirationHi87f86DCCC;
  const woot = localStorage?.getItem('woot')

  const [authMenuOpen, setAuthMenuOpen] = useState(false)
  const [askMeVal, setAskMeVal] = useState("")
  const [suggestionDisplay, setSuggestionDisplay] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioTranscribed, setAudioTranscribed] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [prepCalled, setPrepCalled] = useState(false)


  const isEffectExecuted = useRef(false);
  let coverLetterPrompt = localStorage.getItem("UF76rOUFfVA6A87AJjhaf6bvaIYI9GHJFJHfgag0HFHJFAfgaHGA")

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }

  const successSetter = (string) => {
    dispatch(setSuccessMini(string))
    successMiniAnimation()
  }

  const askMeErrorObj = {
    role: 'assistant',
    content:  "I am currently throttling requests, try again in a moment"
  }

  useEffect(() => {
    if (woot) {
      localStorage?.removeItem('woot')
      window.location.reload()
    }
  }, []);

  //fetch messages, interview prep, follow up email, etc for auth user
  useEffect(() => {

    const prepInStorage = localStorage?.getItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY") 

    const populateMessages = async () => {
      if (isAuth) {
        //only try this if isAuth present in local Storage, meaning user had previously logged into browser
        try {
          //must await
          await checkAuthenticatedUser()
        } catch (error) {
          return navigate("/popin");      
        }

        try {
          const headers = {
            "x-access-token": isAuth,
          };
          const response = await axios.get("/user/user/messages", { headers });
          const messagesArrayofArray = response.data.messages

          dispatch(setAllMessagesArray(messagesArrayofArray));
          dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
        } catch (error) {
          errorSetter("Reload page to fetch data");
        }
      } 
    };
    

    const prepFunc = async (params) => {
      const newMsg = {
        content: params
      };
      //Dispatch with empty content to enable thinking algo
      const emptyMsg = {
        role: "assistant",
        content: "",
      };
      // dispatch(setMessage(newMsg));
      dispatch(setMessage(emptyMsg));
      try {
        let response = await axios.post("/int-em", newMsg, {
          headers: {
            "x-access-token": isAuth,
          },
        });

        //save ai response for auth user
        dispatch(deleteLastMessage());
        dispatch(setMessage(response.data));

      } catch (error) {
        dispatch(deleteLastMessage());
        dispatch(setMessage(askMeErrorObj));
      }
    }


    const handleTailoredInterviewPrep = async (param) => {
      if (prepInStorage) {
        setSuggestionDisplay(false)
        successSetter("Starting, Please wait...")
        //START NEW SESSION IF OLD SESSION
        if(messages.length !== 0) {
          //push a new empty array to backend and frontend
          const emptyArr = []
          try {
            let response = await axios.post("/create-new-askme-session", emptyArr, {
              headers: {
                "x-access-token": isAuth,
              },
            });
            
            const messagesArrayofArray = response.data
            dispatch(setAllMessagesArray(messagesArrayofArray));
            dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
            successSetter("Generating...")
            await prepFunc(param)
          } catch (error) {
            dispatch(setFetching(false))
            errorSetter("Please try again");
            return
          }
        }
      }

    } 

    if (!prepCalled) {
      dispatch(setFetching(true))
      populateMessages()
      .then(async () => {
        setPrepCalled(true)
        await handleTailoredInterviewPrep(prepInStorage)
        dispatch(setFetching(false))
        localStorage.removeItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY")
      })
      .catch((error) => {
        dispatch(setFetching(false))
        errorSetter("Try again")
        localStorage.removeItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY")
      })
      
    }

  }, [messages.length, prepCalled]);


  // Scroll to bottom on new message
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  //check and remove unauth user's expired use count for ask me anything
  useEffect(() => {
    if (expiration < now) {
      localStorage?.removeItem("oats_3297");
    }
  }, [expiration, now])


  useEffect(() => {
    if (audioTranscribed) {
      handleAskMeAnything();
      setAudioTranscribed(false)
      setTranscribing(false)
    }
  }, [audioTranscribed]);

  //Cover letter and Ai suggestions useeffect
 useEffect(() => {
    localStorage.removeItem("prevPath")
  
    const generateSuggestions = async () => {
      try {
        // const data = {
        //   suggestions: suggestionOne
        // }
        setSuggestionDisplay(true)
        // let response = await axios.post("/suggestions", data);
        // const objectData = response.data
        setAiSuggestions([suggestionOne, suggestionTwo, suggestionThree])
      } catch (error) {
        console.error(error);
      }
    }
  
    if (!isEffectExecuted.current) {
      generateSuggestions()
      isEffectExecuted.current = true;
    }
  
  }, [])
  

  const renderLineWaves = () => {
    const lineWaves = [];
    const count = screenWidth > 900 ? 10 : 8
    for (let i = 0; i < count; i++) {
      lineWaves.push(
        <LineWave
          key={i}
          visible={true}
          height="40"
          width="100%"
          color="#3E8F93"
          ariaLabel="line-wave-loading"
        />
      );
    }
    return lineWaves;
  };
  
  const chatExchange = messages.map((message, index) => {
    const OverUseMessage = () => {
      const overUseMessage = {
        content: `You have used up your unregistered user interactions for the day, kindly <a href="/join-bubble" >Register here</a> or <a href="/popin" >Log in</a> to enjoy more for FREE`,
      };
    
      return (
        <div>
          <span dangerouslySetInnerHTML={{ __html: overUseMessage.content }} />
        </div>
      );
    };
    const isAssistant = message.role === "assistant";
    let contentTrim = message.content.trim()
    const assistantMessage = useCount > 2 && !isAuth ? <OverUseMessage /> : message.content.split("\n").map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>
    })

    const content = isAssistant? (
      <Assistant contentTrim={contentTrim === ""}>{contentTrim === "" ?        
        <ThreeDots 
            height="25" 
            width="25" 
            radius="9"
            color="#000" 
            ariaLabel="three-dots-loading"
            visible={true}
        /> : assistantMessage
    }
      </Assistant>
    ) : (
      <User>{message.content}</User>
    );
    return <div key={index}>{content}</div>;
  });


  const handleAskMeAnything = async () => {

    if (askMeVal === "") {
      errorSetter("Empty question detected")
      return
    }
    const newMessage = {
      role: "user",
      content: askMeVal,
    };

    //Dispatch with empty content to enable thinking algo
    const emptyMessage = {
      role: "assistant",
      content: "",
    };
    dispatch(setMessage(newMessage));
    dispatch(setMessage(emptyMessage));
    const lastFiveMessages = [...messages.slice(-4), newMessage]; 
    const promptForBackend = {
      lastFiveMessages
    }
    if (isAuth) {
      //save authenticated user message

      setAskMeVal("");
      try {
        let response = await axios.post("/askme", promptForBackend, {
          headers: {
            "x-access-token": isAuth,
          },
        });
        //save ai response for auth user
        dispatch(deleteLastMessage());
        dispatch(setMessage(response.data));
        localStorage?.removeItem("UF76rOUFfVA6A87AJjhaf6bvaIYI9GHJFJHfgag0HFHJFAfgaHGA")
      } catch (error) {
        dispatch(deleteLastMessage());
        dispatch(setMessage(askMeErrorObj));
      }
    } else {
      //prevent overuse when not logged in
      const useIndicator = {
        cu78tgGgivhcountJVGIbGguguGhgh: useCount + 1,
        UYiygc768FYexpUVIirationHi87f86DCCC: now + 24 * 60 * 60 * 1000, //current time + 24hr in milliseconds
      };
      const useIndicatorJson = JSON.stringify(useIndicator);

      if (useCount > 2) {
        //set user message

        const overUseMessage = {
          role: "assistant",
          content: "OverUse",
        };
        dispatch(deleteLastMessage());
        dispatch(setMessage(overUseMessage));
        setAskMeVal("");
        return
      } else {
        //THIS BLOCK WORKS FOR unauthenticated users below 3 usage within the day
        setAskMeVal("");

        try {
          let response = await axios.post("/askme", promptForBackend);
          dispatch(deleteLastMessage());
          dispatch(setMessage(response.data));
          localStorage.setItem("oats_3297", useIndicatorJson);
        } catch (error) {
          dispatch(deleteLastMessage());
          dispatch(setMessage(askMeErrorObj));
        }
      }
    }
  };

  
  const handleRecordAudio = () => {
    setSuggestionDisplay(false)
    if (!recording) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
              const mediaRecorder = new MediaRecorder(stream);
              const audioChunks = [];
              mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
              };
              mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                setAudioBlob(audioBlob);
              };
              mediaRecorder.start();
              setRecording(true);
              setMediaRecorder(mediaRecorder);
          })
          .catch(error => {
            errorSetter('Error accessing microphone');
          });
      } else {
        errorSetter('Audio recording not supported on this browser');
      }
    } else {
      // Stop recording
      if (mediaRecorder) {
        try {
          mediaRecorder.stop();
        } catch (error) {
          errorSetter('Error stopping recording');
        }
      }
      setRecording(false);
      // setMediaRecorder(null);
    }
  };
  

  const handleSendAudio = () => {
    if (audioBlob && mediaRecorder && mediaRecorder.state === 'inactive') {
      setTranscribing(true)
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.mp3');

      axios.post('/transcript/transcribe-askme', formData)
          .then(response => {
            setAskMeVal(response.data)
            setAudioTranscribed(true)
            setAudioBlob(null)
            setMediaRecorder(null);
          })
          .catch(error => {
            setTranscribing(false)
            errorSetter('Error transcribing audio:', error);
          });
    } else {
      return errorSetter('No audio to send');
    }
  };

  const handleNewSession = async () => {
    if(!isAuth) {
      return errorSetter("Log in to access this feature")
    }
    if (messages.length === 0) {
      errorSetter("Already a new session")
    } else {
      dispatch(setFetching(true))
      //push a new empty array to backend and frontend
      const emptyArr = []
      try {
        let response = await axios.post("/create-new-askme-session", emptyArr, {
          headers: {
            "x-access-token": isAuth,
          },
        });
        
        const messagesArrayofArray = response.data
        dispatch(setAllMessagesArray(messagesArrayofArray));
        dispatch(setMessages(messagesArrayofArray[messagesArrayofArray.length - 1]));
        dispatch(setFetching(false))
        successSetter("New Chat Session Started")
        return
      } catch (error) {
        dispatch(setFetching(false))
        errorSetter(error?.response?.data?.message);
      }
    }
  }

  const handleKeyPress = (e) => {
    if (screenWidth > 900 ) {
      if (e.key === "Enter" && !e.shiftKey) { 
        e.preventDefault();
        handleAskMeAnything();
      }
    }
  };


  const handleValChange = (e) => {
    setAskMeVal(e.target.value)
  }

  const toHomePage = () => {
    navigate("/")
  }

  const handleMenuToggle = () => {
    setAuthMenuOpen(!authMenuOpen)
  }

  const handleFocus = () => {
    setSuggestionDisplay(false)
  }


  return (
    <div id="askme-bg" className="askme-bg" onClick={handleFocus}>
        <AuthSideMenu
            opened={authMenuOpen}
            seacrhBarPlaceholder=""
            hidden={!authMenuOpen}
            firstName={user.firstName}
            arrayDetails={allMessagesArray}
        />
        <div className="error">{error}</div>
        <div className="success-mini">{successMini}</div>

        <div className="chat-header">
          <div className="chat-menu-icon">
            
              {!authMenuOpen ? 
                <ArrowCircleRightIcon fontSize='large' sx={{transform: "rotate(45deg)", color: "white"}} onClick={handleMenuToggle}/>
              :
                <ArrowCircleLeftIcon fontSize='large' sx={{transform: "rotate(45deg)", color: "white"}} onClick={handleMenuToggle} />}
          </div>
          <div 
            title="Start New Session"
            style={{ marginLeft: "-65%", height: "2rem" }}
          >
            <AddIcon 
              fontSize='large'
              sx={{color: "#3E8F93", cursor: "pointer"}}
              onClick={handleNewSession}
            />
          </div>
          {/* <AddCircleIcon fontSize='large' sx={{color: "white"}} /> */}
          <div
            className="close-icon"
            title="Close Chat"
            onClick={toHomePage}
          >
            <CloseIcon 
              fontSize='medium'
            />
          </div>
        </div>
       

        <div className="chatbg-overlay" onClick={() => setAuthMenuOpen(false)}>
            <div className="chat-ex" ref={chatBoxRef}>
              <div style={{ padding: "0", width: "92vw", margin: "auto" }}>
                <div className={suggestionDisplay ? "suggestion-container" : "suggestion-out"}>
                  {coverLetterPrompt ? (
                    <span style={{color: "white"}}>Read the query in the input field (edit if necessary) and click the send icon to generate Cover Letter</span>
                  ) : (
                    <div>
                      <h5>Suggestions</h5>

                      {aiSuggestions.map((suggestion, index) => {
                        return (
                          <button 
                            key={index}
                            className="suggestion-buttons" 
                            onClick={() => {
                              setSuggestionDisplay(false)
                              setAskMeVal(suggestion.description)}
                            }
                          >
                            {suggestion.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  
                </div>
              </div>

              {chatExchange}
            </div>

            <div className="ask-me-form">
              <Grid container>
                {recording ? (
                  <Grid item xs={10} sx={{display: 'flex', justifyContent: 'center'}}>
                    {renderLineWaves()}
                  </Grid>
                ) : audioBlob ? (
                  <Grid item xs={10}>
                    <audio controls style={{width: screenWidth < 900 ? "90%" : "100%", height: "30px", marginTop: screenWidth > 900 ? '15px' : "5px", marginLeft: '10px'}}>
                        <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" />
                    </audio>
                  </Grid>
                ) : (
                  <AuthInput
                      name="askMe"
                      value={askMeVal}
                      label="Ask a Question..."
                      placeholder="Ask a Question..."
                      multiline={true}
                      inputGridSm={10}
                      mt={1}
                      rows={screenWidth <= 900 ? 1 : 2}
                      maxRows={6}
                      required={true}
                      onKeyDown={handleKeyPress}
                      onChange={handleValChange}
                      onFocus={handleFocus}
                  />
                )}

                <Grid
                    item
                    xs={1}
                    sx={{ marginTop: screenWidth > 900 ? "5px" : "-2px", marginLeft: "-5px"}}
                >
                  {audioBlob ? (
                    <ButtonSubmitBlack type="button" width="90%" onClick={() => setAudioBlob(null)}>
                      <CancelIcon />
                    </ButtonSubmitBlack>
                  ) : (
                    <ButtonSubmitBlack type="button" width="90%" onClick={handleRecordAudio}>
                      {recording ? <StopIcon sx={{color: 'rgb(216, 7, 7)'}} /> : <MicIcon />}
                    </ButtonSubmitBlack>
                  )}
                </Grid>

                <Grid
                    item
                    xs={1}
                    sx={{marginTop: screenWidth > 900 ? "5px" : "-2px" }}
                >
                    <ButtonSubmitBlack type="button" onClick={audioBlob ? handleSendAudio : handleAskMeAnything}>
                        {transcribing ? 
                          <Oval
                            visible={true}
                            height="20"
                            width="20"
                            color="#3E8F93"
                            ariaLabel="oval-loading"
                          /> : <SendIcon sx={{color:"#3E8F93"}} /> }
                    </ButtonSubmitBlack>
                </Grid>
              </Grid>
            </div>
        </div>
    </div>
  );
};

export default AskMe;