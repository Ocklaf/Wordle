import { createSlice } from "@reduxjs/toolkit";
import { checkLetters } from "../thunks";

const initialState = {
  words: [
    {
      selectedSlot: 0,
      lettersOfTheWord: ['', '', '', '', ''],
      classNameColor: ['', '', '', '', ''],
    }],
  actualWordIndex: 0,
  endGameMessage: '',
  loadingCheckWord: false,
  errorInAnyLetter: '',
  keysColor: {},
}

function selectSlot(state, action) {
  state.words[state.actualWordIndex].selectedSlot = action.payload
}

function getInitialState() {
  return {
    selectedSlot: 0,
    lettersOfTheWord: ['', '', '', '', ''],
    classNameColor: ['', '', '', '', ''],
  }
}

function indexOfWord(state) {

  let allSlotsAreFilled = state.words[state.actualWordIndex].lettersOfTheWord.indexOf('') === -1

  if (allSlotsAreFilled) {
    return null
  }

  return state.words[state.actualWordIndex].lettersOfTheWord.indexOf('')
}

function letterKeyPushed(state, action) {

  let anySlotIsSelected = state.words[state.actualWordIndex].selectedSlot !== null

  if (anySlotIsSelected) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] = action.payload
    state.words[state.actualWordIndex].selectedSlot = indexOfWord(state)
  }
}


/*TODO*/
function deleteLetterFromSlot(state) {

  let noSelectedSlot = state.words[state.actualWordIndex].selectedSlot === null
  let isSelectedAndNotEmpty = state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] !== ''
  let isEmptyAndIsTheFirstSlot = state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] === '' && state.words[state.actualWordIndex].selectedSlot !== 0

  if (noSelectedSlot) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].lettersOfTheWord.length - 1] = ''
    state.words[state.actualWordIndex].selectedSlot = indexOfWord(state)
    return
  }

  if (isSelectedAndNotEmpty) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] = ''
    state.words[state.actualWordIndex].selectedSlot = indexOfWord(state)
    return
  }

  if (isEmptyAndIsTheFirstSlot) {
    let previousSlot = state.words[state.actualWordIndex].selectedSlot - 1
    state.words[state.actualWordIndex].lettersOfTheWord[previousSlot] = ''
    state.words[state.actualWordIndex].selectedSlot = indexOfWord(state)
  }
}

function setKeyboardColor(newClassNameColor, index, state) {
  let letter = state.words[state.actualWordIndex].lettersOfTheWord[index].toLowerCase()

  if (state.keysColor[letter] === 'green') {
    return
  }

  state.keysColor[letter] = newClassNameColor
}

function getStatusColor(status) {
  if (status === 'in position') {
    return 'green'
  }

  if (status === 'in word') {
    return 'yellow'
  }

  return 'grey'
}

/*TODO - VERIFICAR SI HAS GANADO EN UNA FUNCIÓN VIENDO LOS COLORES DE LAS PALABRAS*/
function setSlotsColor(dataReponseForEachWord, state) {
  let isTheCorrectLetter = 0

  dataReponseForEachWord.forEach((value, index) => {

    let color = getStatusColor(value.status)
    if (color === 'green') {
      isTheCorrectLetter++
    }

    state.words[state.actualWordIndex].classNameColor[index] = color
    setKeyboardColor(color, index, state)
  })

  if (isTheCorrectLetter === 5) {
    state.loadingCheckWord = false
    state.endGameMessage = 'Has ganado'
  }
}

function customFullPending(state) {
  state.loadingCheckWord = true
}

/*TODO - HACE DEMASIADAS COSAS*/
function customFullFulfilled(state, action) {
  let isTheLastWord = state.actualWordIndex === 5

  setSlotsColor(action.payload, state)

  if (isTheLastWord) {
    state.loadingCheckWord = false
    state.endGameMessage = 'Has perdido'
    return
  }

  state.actualWordIndex++
  state.words.push(getInitialState())
  state.loadingCheckWord = false
}

function customFullRejected(state, action) {
  state.loadingCheckWord = false
  state.errorInAnyLetter = action.error.message
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