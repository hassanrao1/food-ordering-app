import "./App.css";
import { AppRouter } from "./AppRouter/AppRouter";
import { useGlobalState, useSetGlobalState } from "./globalState/GlobalState";

function App() {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
