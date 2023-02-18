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

function indexOfWord(state) {

  let allSlotsAreFilled = state.words[state.actualWordIndex].lettersOfTheWord.indexOf('') === -1

  if (allSlotsAreFilled) {
    return null
  }

  return state.words[state.actualWordIndex].lettersOfTheWord.indexOf('')
}


function selectSlot(state, action) {
  state.words[state.actualWordIndex].selectedSlot = action.payload
}

function selectFirstEmptySlot(state) {
  state.words[state.actualWordIndex].selectedSlot = indexOfWord(state)
}

function getInitialState() {
  return {
    selectedSlot: 0,
    lettersOfTheWord: ['', '', '', '', ''],
    classNameColor: ['', '', '', '', ''],
  }
}

function letterKeyPushed(state, action) {

  let anySlotIsSelected = state.words[state.actualWordIndex].selectedSlot !== null

  if (anySlotIsSelected) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] = action.payload
    selectFirstEmptySlot(state)
  }
}


/*TODO... sólo he sacado una función refactorizando... no veo cómo hacer algo más*/
function deleteLetterFromSlot(state) {

  let noSelectedSlot = state.words[state.actualWordIndex].selectedSlot === null
  let isSelectedAndNotEmpty = state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] !== ''
  let isEmptyAndIsTheFirstSlot = state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] === '' && state.words[state.actualWordIndex].selectedSlot !== 0

  if (noSelectedSlot) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].lettersOfTheWord.length - 1] = ''
    selectFirstEmptySlot(state)
    return
  }

  if (isSelectedAndNotEmpty) {
    state.words[state.actualWordIndex].lettersOfTheWord[state.words[state.actualWordIndex].selectedSlot] = ''
    selectFirstEmptySlot(state)
    return
  }

  if (isEmptyAndIsTheFirstSlot) {
    let previousSlot = state.words[state.actualWordIndex].selectedSlot - 1
    state.words[state.actualWordIndex].lettersOfTheWord[previousSlot] = ''
    selectFirstEmptySlot(state)
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

function isAllLettersGreen(state) {
  return state.words[state.actualWordIndex].classNameColor.every(color => color === 'green')
}

function setEndGameMessage(state, message) {
  state.endGameMessage = message
}

function isTheGameFinished(state) {
  let isTheLastWord = state.actualWordIndex === 5
  state.loadingCheckWord = false

  if (isAllLettersGreen(state)) {
    setEndGameMessage(state, 'Has ganado')
    return true
  }

  if (isTheLastWord) {
    setEndGameMessage(state, 'Has perdido')
    return true
  }

  return false
}

function setSlotsColor(dataReponseForEachWord, state) {

  dataReponseForEachWord.forEach((value, index) => {
    let color = getStatusColor(value.status)

    state.words[state.actualWordIndex].classNameColor[index] = color

    setKeyboardColor(color, index, state)
  })
}

function pendingCheckLetters(state) {
  state.loadingCheckWord = true
}

function fullfilledCheckLetters(state, action) {

  setSlotsColor(action.payload, state)

  if(isTheGameFinished(state)) return

  state.actualWordIndex++
  state.words.push(getInitialState())
  state.loadingCheckWord = false
}

function rejectedCheckLetters(state, action) {
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
    [checkLetters.pending]: pendingCheckLetters,
    [checkLetters.fulfilled]: fullfilledCheckLetters,
    [checkLetters.rejected]: rejectedCheckLetters
  }
})

export default wordSlice.reducer
export const { selectSlotOnClick, letterClicked, deleteLetter, enterKey } = wordSlice.actions