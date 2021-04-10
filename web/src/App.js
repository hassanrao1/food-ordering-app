import "./App.css";
import { AppRouter } from "./AppRouter/AppRouter";
import { useGlobalState, useSetGlobalState } from "./globalState/GlobalState";
import { Grid } from "@material-ui/core";

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
