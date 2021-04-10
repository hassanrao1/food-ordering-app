import React, { useState } from "react";
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
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { NotFound } from "../components/NotFound";
import { useGlobalState, useSetGlobalState } from "../globalState/GlobalState";
import { Home } from "../components/Home/Home";
import Cart from "../components/Cart/Cart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Navbar, Nav } from "react-bootstrap";
import "../index.css";
import axios from "axios";
import Admin from "../components/Admin/Admin";
import Orders from "../components/Orders/Orders";
import Create from "../components/Admin/Create/Create";
import RecentOrders from "../components/Admin/RecentOrders";
import url from "../url";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import {
  Typography,
  Button,
  Toolbar,
  AppBar,
  IconButton,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AdminProducts from "../components/Admin/Products/AdminProducts";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 2,
  },
  nav: {
    backgroundColor: "#fc5185",
  },
  links: {
    color: "#fff",
    margin: "0 10px",
    textDecoration: "none",
  },

  list: {
    width: 300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hideNav: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginLeft: "auto",
    },
  },
  drawerLinks: {
    backgroundColor: "#fc5185",
    color: "#fff",
    height: "100vh",
  },
}));

export const AppRouter = () => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Router>
        <div className={classes.drawerLinks}>
          <List>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/profile"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <HomeIcon />
                </ListItemIcon>
                Home
              </Button>
            </ListItem>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/dashboard"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <DashboardIcon />
                </ListItemIcon>
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/orders"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <ReceiptIcon />
                </ListItemIcon>{" "}
                My Orders
              </Button>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon style={{ color: "#fff" }}>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Router>
    </div>
  );
  const list2 = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Router>
        <div className={classes.drawerLinks}>
          <List>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/admin"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <HomeIcon />
                </ListItemIcon>
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/recentOrders"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <DashboardIcon />
                </ListItemIcon>
                Recent Order
              </Button>
            </ListItem>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/create"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <ReceiptIcon />
                </ListItemIcon>{" "}
                Add Products
              </Button>
            </ListItem>
            <ListItem>
              <Button
                style={{ color: "#fff", textDecoration: "none" }}
                component={Link}
                to="/myProducts"
              >
                <ListItemIcon style={{ color: "#fff" }}>
                  <ReceiptIcon />
                </ListItemIcon>{" "}
                Products
              </Button>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem onClick={handleLogout}>
              <ListItemIcon style={{ color: "#fff" }}>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Router>
    </div>
  );
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
          <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
              <Toolbar>
                <div className={classes.menuButton}>
                  {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon style={{ color: "#fff" }} />
                      </Button>
                      <Drawer
                        anchor={anchor}
                        open={openDrawer[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                      >
                        {list(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                </div>
                <div className={classes.hideNav}>
                  {/* <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>Home</Typography>
                  </Link> */}

                  <Link
                    to="/dashboard"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>Shop</Typography>
                  </Link>
                  <Link
                    to="/orders"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>My Orders</Typography>
                  </Link>
                  <Link
                    to="/cart"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography style={{ display: "flex" }}>
                      <Typography variant="subtitle2">
                        {" "}
                        {globalState.cart.length}
                      </Typography>
                      <ShoppingCartIcon />
                    </Typography>
                  </Link>
                  <Link
                    className={[classes.links]}
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Typography onClick={handleLogout}>Logout</Typography>
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
          </div>

          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route exact path="/">
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
          <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
              <Toolbar>
                <div className={classes.menuButton}>
                  {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon style={{ color: "#fff" }} />
                      </Button>
                      <Drawer
                        anchor={anchor}
                        open={openDrawer[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                      >
                        {list2(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                </div>
                <div className={classes.hideNav}>
                  <Link
                    to="/admin"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>Dashboard</Typography>
                  </Link>
                  <Link
                    to="/recentOrders"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>Recent Orders</Typography>
                  </Link>
                  <Link
                    to="/create"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>
                      <Typography>Add Products</Typography>
                    </Typography>
                  </Link>
                  <Link
                    to="/myProducts"
                    className={classes.links}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography>
                      <Typography>Products</Typography>
                    </Typography>
                  </Link>
                  <Link
                    className={[classes.links]}
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    <Typography onClick={handleLogout}>Logout</Typography>
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
          </div>

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
            <Route path="/myProducts">
              <AdminProducts />
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
