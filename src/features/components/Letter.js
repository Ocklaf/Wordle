import '../../styles/letter.css'
import { useDispatch, useSelector } from 'react-redux'

import { selectSlotOnClick } from '../reducers/wordSlice'

function Letter(props) {
  const { id, value, isSelected, color, wordIndex } = props
  const { actualWordIndex } = useSelector(state => state.word)

  const dispatch = useDispatch()

  function selectSlotAtCurrentLine(id) {
    if (wordIndex === actualWordIndex) {
      dispatch(selectSlotOnClick(id))      
    }
  }
 
  return (
    <div className="letter" onClick={() => selectSlotAtCurrentLine(id)}>
      <div className={`slot ${isSelected ? 'selected': ''} ${color}`}>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default Letter