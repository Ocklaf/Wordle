import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/words.css'
import '../../styles/loading.css'

import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { actualWordIndex, loadingCheckWord } = useSelector(state => state.word)
  const { loadingError } = useSelector(state => state.error)
  const { loadingGame } = useSelector(state => state.game)

  let [wordsList, setWordsList] = useState([])

  useEffect(() => {
    setWordsList([...wordsList, <Word key={actualWordIndex} actualWordIndex={actualWordIndex} />])
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