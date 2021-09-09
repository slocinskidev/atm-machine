import { FC, ReactElement } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import { HeaderProps } from './model';

import { APP_TITLE, PAGE_MAX_WIDTH } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: PAGE_MAX_WIDTH,
      margin: '0 auto',
    },
  })
);

const Header: FC<HeaderProps> = ({
  toggleTheme,
  useDefaultTheme,
}): ReactElement => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" noWrap>
          {APP_TITLE}
        </Typography>
        <IconButton onClick={toggleTheme}>
          {useDefaultTheme ? (
            <Tooltip title="Switch to dark mode" placement="bottom">
              <Brightness3Icon />
            </Tooltip>
          ) : (
            <Tooltip title="Switch to light mode" placement="bottom">
              <Brightness7Icon />
            </Tooltip>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
