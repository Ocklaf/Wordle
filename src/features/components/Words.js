import '../../styles/words.css'
import '../../styles/loading.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { actualWordIndex, loadingCheckWord } = useSelector(state => state.word)
  const { loadingError } = useSelector(state => state.error)
  const { loadingGame } = useSelector(state => state.game)

  let [wordsList, setWordsList] = useState([])

  function addNewWordInList() {
    setWordsList([...wordsList, <Word key={actualWordIndex} actualWordIndex={actualWordIndex} />])
  }

  useEffect(() => {
    addNewWordInList()
  }, [actualWordIndex])

  return (
    <div className="words">
     { (loadingGame || loadingError || loadingCheckWord) && <Loading/>} 
      <div className="container ">
        {wordsList}
      </div>
    </div>
  )
}

export default Words