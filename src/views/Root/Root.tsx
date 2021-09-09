import { useReducer, createContext, FC, ReactElement } from 'react';
import {
  createTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'templates/Layout';
import Login from 'views/Login';
import Menu from 'views/Menu';
import Withdraw from 'views/Withdraw';
import AccountInfo from 'views/AccountInfo';

import { lightTheme, darkTheme } from 'theme';

import { APP_TITLE } from 'utils/constants';
import { routes } from 'routes';

import { RootProps } from './model';

const AppContext = createContext(null);

const App: FC<RootProps> = (): ReactElement => {
  const [useDefaultTheme, toggle] = useReducer(
    (theme: Theme | boolean) => !theme,
    true
  );

  let theme: Theme = createTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
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
      </AppContext.Provider>
    </>
  );
};

export default App;
