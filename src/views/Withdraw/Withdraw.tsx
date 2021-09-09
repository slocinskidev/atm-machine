import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import PageTitle from 'components/PageTitle';

import { APP_TITLE, VIEW_TITLE_WITHDRAW } from 'utils/constants';
import { WithdrawProps } from './model.d';

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

const Withdraw: FC<WithdrawProps> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {VIEW_TITLE_WITHDRAW} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={VIEW_TITLE_WITHDRAW} />
      <List component="nav" aria-label="secondary mailbox folders">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <ListItem className={classes.listItem} button component={RouterLink} to="/withdraw">
              <ListItemText className={classes.listItemText} primary="Withdraw" />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem className={classes.listItem} button component={RouterLink} to="/account-info">
              <ListItemText className={classes.listItemText} primary="Account info" />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem className={classes.listItem} button component={RouterLink} to="/">
              <ListItemText className={classes.listItemText} primary="Logout" />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </>
  );
};

export default Withdraw;
