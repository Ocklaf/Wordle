import '../../styles/game.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../thunks";
import Keyboard from "./Keyboard"
import Words from "./Words"
import Error from "./Error"

function Game() {

  const dispatch = useDispatch()
  const { endGameMessage, message, error } = useSelector(state => state.wordle)

  useEffect(() => {
    dispatch(startGame())
  }, [dispatch])
  
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