import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordsList: ['', '', '', '', '', ''],
  actualWordPlaying: 0,
}

// function addOneWord(state, action) {
//   state.actualWordPlaying++
//   console.log('state.actualWordPlaying', state.actualWordPlaying)
// }
 
const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
  // addNewWord: addOneWord,
  },
})

//export const { keyPusshed } = keyboardSlice.actions
//export const { addNewWord } = wordsSlice.actions
export default wordsSlice.reducer;