import { createSlice } from "@reduxjs/toolkit";
import { checkWord } from "../thunks";

const initialState = {
  error: '',
  isValid: false,
}

function customFullPending(state) {
  state.loading = true
  state.isValid = false
}

function customFullFulfilled(state, action) {
  console.log(action.payload.valid)
  state.loading = false
  if (!action.payload.valid) {
    state.error = 'La palabra no está en la lista'
    return
  }
  state.isValid = true
}

function customFullRejected(state, action) {
  state.loading = false
  state.error = action.error.message
}

function changeErrorMessage(state, action) {
  state.error = action.payload
}
    
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    changeErrorMsg: changeErrorMessage,
  },
  extraReducers: {
    [checkWord.pending]: customFullPending,
    [checkWord.fulfilled]: customFullFulfilled,
    [checkWord.rejected]: customFullRejected
  }
})

//export const { keyPusshed } = keyboardSlice.actions
export default errorSlice.reducer;
export const { changeErrorMsg } = errorSlice.actions
