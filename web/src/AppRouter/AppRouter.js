import React from "react";
import {
  HashRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import { NotFound } from "../components/NotFound";
import { useGlobalState, useSetGlobalState } from "../globalState/GlobalState";
import { Home } from "../components/Home/Home";
import Cart from "../components/Cart/Cart";
import "../index.css";
import axios from "axios";
import Admin from "../components/Admin/Admin";
import Orders from "../components/Orders/Orders";
import Create from "../components/Admin/Create/Create";

export const AppRouter = () => {
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const handleLogout = () => {
    axios({
      method: "post",
      url: `${url}/auth/logout`,
      withCredentials: true,
    }).then((res) => {
      setGlobalState((prevState) => ({ ...prevState, isLoggedIn: false }));
    });
  };

  // console.log(globalState, setGlobalState);

  return (
    <div>
      {!globalState.isLoggedIn ? (
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
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      ) : null}
      {globalState.isLoggedIn && globalState.role === "user" ? (
        <Router>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/orders">Your Orders</Link>
              </li>
              <li>
                <Link to="/cart">{globalState.cart.length} Cart</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{ border: "none", background: "#fff" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      ) : null}
      {globalState.isLoggedIn && globalState.role === "admin" ? (
        <Router>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
              <li>
                <Link to="/create">Add Products</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{ border: "none", background: "#fff" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="*">
              <Redirect to="/admin" />
            </Route>
          </Switch>
        </Router>
      ) : null}
    </div>
  );
};
