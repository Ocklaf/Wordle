import Letter from './Letter'

import { useSelector } from 'react-redux'

function Word(props) {
  
  const { index } = props  
  const { letterOfTheWord, selectedSlot, classNameColor } = useSelector(state => state.word.words[index])

  let word = letterOfTheWord.map((value, index) =>
    <Letter color={classNameColor[index]} key={index} id={index} value={value} isSelected={index === selectedSlot} />)

  return (
    <div className="word">
      {word}
    </div>
  )
}

export default Word