import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../reducers/gameSlice";
import keyboardReducer from "../reducers/keyboardSlice";
import errorSlice from "../reducers/errorSlice";
import wordSlice from "../reducers/wordSlice";
import letterSlice from "../reducers/letterSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    keyboard: keyboardReducer,
    error: errorSlice,
    word: wordSlice,
   // words: wordsSlice,
    letter: letterSlice,
  },
});

export default store