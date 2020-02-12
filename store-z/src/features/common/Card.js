import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';


// @material-ui/icons
// core components

const styles = theme => ({
  paper: {
    fontFamily: 'Prompt',
    minHeight: 125,
    boxShadow: '0 5px 20px #d6dee4',
    overflow: "hidden",
    width: 'auto',
    display: 'block',
  //  paddingBottom: 50
    // [theme.breakpoints.down(720 + theme.spacing.unit * 3 * 2)]: {
    //   marginLeft: 12,
    //   marginRight: 12,
    // },
  },
  margin: {
    fontFamily: 'Prompt',
    margin: 12,
  }

})

export class Card extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { classes, margin,minHeight } = this.props

  
    return (
      <Fade timeout={1000} in={true} >
      <Paper className={`${classes.paper} ${margin ? classes.margin : ""} `}>
          {this.props.children}
        </Paper>
      </Fade>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Card));