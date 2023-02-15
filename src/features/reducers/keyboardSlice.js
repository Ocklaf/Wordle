import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
