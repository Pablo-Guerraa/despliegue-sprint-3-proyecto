import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import RoutesApp from "../routes/RoutesApp";
import '../styles/app.css';


function App() {

  return (
    <Provider store={ store }>
      <RoutesApp/>
    </Provider>
  );
}

export default App;
