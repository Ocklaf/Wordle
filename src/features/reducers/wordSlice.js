import { createSlice } from "@reduxjs/toolkit";
import { checkLetters } from "../thunks";


const initialState = {
  words: [
    {
      selectedSlot: 0,
      letterOfTheWord: ['', '', '', '', ''],
      //letterOfTheWord: ['N', 'O', 'B', 'L', 'E'],
      classNameColor: ['', '', '', '', ''],
    }],
  actualIndex: 0,
}

function selectSlot(state, action) {

 // console.log('han hecho click ', action.payload)
  state.words[state.actualIndex].selectedSlot = action.payload

  //console.log('state.words[state.actualIndex].selectedSlot', state.words[state.actualIndex].selectedSlot)
}

function getInitialState() {
  return {
    selectedSlot: 0,
    letterOfTheWord: ['', '', '', '', ''],
    classNameColor: ['', '', '', '', ''],
  }
}

function indexOfWord(state) {

  if (state.words[state.actualIndex].letterOfTheWord.indexOf('') === -1) {
    return null
  }
  return state.words[state.actualIndex].letterOfTheWord.indexOf('')
}

function letterKeyPushed(state, action) {

  console.log('han hecho click ', action.payload)
  if (state.words[state.actualIndex].selectedSlot !== null) {
    state.words[state.actualIndex].letterOfTheWord[state.words[state.actualIndex].selectedSlot] = action.payload
    state.words[state.actualIndex].selectedSlot = indexOfWord(state)
  }
}

function deleteLetterFromSlot(state) {

  let noSelectedSlot = state.words[state.actualIndex].selectedSlot === null
  let isSelectedAndNotEmpty = state.words[state.actualIndex].letterOfTheWord[state.words[state.actualIndex].selectedSlot] !== ''
  let isEmptyAndIsTheFirstSlot = state.words[state.actualIndex].letterOfTheWord[state.words[state.actualIndex].selectedSlot] === '' && state.words[state.actualIndex].selectedSlot !== 0

  if (noSelectedSlot) {
    state.words[state.actualIndex].letterOfTheWord[state.words[state.actualIndex].letterOfTheWord.length - 1] = ''
    state.words[state.actualIndex].selectedSlot = indexOfWord(state)
    return
  }

  if (isSelectedAndNotEmpty) {
    state.words[state.actualIndex].letterOfTheWord[state.words[state.actualIndex].selectedSlot] = ''
    state.words[state.actualIndex].selectedSlot = indexOfWord(state)
    return
  }

  if(isEmptyAndIsTheFirstSlot) {
    let previousSlot = state.words[state.actualIndex].selectedSlot - 1
    state.words[state.actualIndex].letterOfTheWord[previousSlot] = ''
    state.words[state.actualIndex].selectedSlot = indexOfWord(state)
  }
}


function customFullPending(state) {
  state.words[state.actualIndex].loading = true
}

function customFullFulfilled(state, action) {
  //state.words[state.actualIndex].gameId = action.payload
  console.log('el payload', action.payload)
  action.payload.forEach((value, index) => {
    console.log('value', value.status)
    if(value.status === 'in position') {
      state.words[state.actualIndex].classNameColor[index] = 'green'
      return
    } else if (value.status === 'in word') {
      state.words[state.actualIndex].classNameColor[index] = 'yellow'
      return
    }
    state.words[state.actualIndex].classNameColor[index] = 'grey'
  })

  /*Aquí hay un console.log*/
  console.log([...state.words[state.actualIndex].classNameColor])
  state.words[state.actualIndex].loading = false
  state.words.push(getInitialState())
  state.actualIndex++
}

function customFullRejected(state, action) {
  state.words[state.actualIndex].loading = false
  state.words[state.actualIndex].error = action.error.message
  //state.words[state.actualIndex].message = `Error initializing game: 404`
}


const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    selectSlotOnClick: selectSlot,
    letterClicked: letterKeyPushed,
    deleteLetter: deleteLetterFromSlot,
  },
  extraReducers: {
    [checkLetters.pending]: customFullPending,
    [checkLetters.fulfilled]: customFullFulfilled,
    [checkLetters.rejected]: customFullRejected
  }
})

export default wordSlice.reducer
export const { selectSlotOnClick, letterClicked, deleteLetter, enterKey } = wordSlice.actions