import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import { PrivateRoute } from './Auth';


function App() {
  return (


    <BrowserRouter>
      <div className='App'>
        {/* <header className='App-header'>
          <div className='App-navbar'>
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </div>
          </header> */}

          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={LoginForm} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

// removed the header from here since we don't need it on the login screen
// add the header to the "home" component