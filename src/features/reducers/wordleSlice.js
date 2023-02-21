import { createSlice } from "@reduxjs/toolkit";
import { checkLetters, checkWord, startGame } from "../thunks";

const initialState = {
  gameId: '',
  words: [
    {
      selectedSlot: 0,
      lettersOfTheWord: ['', '', '', '', ''],
      classNameColor: ['', '', '', '', ''],
    }],
  isAValidWord: false,
  actualWordIndex: 0,
  endGameMessage: '',
  loading: false,
  keysColor: {},
  message: '',
  error: ''
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

function deleteLetterFromSlot(state) {

  let indexOfSelectedSlot = state.words[state.actualWordIndex].selectedSlot
  let noSelectedSlot = indexOfSelectedSlot === null
  let isSelectedAndNotEmpty = state.words[state.actualWordIndex].lettersOfTheWord[indexOfSelectedSlot] !== ''
  let isEmptyAndIsTheFirstSlot = state.words[state.actualWordIndex].lettersOfTheWord[indexOfSelectedSlot] === '' && indexOfSelectedSlot !== 0

  if (noSelectedSlot) {
    let lastIndexOfTheLetters = state.words[state.actualWordIndex].lettersOfTheWord.length - 1
    state.words[state.actualWordIndex].lettersOfTheWord[lastIndexOfTheLetters] = ''
    selectFirstEmptySlot(state)
    return
  }

  if (isSelectedAndNotEmpty) {
    state.words[state.actualWordIndex].lettersOfTheWord[indexOfSelectedSlot] = ''
    selectFirstEmptySlot(state)
    return
  }

  if (isEmptyAndIsTheFirstSlot) {
    let previousSlot = indexOfSelectedSlot - 1
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

function isTheGameFinished(state) {
  let isTheLastWord = state.actualWordIndex === 5
  state.loading = false

  if (isAllLettersGreen(state)) {
    state.endGameMessage = 'Has ganado'
    return true
  }

  if (isTheLastWord) {
    state.endGameMessage = 'Has perdido'
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

function changeErrorMessage(state, action) {
  state.error = action.payload
}

function pendingCheckWord(state) {
  state.loading = true
  state.isAValidWord = false
}

function fullfilledCheckWord(state, action) {

  setSlotsColor(action.payload, state)

  if (isTheGameFinished(state)) return

  state.actualWordIndex++
  state.words.push(getInitialState())
  state.loading = false
}

function rejectedCheckWord(state, action) {
  state.loading = false
  state.error = "Error al verificar la palabra: " + action.error.message
}

function pendingGetGameId(state) {
  state.loading = true
}

function fullfilledGetGameId(state, action) {
  state.gameId = action.payload.id
  state.loading = false
}

function rejectedGetGameId(state, action) {
  state.loading = false
  state.message = 'Error initializing game: ' + action.error.message
}

const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    selectSlotOnClick: selectSlot,
    letterClicked: letterKeyPushed,
    deleteLetter: deleteLetterFromSlot,
    changeErrorMsg: changeErrorMessage,
  },
  extraReducers: {
    [checkWord.pending]: pendingCheckWord,
    [checkWord.fulfilled]: fullfilledCheckWord,
    [checkWord.rejected]: rejectedCheckWord,
    [startGame.pending]: pendingGetGameId,
    [startGame.fulfilled]: fullfilledGetGameId,
    [startGame.rejected]: rejectedGetGameId
  }
})

export default wordleSlice.reducer
export const { selectSlotOnClick, letterClicked, deleteLetter, changeErrorMsg } = wordleSlice.actions