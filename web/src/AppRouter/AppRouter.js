import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { NotFound } from "../components/NotFound";
import { useGlobalState, useSetGlobalState } from "../globalState/GlobalState";
import { Home } from "../components/Home";

export const AppRouter = () => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  const themeStyle = {
    backGroundColor: globalState.darkTheme ? "#333" : "#ccc",
    color: globalState.darkTheme ? "#fff" : "black",
  };

  // console.log(globalState, setGlobalState);

  return (
    <div>
      <div>
        {JSON.stringify(globalState)}
        <button
          style={themeStyle}
          onClick={() =>
            setGlobalState((prev) => ({ ...prev, darkTheme: !prev.darkTheme }))
          }
        >
          Change Theme
        </button>
        <Router>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              {globalState.isLoggedIn ? <Dashboard /> : <NotFound />}
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};
