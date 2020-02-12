import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = {
  root: {
    marginLeft: 5,
  },
  spinner: {
    marginLeft: 10,
    color: 'white',
  },
};
const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress className={props.classes.spinner} size={20} />
));

const SpinnerButton = props => {
  const { children, loading, ...rest } = props;
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  );
};

export default class ButtonWithLoading extends Component {
  render() {
    return <SpinnerButton {...this.props} />;
  }
}
