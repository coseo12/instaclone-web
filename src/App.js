import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { isLoggedInVar, darkModeVar } from './apollo';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import { darkTheme, GlobalStyles, lightTheme } from './styles';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path={routes.home}>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {isLoggedIn ? null : (
            <Route path={routes.signUp}>
              <SignUp />
            </Route>
          )}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
