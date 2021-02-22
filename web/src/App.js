import "./App.css";
import { AppRouter } from "./AppRouter/AppRouter";
import { useGlobalState, useSetGlobalState } from "./globalState/GlobalState";

function App() {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  return (
    <div className="App">
      <AppRouter />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste ex
      asperiores quos hic deserunt vitae repudiandae laborum porro cupiditate
      velit blanditiis tempora assumenda ipsum dicta dolorum suscipit, omnis
      tenetur libero!
    </div>
  );
}

export default App;
