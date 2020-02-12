import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/ButtonWaitingLoad';
import EditIcon from '@material-ui/icons/Edit';
import { MuiThemeProvider, theme } from '../../styles/material-style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withSnackbar } from 'notistack';
// Popup
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { resources } from '../../helper/configLocalization.js';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
// import { useDropzone } from 'react-dropzone';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { UPLOAD } from '../../helper/api';

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

//   const scrPic = `https://tbsp-piv-ele-web-consumer-bucket.s3.ap-southeast-1.amazonaws.com/img/product/${
//     props.img
//   }`;

//   useEffect(
//     () => {
//       if (props.img === undefined) {
//         //console.log('no pic');
//         // Make sure to revoke the data uris to avoid memory leaks
//         files.forEach(file => URL.revokeObjectURL(file.preview));
//       } else {
//         //console.log('has pic');
//         setFiles([...files, { preview: scrPic }]);
//       }
//     },
//     () => {
//       if (props.img === undefined) {
//         //console.log('no pic');
//         // Make sure to revoke the data uris to avoid memory leaks
//         files.forEach(file => URL.revokeObjectURL(file.preview));
//       } else {
//         //console.log('has pic');
//         files.preview = scrPic;
//       }
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
//       {{ errors } !== '' && <p className={props.classes.error}>{errors}</p>}
//       <aside>{thumbs}</aside>
//     </section>
//     //style={thumbsContainer}
//   );
// }

const styles = theme => ({
  inputtext: {
    fontFamily: 'Suthasinee',
  },
  error: {
    fontFamily: 'Suthasinee',
    color: '#FF0000',
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

export class ButtonEdit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
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
        consumerPoint: '',
      },
      img: {
        imageUrl: '',
      },
      files: [],
      opened: false,
      loading: false,
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // main
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { id, productName, description, imageUrl, consumerPoint } = nextProps.data;

    if (this.props.data !== nextProps.data) {
      this.setState({
        product: {
          productName: productName,
          description: description,
          consumerPoint: consumerPoint,
        },
        img: {
          imageUrl: imageUrl,
        },
      });
    }
  }

  handleImportImage = (file, productId) => {
    let formData = new FormData();
    formData.append('file', file.imageUrl);
    formData.append('productId', productId);

    UPLOAD(1, 'assets/uploadProductImage', formData).then(
      res => {
        // const { updateProductById } = this.props.actions;
        const { reload } = this.props;
        // console.log(res.data.url, 'url');
        // const data = {
        //   id: productId,
        //   data: {
        //     imageUrl: res.data.url,
        //   },
        // };
        // updateProductById(data);
        this.setState({
          opened: false,
        });
        this.props.enqueueSnackbar('Update product succesfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        reload();
        console.log('upload success');
      },
      err => {
        const { reload } = this.props;
        this.setState({
          opened: false,
        });
        this.props.enqueueSnackbar('Update product succesfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        reload();
        // this.handleSnacker(err, 'error');
        console.log('upload fail');
      },
    );
  };

  handleSubmit = id => events => {
    events.preventDefault();
    const { reload } = this.props;
    const { updateProductById } = this.props.actions;
    const data = {
      id: id,
      data: {
        productName: {
          EN: this.state.product.productName,
        },
        description: {
          EN: this.state.product.description,
        },
        consumerPoint: this.state.product.consumerPoint
      },
    };
    console.log(this.state.img, 'state img');
    updateProductById(data).then(
      res => {
        let notPic = this.state.img.imageUrl === undefined;

        if (!notPic) {
          this.setState({
            loading: true,
          });
          this.handleImportImage(this.state.img, res.id);
        } else {
          this.setState({
            opened: false,
          });
          this.props.enqueueSnackbar('Update product succesfully', {
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
        this.props.enqueueSnackbar('Update product failled!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      },
    );
  };

  GetPathImage = File => {
    this.setState({ img: { imageUrl: File } });
  };

  handleChange = name => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value, 'value');
    console.log(name, 'name');
    this.setState(
      {
        product: {
          ...this.state.product,
          [name]: value,
        },
      },
      () => {
        console.log(this.state.product, 'edit_change');
      },
    );
  };

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });

    this.props.onClick();
  }

  handleClose() {
    this.setState({
      opened: false,
    });
  }

  render() {
    const { data, classes } = this.props;
    const { productName, description, consumerPoint } = this.state.product;
    const { imageUrl } = this.state.img;
    const { updateProductByIdPending } = this.props.productManagement;
    console.log(data.imageUrl, 'img');
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="user-management-button-edit">
          <Tooltip title="แก้ไข">
            <Fab className="fab" onClick={this.toggleBox}>
              <EditIcon />
            </Fab>
          </Tooltip>          
        </div>
      </MuiThemeProvider>
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
)(withStyles(styles)(withSnackbar(ButtonEdit)));
