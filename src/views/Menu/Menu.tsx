import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import { RootState } from 'store';

import routes from 'routes';

import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { logout } from 'features/user/userSlice';

import PageTitle from 'components/PageTitle';

import { APP_TITLE, VIEW_TITLE_MENU } from 'utils/constants';
import { MenuProps } from './model.d';

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: '10px 0',
    width: '320px',
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    textAlign: 'center',
    color: '#fff',
  },
}));

const Menu: FC<MenuProps> = (): ReactElement => {
  const classes = useStyles();

  const { account } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  if (!account) {
    return <Redirect to={routes.login} />;
  }

  return (
    <>
      <Helmet>
        <title>
          {VIEW_TITLE_MENU} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={VIEW_TITLE_MENU} />
      <List component="nav" aria-label="login menu">
        <Grid container direction="column" justifyContent="space-between" alignItems="center">
          <Grid item>
            <ListItem
              className={classes.listItem}
              button
              component={RouterLink}
              to={routes.withdraw}
            >
              <ListItemText className={classes.listItemText} primary="Withdraw" />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem
              className={classes.listItem}
              button
              component={RouterLink}
              to={routes.accountInfo}
            >
              <ListItemText className={classes.listItemText} primary="Account info" />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem className={classes.listItem} button onClick={logOut}>
              <ListItemText className={classes.listItemText} primary="Logout" />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </>
  );
};

export default Menu;
