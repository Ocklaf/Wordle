import '../../styles/words.css'
import '../../styles/loading.css'
import { useSelector } from 'react-redux'
import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { loading, words } = useSelector(state => state.wordle)
  const playedWords = words.length

  return (
    <div className="words">
     { loading && <Loading/>} 
      <div className="container ">
        {Array.from(Array(playedWords)).map((_, index) => <Word key={index} actualWordIndex={index} />) }
      </div>
    </div>
  )
}

export default Words