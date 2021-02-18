import React from 'react'
import {BrowserRouter as Router,Switch,Link,Route} from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Signup from '../components/Signup'

export const AppRouter = () => {
    return (
        <div>
           <Router>
      <nav className="navbar">
        <ul>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='/signup'>signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/'>
         <Dashboard />
          </Route>
        <Route path='/signup'>
         <Signup />
          </Route>
        <Route path='/login'>
         <Login />
        </Route>
      </Switch>
    </Router>
        </div>
    )
}
