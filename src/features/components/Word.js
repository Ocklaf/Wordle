import { useSelector } from 'react-redux'
import Letter from './Letter'

function Word(props) {
  
  const { actualWordIndex } = props  
  const { lettersOfTheWord, selectedSlot, classNameColor } = useSelector(state => state.wordle.words[actualWordIndex])


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