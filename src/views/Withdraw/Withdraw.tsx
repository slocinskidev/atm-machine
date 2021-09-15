import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import { withdrawOptions, APP_TITLE, VIEW_TITLE_WITHDRAW } from 'utils/constants';

import routes from 'routes';

import PageTitle from 'components/PageTitle';

import { WithdrawProps } from './model.d';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      justifyContent: 'center',
    },
  })
);

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
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={4}>
          <List aria-label="withdraw choice">
            {Object.values(withdrawOptions).map((option) => (
              <ListItem button>
                <ListItemText primary={`${option} ${typeof option === 'number' ? 'PLN' : ''}`} />
              </ListItem>
            ))}
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

export default Withdraw;
