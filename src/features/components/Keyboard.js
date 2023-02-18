import '../../styles/keyboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { letterClicked, deleteLetter } from '../reducers/wordSlice'
import { changeErrorMsg } from '../reducers/errorSlice'
import { checkWord, checkLetters } from '../thunks'
import { useEffect } from 'react'

function Keyboard() {

  const dispatch = useDispatch()
  const { words, actualWordIndex, keysColor, loadingCheckWord } = useSelector(state => state.word)
  const { isAValidWord, loadingError } = useSelector(state => state.error)
  const { gameId, loadingGame } = useSelector(state => state.game)
  const firstKeysLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const secondKeysLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
  const thirdKeysLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  function isLoadingSomething() {
    return loadingGame || loadingError || loadingCheckWord
  }

  function clickOnALetterKey(clickEvent) {
    if (isLoadingSomething()) return
    const letter = clickEvent.target.innerText
    dispatch(letterClicked(letter))
  }

  const upperKeyboardLine = firstKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const middleKeyboardLine = secondKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const lowerKeyboardLine = thirdKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)

  function cleanErrorMessage() {
    dispatch(changeErrorMsg(''))
  }

  function verifyLengthOfTheWord() {

    if (isLoadingSomething()) return

    cleanErrorMessage()

    let isAllTheSlotsWithLetters = words[actualWordIndex].lettersOfTheWord.indexOf('') === -1

    if (isAllTheSlotsWithLetters) {
      let joinedWord = words[actualWordIndex].lettersOfTheWord.join('')
      dispatch(checkWord(joinedWord))
      return
    }

    dispatch(changeErrorMsg('No hay suficientes letras'))
  }

  function clickedOnDeleteKey() {

    if (isLoadingSomething()) return

    dispatch(deleteLetter())
  }

  /*TODO - RENAME*/
  function addObjectsLetterWithPosition() {
    let arrayWithObjects = words[actualWordIndex].lettersOfTheWord.map((letter, index) => {
      return {
        "position": index,
        "letter": letter.toLowerCase(),
        "id": gameId.id
      }
    })

    dispatch(checkLetters(arrayWithObjects))
  }

  useEffect(() => {

    if (isAValidWord) {
      addObjectsLetterWithPosition()
    }

  }, [isAValidWord])


  return (
    <div className="keyboard">
      <div className="keyboard-line">
        {upperKeyboardLine}
      </div>
      <div className="keyboard-line">
        {middleKeyboardLine}
      </div>
      <div className="keyboard-line">
        <div className="command" onClick={verifyLengthOfTheWord}>↵</div>
        {lowerKeyboardLine}
        <div className="command" onClick={clickedOnDeleteKey}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" aria-hidden="true" style={{ width: "20px", height: "30px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z">
          </path>
        </svg>
        </div>
      </div>
    </div>
  )
}

export default Keyboard