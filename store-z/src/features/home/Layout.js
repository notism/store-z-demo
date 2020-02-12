import React, { Component } from 'react';
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { MuiThemeProvider, theme } from '../../styles/material-style.js'
// @material-ui/icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

// core components
import SideMenuPanel from '../common/SideMenuPanel';
// import ProfileMenuPopup from '../authen/ProfileMenuPopup'
// import LogoBanner from '../common/LogoBanner';
// import SearchInput from '../common/SearchInput';
// import ChangeLang from '../common/ChangeLang';

const drawerWidth = 280;

const styles = theme => ({
  root: {
    display: 'flex',    
  }, 
  appBar: {
    background: '#096FAE',
    zIndex: theme.zIndex.drawer + 1,
   
    [theme.breakpoints.down(720 + theme.spacing.unit * 3 * 2)]: {
      boxShadow: theme.shadows[0],
    },
  },
  // toolBar: {
  //   [theme.breakpoints.down(720 + theme.spacing.unit * 3 * 2)]: {
  //     // padding: "0",
  //   },
  // },
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
    fontFamily: 'Prompt',
  },
  avatar: {
    margin: 10,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: 8,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    borderRight: 0,
    width: drawerWidth,
    [theme.breakpoints.up(720 + theme.spacing.unit * 3 * 2)]: {
      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  // accountIcon: {
  //   color: grey[800]
  // }
});

class Layout extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
      openMenu: false,
      anchorElProfileMenu: null,
      mobileOpen: false,
      openUserSubMenu: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorElProfileMenu: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ anchorElProfileMenu: null });
  };

  handleOnSearch = value => {
    this.props.onSearch(value);
  };

  render() {
    const { classes, theme, pathname } = this.props;
    const { anchorElProfileMenu, mobileOpen } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="primary">
          <Toolbar className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            {
              //  <LogoBanner />
            }

            <Typography variant="h6" color="inherit" className={classes.grow}>เว็บจำลอง</Typography>
            {/* <SearchInput onSearch={this.handleOnSearch} /> */}
            {
              //<ChangeLang />
            }
            <IconButton
              aria-owns={'material-appbar'}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.accountIcon} />
            </IconButton>
            {
              // <ProfileMenuPopup anchorElProfileMenu={anchorElProfileMenu} onClose={this.handleProfileMenuClose} />
            }
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              <SideMenuPanel pathname={pathname} onClose={this.handleDrawerToggle} />
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <SideMenuPanel pathname={pathname} onClose={this.handleDrawerToggle} />
            </Drawer>
          </Hidden>
        </nav>
      </div>
       </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
