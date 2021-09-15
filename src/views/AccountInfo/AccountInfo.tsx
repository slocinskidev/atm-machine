import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import routes from 'routes';

import PageTitle from 'components/PageTitle';

import { APP_TITLE, VIEW_TITLE_ACCOUNT_INFO } from 'utils/constants';
import { AccountInfoProps } from './model.d';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      justifyContent: 'center',
    },
  })
);

const AccountInfo: FC<AccountInfoProps> = (): ReactElement => {
  const classes = useStyles();

  const { owner, balance, currency } = useSelector((state: RootState) => state.account);

  return (
    <>
      <Helmet>
        <title>
          {VIEW_TITLE_ACCOUNT_INFO} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={VIEW_TITLE_ACCOUNT_INFO} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={4}>
          <List aria-label="account details info">
            <ListItem button>
              <ListItemText primary="Owner" secondary={owner} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Balance" secondary={`${balance} ${currency}`} />
            </ListItem>
          </List>
          <Button
            component={RouterLink}
            to={routes.menu}
            variant="contained"
            color="primary"
            fullWidth
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountInfo;
