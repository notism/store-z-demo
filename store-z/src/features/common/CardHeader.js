import React, { Component } from 'react';

// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import grey from '@material-ui/core/colors/grey';
// import IconButton from '@material-ui/core/IconButton';

// @material-ui/icons
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// core components


const styles = theme => ({
  root: {
    padding: '10px 0 ',
    // [theme.breakpoints.down(720 + theme.spacing.unit * 3 * 2)]: {
    //   marginLeft: 10,
    //   marginRight: 10,
    // },
  },
  title: { 
    // color: grey[800],
    fontWeight: 200,
    fontSize: 25,
    fontFamily: 'Prompt',
  },
  buttonBack:{
    fontFamily: 'Prompt',
    padding: 0,
    margin: '12px 12px 12px 0',
    color: grey[600],
  }
})

export class CardHeader extends Component {
  static propTypes = {

  };

  render() {
    const { classes, children, asset } = this.props
    return (
      <Toolbar className={classes.root}>
        <Typography variant="display2" color="inherit" className={classes.title} align="left">
          {children}
        </Typography>
        { Boolean(asset) ? asset : null}
      </Toolbar>
    );
  }
  // <IconButton className={classes.buttonBack} color="inherit" aria-label="Menu">
  //   <ChevronLeftIcon />
  // </IconButton>
}

export default withStyles(styles)(CardHeader)
