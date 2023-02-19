import '../../styles/words.css'
import '../../styles/loading.css'
import { useSelector } from 'react-redux'
import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { loading, words } = useSelector(state => state.wordle)
  const playedWords = words.length

  /*Array.from... crear un array sobre el que hacer el map https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n*/
  return (
    <div className="words">
     { loading && <Loading/>} 
      <div className="container ">
        {Array.from(Array(playedWords).keys()).map((_, index) => <Word key={index} actualWordIndex={index} />) }
      </div>
    </div>
  )
}

export default Words