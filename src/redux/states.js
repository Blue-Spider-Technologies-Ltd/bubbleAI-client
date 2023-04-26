import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  loading: false
}

export const stateSlice = createSlice({
  name: 'messagesState',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.messages += 1
    // },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setMessages: (state, action) => {
      const newState = { user: 'user', text: action.payload};
      state.messages = [...state.messages, newState];
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMessages, setLoading } = stateSlice.actions

export default stateSlice.reducer