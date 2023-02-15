import '../../styles/letter.css'
import { useDispatch, useSelector } from 'react-redux'

import { selectSlotOnClick } from '../reducers/wordSlice'

function Letter(props) {
  const { id, value, isSelected, color } = props

  const dispatch = useDispatch()


  //función para seleccionar Slot, idPalabra === idSlot

  //const { letterOfTheWord, selectedSlot } = useSelector(state => state.word)
 
  return (
    <div className="letter" onClick={() => dispatch(selectSlotOnClick(id))}>
      <div className={`slot ${isSelected ? 'selected': ''} ${color}`}>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default Letter