import Letter from './Letter'

import { useSelector } from 'react-redux'

function Word(props) {

  console.log('Estamos en Word componente')
  console.log('props', props)
  
  const { index } = props
  
  
  
  const { letterOfTheWord, selectedSlot, classNameColor } = useSelector(state => state.word.words[index])
  //const letterOfTheWord = ['a', 'b', 'c', 'd', 'e'], selectedSlot = 2
  
  console.log(letterOfTheWord, selectedSlot, classNameColor)
  //let fiveSlots = new Array(5).fill('')
  let word = letterOfTheWord.map((value, index) =>
    <Letter color={classNameColor[index]} key={index} id={index} value={value} isSelected={index === selectedSlot} />)

  return (
    <div className="word">
      {word}
    </div>
  )
}

export default Word