import React, { Component } from 'react';
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import history from '../../common/history';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// import { getRoleInfo, saveRoleInfo, containRole } from '../../helper/authenUser';
// @material-ui/icons
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
// core components
// import LogoBanner from '../common/LogoBanner';
// import { resources } from '../../helper/configLocalization.js';

const styles = theme => ({
  root: {   
    
  },
  toolbar: theme.mixins.toolbar,
  appbar: {
    backgroundColor: '#096FAE',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  grow: {
    flexGrow: 1,
    fontFamily: 'Prompt',
    color: 'white',
  },
  menuItem: {},
  menuText: {
    fontFamily: 'Prompt',
    color: '#0A517E',
  },
  menuIcon: {
    marginRight: 0,
    marginLeft: 16,   
  },
  banner: {
    // marginLeft: 24,
  },
  typography: {
    fontFamily: 'Prompt',
  },
  
});

const menuIcons = {
  dashboard: <DashboardIcon style={{ color: '#0A517E' }}/>,
  serial: <AssignmentIcon style={{ color: '#0A517E' }}/>,
  store:<LocalGroceryStoreIcon style={{ color: '#0A517E' }}/>,
  user: <PeopleIcon style={{ color: '#0A517E' }}/>,
  admin: <SettingsIcon style={{ color: '#0A517E' }}/>,
  // searchSerial: <Icon icon={searchOutline} width="24" height="24" />,
};

let menuOption = [];
let menuOption2 = [];

export class SideMenuPanel extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
      openMenu: false,
      openUserSubMenu: false,
      loading: true,
      openList: true,
    };
    this.handleOpenSubMenu = this.handleOpenSubMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    const { pathname } = this.props;
    menuOption = [
      {
        path: '/',
        name: 'Dashboard',
        icon: 'dashboard',
        hidden: false,
      },
      {
        path: '/store',
        name: 'Store-Z Shop',
        icon: 'store',
        hidden: false,
      },
      {
        subMenu: [
          {
            path: '/product-management',
            name: 'Product Management',
            icon: 'feedback',
            hidden: false,
          },
          {
            path: '/Serial-management',
            name: 'Serial Management',
            icon: 'scan',
            hidden: false,
          },
        ],
        name: 'Adminitator',
        icon: 'admin',
        hidden: false,
      },
    ];
  

    for (let menu of menuOption) {
      for (let subIndex in menu.subMenu) {
        const subMenu = menu.subMenu[subIndex];
        const selected = subMenu.path === pathname;
        if (selected) this.handleInitSubMenu(menu.keySub);
      }
    }
    this.setState({ loading: false });
  }

  handleMenu = (page = '') => e => {
    history.push(page);
  };

  handleClick = () => {
    this.setState(state => ({ openList: !state.openList }));
  };

  handleOpenSubMenu = key => event => {
    this.setState(state => ({
      [key]: !Boolean(state[key]),
    }));
  };
  handleInitSubMenu(key) {
    this.setState(state => ({
      [key]: !Boolean(state[key]),
    }));
  }

  render() {
    const { classes, pathname } = this.props;
    // let roleInfo =

    // if (roleInfo.name === "production_export") { //warehouse

    // } else if (roleInfo.name === "production_mapping") { //production

    // }
    if (this.state.loading) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div style={{backgroundColor: '#fff', color: 'white'}}>
          <Toolbar className={classes.appbar}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              เว็บจำลอง
            </Typography>
          </Toolbar>
          <List component="nav" >
            {menuOption.map((option, index) => {
              const selected = option.path === pathname;
              const subMenuContain = option.subMenu && option.subMenu.length > 0;
              if (option.hidden) return null;
              return (
                <React.Fragment key={option.path}>
                  <ListItem
                    button
                    key={option.path}
                    onClick={
                      subMenuContain
                        ? this.handleOpenSubMenu(option.keySub)
                        : this.handleMenu(option.path)
                    }
                    selected={selected}
                  >
                    <ListItemIcon className={classes.menuIcon} >
                      {' '}
                      {menuIcons[option.icon]}{' '}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="h6" className={classes.menuText}>
                            <b>{[option.name]}</b>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {subMenuContain &&
                      (this.state[option.keySub] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>
                  {subMenuContain && (
                    <Collapse in={this.state[option.keySub]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {option.subMenu.map((optionSub, index) => (
                          <ListItem
                            key={optionSub.path}
                            button
                            className={classes.nested}
                            onClick={this.handleMenu(optionSub.path)}
                            selected={optionSub.path === pathname}
                          >
                            <Badge
                              color="primary"
                              badgeContent={optionSub.badge}
                              invisible={!(optionSub.badge > 0)}
                            >
                              <ListItemText
                                inset
                                primary={
                                  <React.Fragment>
                                    <Typography component="h6" className={classes.menuText}>
                                      {[optionSub.name]}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </Badge>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(SideMenuPanel);
