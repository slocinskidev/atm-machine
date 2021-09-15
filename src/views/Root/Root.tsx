import { useReducer, FC, ReactElement } from 'react';
import { createTheme, Theme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from 'templates/Layout';
import Login from 'views/Login';
import Menu from 'views/Menu';
import Withdraw from 'views/Withdraw';
import AccountInfo from 'views/AccountInfo';

import { lightTheme, darkTheme } from 'theme';

import { APP_TITLE } from 'utils/constants';
import routes from 'routes';
import { store } from 'store';

import { RootProps } from './model.d';

const App: FC<RootProps> = (): ReactElement => {
  const [useDefaultTheme, toggle] = useReducer((theme: Theme | boolean) => !theme, true);

  let theme: Theme = createTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                <Route exact path={routes.login}>
                  <Login />
                </Route>
                <Route path={routes.menu}>
                  <Menu />
                </Route>
                <Route path={routes.withdraw}>
                  <Withdraw />
                </Route>
                <Route path={routes.accountInfo}>
                  <AccountInfo />
                </Route>
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
