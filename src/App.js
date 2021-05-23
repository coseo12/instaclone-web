import { ApolloProvider, useReactiveVar } from '@apollo/client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { isLoggedInVar, darkModeVar, client } from './apollo';
import Layout from './components/layout/Layout';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import { darkTheme, GlobalStyles, lightTheme } from './styles';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {isLoggedIn ? null : (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              )}
              <Route path={`/users/:username`}>
                <Profile />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
