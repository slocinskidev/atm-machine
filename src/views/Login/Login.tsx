import { FC, ReactElement, useState, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import PageTitle from 'components/PageTitle';

import { APP_TITLE, VIEW_TITLE_LOGIN } from 'utils/constants';
import { LoginProps } from './model.d';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const getSteps = () => ['Enter card number', 'Enter PIN'];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return (
        <TextField
          id="outlined-card-number-input"
          label="Card number"
          type="text"
          variant="outlined"
          fullWidth
        />
      );
    case 1:
      return <TextField id="outlined-pin-input" label="PIN" type="password" variant="outlined" />;
    default:
      return 'Unknown step';
  }
};

const Login: FC<LoginProps> = (): ReactElement => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: ReactNode } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form className={classes.root} noValidate autoComplete="off">
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>You have been logged in!</Typography>
                <Button variant="contained" color="primary" component={Link} to="/menu">
                  Next
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
