import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
