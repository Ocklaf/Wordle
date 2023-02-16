import '../../styles/game.css'
import Keyboard from "./Keyboard"
import Words from "./Words"
import Error from "./Error"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../thunks";

function Game() {

  const dispatch = useDispatch()

  const { error } = useSelector(state => state.error)
  const { message } = useSelector(state => state.game)
  const { endGameMessage, errorInAnyLetter } = useSelector(state => state.word)

  function obtainGameId() {
    dispatch(startGame())
  }

  /*según eslint, quitar el array vacío*/
  useEffect(() => obtainGameId(), [])

  return (
    <div className="game">
      {message && <div className="message">{message}</div>}
      {endGameMessage && <div className="message">{endGameMessage}</div>}
      <div className="board">
        <h1>Adivina la palabra</h1>
        <Words />
        <Keyboard />
        {error !== '' && <Error />}
        {errorInAnyLetter !== '' && <Error />}

      </div>
    </div>
  )
}

export default Game