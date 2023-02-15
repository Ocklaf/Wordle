import { Provider } from "react-redux"
import Game from "./Game"
import store from "../storage/store"

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

export default App