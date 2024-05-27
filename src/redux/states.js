import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: "",
  successMini: "",
  messages: [],
  userResumesAll: [],
  user: {},
  resume: {},
  email: "",
  meeting: {},
  pricingDetails: {},
  hideCards: false,
  transcriptActivityStarted: false,
  fetching: false,
  showCheckout: false,
  resumeSubDuration: ""
}

export const stateSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMini: (state, action) => {
      state.successMini = action.payload;
    },
    //For when user logs in, set messages from server
    setMessages: (state, action) => {
      const newArray = [...action.payload];
      state.messages = newArray
    },
    setUserResumesAll: (state, action) => {
      const newArray = action.payload;
      state.userResumesAll = newArray
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //Set each message from user/assistant
    setMessage: (state, action) => {
      const newMessage = action.payload
      state.messages = [...state.messages, newMessage]
    },
    deleteLastMessage: (state) => {
      state.messages.splice(-1, 1)
    },
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setMeeting: (state, action) => {
      state.meeting = action.payload;
    },
    setPricingDetails: (state, action) => {
      state.pricingDetails = action.payload;
    },
    setHideCards: (state, action) => {
      state.hideCards = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setTranscriptActivityStarted: (state, action) => {
      state.transcriptActivityStarted = action.payload;
    },
    setShowCheckout: (state, action) => {
      state.showCheckout = action.payload
    },
    setResumeSubDuration: (state, action) => {
      state.resumeSubDuration = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setError,
  setSuccessMini,
  setMessages, 
  setUserResumesAll,
  setUser, 
  setMessage, 
  deleteLastMessage,
  setResume,
  setEmail,
  setMeeting,
  setPricingDetails,
  setHideCards,
  setFetching,
  setTranscriptActivityStarted,
  setShowCheckout, 
  setResumeSubDuration
} = stateSlice.actions

export default stateSlice.reducer