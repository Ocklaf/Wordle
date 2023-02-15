import { createSlice } from "@reduxjs/toolkit";
import { startGame } from "../thunks";

const initialState = {
  gameId: '',
  loading: false,
  error: '',
  message: ''
}

function customFullPending(state) {
  state.loading = true
}

function customFullFulfilled(state, action) {
  state.gameId = action.payload
  state.loading = false
}

function customFullRejected(state, action) {
  state.loading = false
  // state.error = action.error.message
  state.message = `Error initializing game: 404`
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
  },
  extraReducers: {
    [startGame.pending]: customFullPending,
    [startGame.fulfilled]: customFullFulfilled,
    [startGame.rejected]: customFullRejected
  }
})

export default gameSlice.reducer