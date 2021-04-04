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
import { Navbar, Nav } from "react-bootstrap";
import "../index.css";
import axios from "axios";
import Admin from "../components/Admin/Admin";
import Orders from "../components/Orders/Orders";
import Create from "../components/Admin/Create/Create";
import RecentOrders from "../components/Admin/RecentOrders";
import url from "../url";

export const AppRouter = () => {
  // const url = "http://localhost:5000";
  // const url = "https://food-mania.herokuapp.com";

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
          <nav className="navbar" bg="light" variant="light">
            <ul>
              <li>
                <Link to="/profile">Home</Link>
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
                  style={{ border: "none", background: "none" }}
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
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/recentOrders">Recent Orders</Link>
              </li>
              <li>
                <Link to="/create">Add Products</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{ border: "none", background: "none" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          {/* <Navbar bg="dark" variant="dark">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Navbar> */}
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/recentOrders">
              <RecentOrders />
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
