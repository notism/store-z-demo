import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

// @material-ui/icons
// core components

const styles = theme => ({
  root: {
  },
  title: {
    fontWeight: 100,
    fontStyle: 'italic',
  }
})

export class SearchPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { classes, searchInput } = this.props
    //console.log("searchInput", searchInput)
    return (
      <div className="home-search-page">
        <Fade timeout={1000} in={true} >
          <Typography variant="h4" color="inherit" align="left" className={classes.title}>
            {`Search "${searchInput}" Result... `}
          </Typography>
        </Fade>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles )(SearchPage))