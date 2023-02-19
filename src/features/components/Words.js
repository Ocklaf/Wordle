import '../../styles/words.css'
import '../../styles/loading.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { loading, words } = useSelector(state => state.wordle)
  const playedWords = words.length
  // const { loadingError } = useSelector(state => state.error)
  // const { loadingGame } = useSelector(state => state.game)

  //let [wordsList, setWordsList] = useState([])

  // function addNewWordInList() {
  //   setWordsList([...wordsList, <Word key={actualWordIndex} actualWordIndex={actualWordIndex} />])
  // }

  // useEffect(() => {
  //   addNewWordInList()
  // }, [actualWordIndex])

/*https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n*/
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