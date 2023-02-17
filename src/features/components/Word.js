import Letter from './Letter'

import { useSelector } from 'react-redux'

function Word(props) {
  
  const { actualWordIndex } = props  
  const { lettersOfTheWord, selectedSlot, classNameColor } = useSelector(state => state.word.words[actualWordIndex])

  let word = lettersOfTheWord.map((value, index) =>
    <Letter
      color={classNameColor[index]}
      key={index}
      id={index}
      value={value}
      isSelected={index === selectedSlot}
      wordIndex={actualWordIndex} />)

  return (
    <div className="word">
      {word}
    </div>
  )
}

export default Word