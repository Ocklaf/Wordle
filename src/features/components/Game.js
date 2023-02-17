import '../../styles/game.css'
import Keyboard from "./Keyboard"
import Words from "./Words"
import Error from "./Error"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../thunks";
import { changeErrorMsg } from '../reducers/errorSlice';

function Game() {

  const dispatch = useDispatch()

  const { error } = useSelector(state => state.error)
  const { message } = useSelector(state => state.game)
  const { endGameMessage, errorInAnyLetter } = useSelector(state => state.word)

  function obtainGameId() {
    dispatch(startGame())
  }

  /*según eslint, quitar el array vacío o que incluya obtainGameId pero entra en bucle infinito*/
  useEffect(() => obtainGameId(), [])

  useEffect(() => {    
    function setErrorMessage() {
      dispatch(changeErrorMsg(errorInAnyLetter))
    }
    if(!errorInAnyLetter) return
    setErrorMessage()
  }, [errorInAnyLetter])
  
  return (
    <div className="game">
      {message && <div className="message">{message}</div>}
      {endGameMessage && <div className="message">{endGameMessage}</div>}
      <div className="board">
        <h1>Adivina la palabra</h1>
        <Words />
        <Keyboard />
        {error !== '' && <Error />}
      </div>
    </div>
  )
}

export default Game