import React, { Component, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions';
import { MuiThemeProvider, theme } from '../../styles/material-style';
import Button from '../common/ButtonWaitingLoad';
import AddIcon from '@material-ui/icons/Add';

import { withSnackbar } from 'notistack';
//Popup
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
// import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
// TAble
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { UPLOAD } from '../../helper/api';
// import { resources } from '../../helper/configLocalization.js';

//test
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const button = {
  width: '100%',
  height: '70px',
  backgroundColor: '#e3f2fd',
  borderStyle: 'dotted',
  borderColor: '#01579b',
  color: '#01579b',
  marginTop: `${theme.spacing.unit * 1.5}px`,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#72213e',
  },
  '&:active': {
    backgroundColor: '#b5597b',
  },
  fontFamily: 'Suthasinee',
};

const MIN_HEIGHT = 512;
const MIN_WIDTH = 512;

// function Previews(props) {
//   const [files, setFiles] = useState([]);
//   const [errors, setErrors] = useState('');
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/jpeg, image/png',
//     minSize: 0,
//     maxSize: 5242880,
//     onDrop: acceptedFiles => {
//       let i = new Image();
//       i.src = URL.createObjectURL(acceptedFiles[0]);
//       i.onload = function() {
//         // setWidth1(i.naturalWidth);
//         // setheight(i.naturalHeight);
//         if (i.naturalHeight !== MIN_HEIGHT || i.naturalWidth !== MIN_WIDTH) {
//           setErrors('Error !!! Image must be 512 * 512 px');
//           setFiles([]);
//         } else {
//           props.path(acceptedFiles[0]);
//           setFiles(
//             acceptedFiles.map(file =>
//               Object.assign(file, {
//                 preview: URL.createObjectURL(file),
//               }),
//             ),
//           );
//           setErrors('');
//         }
//       };
//     },
//   });

//   const thumbs = files.map(file => (
//     <div style={thumb} key={file.name}>
//       <div style={thumbInner}>
//         <img src={file.preview} style={img} />
//       </div>
//     </div>
//   ));

//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach(file => URL.revokeObjectURL(file.preview));
//     },
//     [files],
//   );
//   return (
//     <section className="container">
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <Button style={button} variant="outlined">
//           {resources.clickHere}
//           <br /> {resources.uploadYourImg} (512px * 512px) .jpg or .png
//         </Button>
//       </div>
//       <br />
//       {{ errors } !== '' && <Typography className={props.classes.error}>{errors}</Typography>}
//       <aside>{thumbs}</aside>
//     </section>
//     //style={thumbsContainer}
//   );
// }
const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    product: {
      productName: '',
      description: '',
      type: '',
      price: 0,
    },
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleChange = name => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState(
      {
        
          ...state.product,
          [name]: value,
       
      },
      
      // () => {
      //   console.log(state.product, 'add product');
      // },
    );
    console.log(state.product, 'add product');
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, true)}
    >
      <form>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <DialogContent>
                  <DialogContentText className={classes.inputtext}>
                    <TextField
                      required
                      type="text"
                      placeholder="ชื่อสินค้า"
                      name="productName"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogContentText className={classes.inputtext}>
                    <TextField
                      required
                      type="text"
                      placeholder="คำอธิบาย"
                      name="description"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      onChange={handleChange('description')}
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogContentText className={classes.inputtext}>
                    <TextField
                      required
                      type="text"
                      placeholder="ประเภท"
                      name="type"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      onChange={handleChange('type')}
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogContentText className={classes.inputtext}>
                    <TextField
                      required
                      type="number"
                      placeholder="ราคา"
                      name="price"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      onChange={handleChange('price')}
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogActions>
                    <Button variant="outlined" className={classes.button2}>
                      ยกเลิก
                    </Button>
                    {
                      // <Button
                      //   className={classes.button}
                      //   type="submit"
                      //   loading={addProductPending}
                      //   disabled={addProductPending}
                      //   style={{ fontSize: 15, color: 'white' }}
                      // >
                      //   ยืนยัน
                      // </Button>
                      <Button
                        className={classes.button}
                        type="submit"
                        style={{ fontSize: 15 }}
                        color="primary"
                        variant="outlined"
                      >
                        ยืนยัน
                      </Button>
                    }
                  </DialogActions>
                </DialogContent>
              </TableCell>
              <TableCell align="center">
                <DialogContent>
                  <DialogContentText></DialogContentText>
                </DialogContent>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <DialogContent>
                  <DialogContentText className={classes.inputtext}>
                    product
                    <TextField
                      required
                      type="text"
                      placeholder="Ex. PROD A"
                      name="productName"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      onChange={this.handleChange('productName')}
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogContentText className={classes.inputtext}>
                    description
                    <TextField
                      required
                      type="text"
                      placeholder="EX. Paper"
                      name="description"
                      InputProps={{ classes: { input: classes.inputtext } }}
                      onChange={this.handleChange('description')}
                      fullWidth
                    />
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      onClick={this.handleClose}
                      variant="outlined"
                      className={classes.button2}
                    >
                      ยกเลิก
                    </Button>
                    {
                      // <Button
                      //   className={classes.button}
                      //   type="submit"
                      //   loading={addProductPending}
                      //   disabled={addProductPending}
                      //   style={{ fontSize: 15, color: 'white' }}
                      // >
                      //   ยืนยัน
                      // </Button>
                      <Button
                        className={classes.button}
                        type="submit"
                        style={{ fontSize: 15, color: 'white' }}
                      >
                        ยืนยัน
                      </Button>
                    }
                  </DialogActions>
                </DialogContent>
              </TableCell>
              <TableCell align="center">
                <DialogContent>
                  <DialogContentText></DialogContentText>
                </DialogContent>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={toggleDrawer('right', true)}>
        เพิ่มสินค้าใหม่
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const styles = theme => ({
  inputtext: {
    fontFamily: 'Suthasinee',
    //color: '#FF0000',
  },
  error: {
    fontFamily: 'Suthasinee',
    color: '#FF0000',
  },
  buttonmain: {
    backgroundColor: '#A3305A',
    borderColor: '#A3305A',
    color: '#fff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#72213e',
    },
    '&:active': {
      backgroundColor: '#b5597b',
    },
    fontFamily: 'Suthasinee',
  },
  button: {
    width: '100%',
    backgroundColor: '#A3305A',
    borderColor: '#A3305A',
    color: '#fff',
    marginTop: `${theme.spacing.unit * 1.5}px`,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#72213e',
    },
    '&:active': {
      backgroundColor: '#b5597b',
    },
    fontFamily: 'Suthasinee',
  },
  button2: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#A3305A',
    color: '#A3305A',
    marginTop: `${theme.spacing.unit * 1.5}px`,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#f3e7eb',
    },
    '&:active': {
      backgroundColor: '#72213e',
    },
    fontFamily: 'Suthasinee',
  },
});
export class ButtonAdd extends Component {
  static propTypes = {
    productManagement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({ files });
    };

