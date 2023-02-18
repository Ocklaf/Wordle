import { createSlice } from "@reduxjs/toolkit";
import { checkWord } from "../thunks";

const initialState = {
  error: '',
  isAValidWord: false,
  loadingError: false
}

function pendingCheckWord(state) {
  state.loadingError = true
  state.isAValidWord = false
}

function fullfilledCheckWord(state, action) {
  state.loadingError = false

  let theWordDoesntExist = !action.payload.valid
  if (theWordDoesntExist) {
    state.error = 'La palabra no está en la lista'
    return
  }

  state.isAValidWord = true
}

function rejectedCheckWord(state, action) {
  state.loadingError = false
  state.error = "Error al verificar la palabra: " + action.error.message
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
    [checkWord.pending]: pendingCheckWord,
    [checkWord.fulfilled]: fullfilledCheckWord,
    [checkWord.rejected]: rejectedCheckWord
  }
})

export default errorSlice.reducer;
export const { changeErrorMsg } = errorSlice.actions
