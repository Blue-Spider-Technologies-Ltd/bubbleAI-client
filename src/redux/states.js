import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  user: {},
  modalLoading: false
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
    //should modal show?
    setModalLoading: (state, action) => {
      state.modalLoading = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setMessages, 
  setUser, 
  setMessage, 
  setModalLoading 
} = stateSlice.actions

export default stateSlice.reducer