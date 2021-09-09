import { FC } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  CssBaseline,
} from '@material-ui/core';

import { LayoutProps } from './model';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Paper from '@material-ui/core/Paper';

import { FOOTER_HEIGHT, HEADER_HEIGHT, PAGE_MAX_WIDTH } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      marginTop: HEADER_HEIGHT,
      padding: theme.spacing(3),
      minHeight: `calc(100vh - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px)`,
      width: '100%',
      maxWidth: PAGE_MAX_WIDTH,
      margin: '0 auto',
    },
    wrapper: {
      padding: '3rem 0',
    },
  })
);

const Layout: FC<LayoutProps> = ({
  toggleTheme,
  useDefaultTheme,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} useDefaultTheme={useDefaultTheme} />
      <main className={classes.content}>
        <Paper className={classes.wrapper}>{children}</Paper>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
