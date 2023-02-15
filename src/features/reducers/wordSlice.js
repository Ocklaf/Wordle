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
  endGameMessage: '',
  loadingCheckWord: false,
  keysColor: {
    'a': '',
    'b': '',
    'c': '',
    'd': '',
    'e': '',
    'f': '',
    'g': '',
    'h': '',
    'i': '',
    'j': '',
    'k': '',
    'l': '',
    'm': '',
    'n': '',
    'ñ': '',
    'o': '',
    'p': '',
    'q': '',
    'r': '',
    's': '',
    't': '',
    'u': '',
    'v': '',
    'w': '',
    'x': '',
    'y': '',
    'z': '',
  },
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

  //console.log('han hecho click ', action.payload)

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

  if (isEmptyAndIsTheFirstSlot) {
    let previousSlot = state.words[state.actualIndex].selectedSlot - 1
    state.words[state.actualIndex].letterOfTheWord[previousSlot] = ''
    state.words[state.actualIndex].selectedSlot = indexOfWord(state)
  }
}

function setKeyboardColor(newClassNameColor, index, state) {
  let letter = state.words[state.actualIndex].letterOfTheWord[index].toLowerCase()

  if (newClassNameColor === 'green' && state.keysColor[letter] !== 'green') {
    state.keysColor[letter] = newClassNameColor
    return
  }

  if (newClassNameColor === 'grey' && state.keysColor[letter] ===  '') {
    state.keysColor[letter] = newClassNameColor
    return
  }

  if (newClassNameColor === 'yellow' && state.keysColor[letter] === 'grey' || state.keysColor[letter] === '') {
    state.keysColor[letter] = newClassNameColor
  }

  //state.keysColor[letter] = newClassNameColor
 // console.log('letter', state.keysColor[letter])
}


function customFullPending(state) {
  state.loadingCheckWord = true
}

function customFullFulfilled(state, action) {
  //state.words[state.actualIndex].gameId = action.payload
  //console.log('el payload', action.payload)

  let isTheCorrectLetter = 0

  action.payload.forEach((value, index) => {
    //console.log('value', value.status)
    if (value.status === 'in position') {
      state.words[state.actualIndex].classNameColor[index] = 'green'
      isTheCorrectLetter++
      setKeyboardColor('green', index, state)
      return
    }

    if (value.status === 'in word') {
      state.words[state.actualIndex].classNameColor[index] = 'yellow'
      setKeyboardColor('yellow', index, state)
      return
    }

    state.words[state.actualIndex].classNameColor[index] = 'grey'
    setKeyboardColor('grey', index, state)
  })

  /*Aquí hay un console.log*/
  //console.log([...state.words[state.actualIndex].classNameColor])
  if (isTheCorrectLetter === 5) {
    state.loadingCheckWord = false
    state.endGameMessage = 'Has ganado'
    return
  }
    
  if (state.actualIndex === 5) {
    state.loadingCheckWord = false
    state.endGameMessage = 'Has perdido'
    return
  }
  
  state.actualIndex++
  state.words.push(getInitialState())
  state.loadingCheckWord = false
}

function customFullRejected(state, action) {
  state.loadingCheckWord = false
  state.error = action.error.message
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