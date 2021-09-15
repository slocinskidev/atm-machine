import { FC, ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

import routes from 'routes';

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

  const { cardNumber, pin } = useSelector((state: RootState) => state.account);

  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    shouldFocusError: true,
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInputs> = (user) => {
    const isCorrectCardNumber: boolean = Object.is(user.cardNumber, cardNumber);
    const isCorrectPin: boolean = Object.is(user.pin, pin);
    const canLogin = isCorrectCardNumber && isCorrectPin;
    try {
      if (!canLogin) throw new Error('Wrong account details');
      setHasLoggedIn(canLogin);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error?.message);
    }
  };

  if (hasLoggedIn) {
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
            onSubmit={handleSubmit(onSubmit)}
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
            {errorMessage && <p className={classes.errorMeassage}>{errorMessage}</p>}
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
