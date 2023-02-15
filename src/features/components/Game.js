import '../../styles/game.css'
import Keyboard from "./Keyboard"
import Words from "./Words"
import Error from "./Error"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../thunks";
import { useSelector } from "react-redux";

function Game() {

  const dispatch = useDispatch()

  const { error } = useSelector(state => state.error)
  const { message } = useSelector(state => state.game)

  const { actualIndex } = useSelector(state => state.word)
  

  let finPartida = <></>

  useEffect(() => {
    if (actualIndex === 6) {
      finPartida = <h2>Has perdido</h2>
      /**Lanzar error partida terminada */
    }
  }, [actualIndex])

  function obtainGameId() {
    dispatch(startGame())
  }

  useEffect(() => obtainGameId(), [])

  return (
    <div className="game">
      {message && <div className="message">{message}</div>}
      <div className="board">
        <h1>Adivina la palabra</h1>
        <Words />
        {finPartida}
        <Keyboard />
        {error !== '' && <Error />}
      </div>
    </div>
  )
}

export default Game