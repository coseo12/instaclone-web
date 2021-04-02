import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { isLoggedInVar, darkModeVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { darkTheme, GlobalStyles, lightTheme } from './styles';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
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
    </ThemeProvider>
  );
};

export default App;
