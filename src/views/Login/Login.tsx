import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import PageTitle from 'components/PageTitle';

import { LoginProps } from './model';

import { APP_TITLE, VIEW_TITLE_LOGIN } from 'utils/constants';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })
);

const Login: FC<LoginProps> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {VIEW_TITLE_LOGIN} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={VIEW_TITLE_LOGIN} />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-password-input"
              label="Enter your PIN"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/menu"
            >
              Next
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
