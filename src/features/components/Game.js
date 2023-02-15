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
  const { actualIndex, endGameMessage } = useSelector(state => state.word)
  

  // He puesto dos condiciones para que no se muestre el mensaje de partida terminada en wordSlice.js revisar si es correcto
  //let finPartida = <></>
  //
  // useEffect(() => {
  //   if (actualIndex === 6) {
  //     finPartida = <h2>Has perdido</h2>
  //     /**Lanzar error partida terminada */
  //   }
  // }, [actualIndex])

  function obtainGameId() {
    dispatch(startGame())
  }

  useEffect(() => obtainGameId(), [])

  return (
    <div className="game">
      {message && <div className="message">{message}</div>}
      {endGameMessage && <div className="message">{endGameMessage}</div>}
      <div className="board">
        <h1>Adivina la palabra</h1>
        <Words />
        {/* {finPartida} */}
        <Keyboard />
        {error !== '' && <Error />}
      </div>
    </div>
  )
}

export default Game