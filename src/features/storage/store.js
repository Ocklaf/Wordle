import { configureStore } from "@reduxjs/toolkit";
import wordleSlice from "../reducers/wordleSlice";

export const store = configureStore({
  reducer: {
    wordle: wordleSlice,
  },
});

export default store