import { useReducer, FC, ReactElement } from 'react';
import { createTheme, Theme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RootState } from 'store';

import Layout from 'templates/Layout';
import Login from 'views/Login';
import Menu from 'views/Menu';
import Withdraw from 'views/Withdraw';
import AccountInfo from 'views/AccountInfo';

import { useAppSelector } from 'utils/hooks';

import { lightTheme, darkTheme } from 'theme';

import { APP_TITLE } from 'utils/constants';
import routes from 'routes';

import { RootProps } from './model.d';

const App: FC<RootProps> = (): ReactElement => {
  const [useDefaultTheme, toggle] = useReducer((theme: Theme | boolean) => !theme, true);

  let theme: Theme = createTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  const { account } = useAppSelector((state: RootState) => state.user);

  const privateRoutes = account ? (
    <>
      <Route path={routes.menu}>
        <Menu />
      </Route>
      <Route path={routes.withdraw}>
        <Withdraw />
      </Route>
      <Route path={routes.accountInfo}>
        <AccountInfo />
      </Route>
    </>
  ) : (
    <Redirect to={routes.login} />
  );

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
              <Route exact path={routes.login}>
                <Login />
              </Route>
              {privateRoutes}
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
