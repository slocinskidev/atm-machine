import { FC, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from 'store';

import routes from 'routes';

import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { login } from 'features/user/userSlice';

import PageTitle from 'components/PageTitle';

import { APP_TITLE, VIEW_TITLE_LOGIN } from 'utils/constants';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { LoginProps } from './model.d';

interface IFormInputs {
  cardNumber: number;
  pin: number;
}

const schema = yup.object().shape({
  cardNumber: yup
    .number()
    .test('len', 'Must be exactly 8 numbers', (val) => val?.toString().length === 8)
    .typeError('Must be number')
    .positive()
    .integer()
    .required(),
  pin: yup
    .number()
    .test('val', 'Must be exactly 4 numbers', (val) => val?.toString().length === 4)
    .typeError('Must be number')
    .positive()
    .integer()
    .required(),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(1),
    },
    input: {
      marginBottom: theme.spacing(1),
    },
    errorMeassage: {
      color: theme.palette.error.main,
    },
  })
);

const Login: FC<LoginProps> = (): ReactElement => {
  const classes = useStyles();

  const {
    account,
    error: { message },
  } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    shouldFocusError: true,
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const logIn: SubmitHandler<IFormInputs> = (logInData) => {
    dispatch(login(logInData));
  };

  if (account) {
    return <Redirect to={routes.menu} />;
  }

  return (
    <>
      <Helmet>
        <title>
          {VIEW_TITLE_LOGIN} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={VIEW_TITLE_LOGIN} />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(logIn)}
          >
            <Controller
              name="cardNumber"
              control={control}
              defaultValue="12345678"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  className={classes.input}
                  label="Card Number"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
            <Controller
              name="pin"
              control={control}
              defaultValue="1234"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  className={classes.input}
                  label="Pin"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            {message && <p className={classes.errorMeassage}>{message}</p>}
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
