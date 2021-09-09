import { FC, ReactElement } from 'react';
import { makeStyles, createStyles, Theme, Link } from '@material-ui/core';

import { FooterProps } from './model';

import { FOOTER_TEXT, FOOTER_HEIGHT, FOOTER_URL } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.background.paper,
      minHeight: FOOTER_HEIGHT,
    },
  })
);

const Footer: FC<FooterProps> = (): ReactElement => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Link href={FOOTER_URL} target="_blank" rel="noreferrer">
        {FOOTER_TEXT}
      </Link>
    </footer>
  );
};

export default Footer;
