import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '../common/Card';
import CardHeader from '../common/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import ProductTable from './ProductTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export class ProductManagementPage extends Component {
  static propTypes = {
    productManagement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getProduct } = this.props.actions;
    const filter = {
      include: ['status'],
    };
    getProduct(filter);
  }

  reload = () => {
    const { getProduct } = this.props.actions;
    const filter = {
      include: ['status'],
    };
    getProduct(filter);
  };

  render() {
    const { classes } = this.props;
    const { product, getProductPending } = this.props.productManagement;
    return (
      <div className="product-management-product-management-page">
       
            <Typography>
              <CardHeader>คลังสินค้า</CardHeader>
            </Typography>
            <Divider />
           
              <CardContent />
            
            {getProductPending ? (
              <CircularProgress />
            ) : (
              <ProductTable reload={this.reload} data={product} actions={this.props.actions} />
            )}
    
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    productManagement: state.productManagement,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProductManagementPage));
