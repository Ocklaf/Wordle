import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/words.css'
import '../../styles/loading.css'

import Word from "./Word"
import Loading from "./Loading"


function Words() {
  
  const { actualIndex, loadingCheckWord } = useSelector(state => state.word)
  const { loadingError } = useSelector(state => state.error)
  const { loadingGame } = useSelector(state => state.game)

  let [wordList, setWordList] = useState([])

  useEffect(() => {
    setWordList([...wordList, <Word key={actualIndex} index={actualIndex} />])
  }, [actualIndex])

  return (
    <div className="words">
     { (loadingGame || loadingError || loadingCheckWord) && <Loading/>} 
      <div className="container ">
        {wordList}
      </div>
    </div>
  )
}

export default Words