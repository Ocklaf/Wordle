import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/words.css'

import Word from "./Word"


function Words() {

  // const { actualWordPlaying } = useSelector(state => state.words)
  const { actualWordPlaying } = useSelector(state => state.words)

  const { actualIndex } = useSelector(state => state.word)
  
  let [wordList, setWordList] = useState([])
  
  useEffect(() => {
    console.log('test')
    setWordList([...wordList, <Word key={actualWordPlaying} index={ actualWordPlaying} />])
  }, [actualIndex])
    

  // let arrayOfWords = new Array(5).fill('')
  // arrayOfWords[actualWordPlaying] = <Word key={actualWordPlaying} />
  
  return (
    <div className="words">
      <div className="container ">
        {wordList}
      </div>
    </div>
  )
}

export default Words