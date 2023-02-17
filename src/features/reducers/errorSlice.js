import { createSlice } from "@reduxjs/toolkit";
import { checkWord } from "../thunks";

const initialState = {
  error: '',
  isAValidWord: false,
  loadingError: false
}

function customFullPending(state) {
  state.loadingError = true
  state.isAValidWord = false
}

/*TODO - full full?*/
function customFullFulfilled(state, action) {
  state.loadingError = false

  let theWordDoesntExist = !action.payload.valid
  if (theWordDoesntExist) {
    state.error = 'La palabra no está en la lista'
    return
  }

  state.isAValidWord = true
}

function customFullRejected(state, action) {
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
    [checkWord.pending]: customFullPending,
    [checkWord.fulfilled]: customFullFulfilled,
    [checkWord.rejected]: customFullRejected
  }
})

export default errorSlice.reducer;
export const { changeErrorMsg } = errorSlice.actions
