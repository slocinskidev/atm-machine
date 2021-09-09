import { FC } from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';

import { PageTitleProps } from './model';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: '2rem',
    },
  })
);

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.title} color="textSecondary">
      {title}
    </Typography>
  );
};

export default PageTitle;
