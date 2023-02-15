import '../../styles/error.css'
import { useSelector } from "react-redux";


function Error() {
  //const { id } = useSelector(state => state.game.gameId)
  const { error } = useSelector(state => state.error)
  
  return (

    <div className="error">
      <div className="overlay"></div>
      <div>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Error