import { createSlice } from "@reduxjs/toolkit";
import { startGame } from "../thunks";

const initialState = {
  gameId: '',
  loadingGame: false,
  error: '',
  message: ''
}

function customFullPending(state) {
  state.loadingGame = true
}

function customFullFulfilled(state, action) {
  state.gameId = action.payload
  state.loadingGame = false
}

function customFullRejected(state, action) {
  state.loadingGame = false
  state.message = 'Error initializing game: ' + action.error.message
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