    this.state = {
      product: {
        productName: '',
        description: '',
        agentPoint: 5,
        consumerPoint: '',
        point: 25,
        categoryGroupId: '',
        status: 'active',
      },
      // img: {
      //   imageUrl: '',
      // },
      files: [],
      opened: false,
    };

    this.toggleBox = this.toggleBox.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {}

  onDrop = acceptedFiles => {
    console.log(acceptedFiles);
  };

  handleImportImage = (file, productId) => {
    let formData = new FormData();
    formData.append('file', file.imageUrl);
    formData.append('productId', productId);
    const { reload } = this.props;

    UPLOAD(1, 'assets/uploadProductImage', formData).then(
      res => {
        // const { updateProductById } = this.props.actions;
        // const data = {
        //   id: productId,
        //   data: {
        //     imageUrl: res.data.url,
        //   },
        // };
        // updateProductById(data);
        // console.log('upload success');
        this.props.enqueueSnackbar('Create new product succesfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });

        reload();
      },
      err => {
        // this.handleSnacker(err, 'error');
        console.log('upload fail');
      },
    );
  };

  handleSubmit = events => {
    events.preventDefault();
    const { reload } = this.props;
    const { addProduct } = this.props.actions;
    const data = {
      data: {
        productName: {
          EN: this.state.product.productName,
        },
        description: {
          EN: this.state.product.description,
        },
        agentPoint: this.state.product.agentPoint,
        consumerPoint: this.state.product.consumerPoint,
        point: this.state.product.point,
        categoryGroupId: this.state.product.categoryGroupId,
        status: this.state.product.status,
      },
    };

    addProduct(data).then(
      res => {
        this.setState({
          opened: false,
        });

        let notPic = this.state.img === undefined;

        if (!notPic) {
          this.handleImportImage(this.state.img, res.id);
        } else {
          this.props.enqueueSnackbar('Create new product succesfully', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
          reload();
        }
      },
      err => {
        this.props.enqueueSnackbar('Create new product failed!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      },
    );
  };

  handleChange = name => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(
      {
        product: {
          ...this.state.product,
          [name]: value,
        },
      },
      () => {
        console.log(this.state.product, 'add product');
      },
    );
  };

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  handleClose() {
    this.setState({
      opened: false,
    });
  }

  GetPathImage = File => {
    this.setState({ img: { imageUrl: File } }, () => console.log(this.state));
  };

  render() {
    const { classes } = this.props;
    const { addProductPending } = this.props.productManagement;
    return (
      <React.Fragment>
        <SwipeableTemporaryDrawer />
      </React.Fragment>
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
)(withStyles(styles)(withSnackbar(ButtonAdd)));
