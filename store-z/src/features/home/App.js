// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
// export default class App extends Component {
//   static propTypes = {
//     children: PropTypes.node,
//   };

//   static defaultProps = {
//     children: '',
//   };

//   render() {
//     return (
//       <div className="home-app">
//         <div className="page-container">{this.props.children}</div>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withSnackbar } from 'notistack';

// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
// core components
import history from '../../common/history';
import { Layout, SearchPage } from './';
// import { isExpired, getAllRolesInfo } from '../../helper/authenUser';
// import { loadLocalization } from '../../helper/configLocalization.js';
// import { getMyProfile, getMyRole } from '../authen/redux/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#ffffff',
    [theme.breakpoints.up(720 + theme.spacing.unit * 3 * 2)]: {
      backgroundColor: '#f2f3fa',
    },
  },
  toolbar: theme.mixins.toolbar,
  main: {
    width: '100%',
    overflow: 'hidden',
    display: 'block',
    [theme.breakpoints.up(720 + theme.spacing.unit * 3 * 2)]: {
      padding: `12px 24px`,
    },
  },
  content: {
    width: 'auto',
  },
  localizPanel: {
    color: 'rgba(0, 0, 0, 0.65)',
    position: 'absolute',
    background: 'white',
    padding: '4px',
    borderRadius: '0 0 0 8px',
    right: 0,
  },
  setected: {
    fontWeight: 900,
  },
  notSetect: {
    fontWeight: 100,
  },
});

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      lang: '',
      searchInput: '',
      prevPathname: '',
    };
    // this.handleIsExpired = this.handleIsExpired.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    // const lang = loadLocalization();
    // this.props.actions.changeLanguage(lang);
    // setInterval(() => {
    //   this.handleIsExpired();
    // }, 1000);
    // if (!isExpired()) {
    //   this.initUser();
    //   this.initApp();
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // const prevPathname = prevProps.location.pathname;
    // this.handleIsExpired(prevPathname);
  }

  // initApp() {
  //   const allRoles = getAllRolesInfo();
  //   if (!allRoles) {
  //     this.props.actions.getAllRoles();
  //   }
  // }

  // initUser() {
  //   const { getMyProfile, getMyRole } = this.props.actions;
  //   getMyProfile().then(() => {
  //     getMyRole();
  //   });
  // }

  // handleIsExpired() {
  //   const pathNotAuthen = ['/login', '/forgot-password', '/reset-password', '/access-denied'];
  //  let pathname = this.props.location.pathname;

  //   if (pathname.includes('/reset-password')) {
  //     pathname = '/reset-password';
  //   }
  //   const sessionExpired = isExpired();
  //   if (sessionExpired) {
  //     for (let path of pathNotAuthen) {
  //       if (pathname === path) return;
  //     }
  //    history.push('/login');
  //     return;
  //   }
  // }
  // handleIsExpired(prevPathname){
  //   const pathname = this.props.location.pathname
  //   const sessionExpired = isExpired()
  //   if( sessionExpired && (prevPathname !== pathname)){
  //     if(pathname !== '/login'){
  //       if(pathname === '/reset-password' && pathname !== prevPathname){
  //         history.push('/reset-password')
  //       }else
  //         history.push('/login')
  //     }
  //   }
  // }

  // handleChangeLanguage = events => {
  //   //const lang = loadLocalization();
  //   //const selected = lang === 'th' ? 'en' : 'th';
  //   const selected=events;
  //   this.props.actions.changeLanguage(selected);
  // };

  handleOnSearch = value => {
    this.setState({
      searchInput: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { searchInput } = this.state;
    // const lang = loadLocalization();
    const pathname = this.props.history.location.pathname;
    return (
      <div className={`${classes.root} home-app`}>
        <Layout pathname={pathname} onSearch={this.handleOnSearch} />

        <main className={classes.main}>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            {searchInput ? <SearchPage searchInput={searchInput} /> : this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators({ ...actions, getMyProfile, getMyRole }, dispatch),
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(withSnackbar(App)));

// <div className={`${classes.root} home-app`}>
//         {!isExpired() ? (
//           <Layout pathname={pathname} onSearch={this.handleOnSearch} />
//         ) : (
//           <Typography className={classes.localizPanel} >
//           {
//             // <span className={lang === 'th' ? classes.setected : classes.notSetect} onClick={e => this.handleChangeLanguage('th')}>Thai</span> |{' '}
//             // <span className={lang === 'en' ? classes.setected : classes.notSetect} onClick={e => this.handleChangeLanguage('en')}>English</span>
//             // {
//             // // <span className={lang === 'cn' ? classes.setected : classes.notSetect} onClick={e => this.handleChangeLanguage('cn')}>Chinese</span>
//             // }
//           }
//           </Typography>
//         )}
//         <main className={classes.main}>
//           <div className={classes.toolbar} />
//           <div className={classes.content}>
//             {searchInput ? <SearchPage searchInput={searchInput} /> : this.props.children}
//           </div>
//         </main>
//       </div>
