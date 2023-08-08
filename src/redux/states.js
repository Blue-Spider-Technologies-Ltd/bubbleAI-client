import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  user: {},
  resume: {},
  email: "",
  meeting: {}
}

export const stateSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    //For when user logs in, set messages from server
    setMessages: (state, action) => {
      const newArray = [...action.payload];
      state.messages = newArray
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
  },
})

// Action creators are generated for each case reducer function
export const { 
  setMessages, 
  setUser, 
  setMessage, 
  deleteLastMessage,
  setResume,
  setEmail,
  setMeeting 
} = stateSlice.actions

export default stateSlice.reducer