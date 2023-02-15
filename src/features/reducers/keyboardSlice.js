import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keysColor: {
    'a': '',
    'b': '',
    'c': '',
    'd': '',
    'e': '',
    'f': '',
    'g': '',
    'h': '',
    'i': '',
    'j': '',
    'k': '',
    'l': '',
    'm': '',
    'n': '',
    'ñ': '',
    'o': '',
    'p': '',
    'q': '',
    'r': '',
    's': '',
    't': '',
    'u': '',
    'v': '',
    'w': '',
    'x': '',
    'y': '',
    'z': '',
  },
};

function keyPressed(state, action) {
  console.log("keyPressed");
  //state.keyboardState = 'keyPressed';
}

    
const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    keyPusshed: keyPressed,
  },
})

export const { keyPusshed } = keyboardSlice.actions
export default keyboardSlice.reducer;
