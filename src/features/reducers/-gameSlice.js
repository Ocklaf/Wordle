import { createSlice } from "@reduxjs/toolkit";
import { startGame } from "../thunks";

const initialState = {
  gameId: '',
  loadingGame: false,
  error: '',
  message: ''
}

function pendingGetGameId(state) {
  state.loadingGame = true
}

function fullfilledGetGameId(state, action) {
  state.gameId = action.payload
  state.loadingGame = false
}

function rejectedGetGameIs(state, action) {
  state.loadingGame = false
  state.message = 'Error initializing game: ' + action.error.message
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
  },
  extraReducers: {
    [startGame.pending]: pendingGetGameId,
    [startGame.fulfilled]: fullfilledGetGameId,
    [startGame.rejected]: rejectedGetGameIs
  }
})

export default gameSlice.reducer