import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '2 0 auto',
  },
  searchText: {
    flex: '0.8 0',
  },  
});

class CustomSearchRender extends React.Component {
  handleTextChange = event => {
    const { onSearchChange } = this.props.options;

    if (onSearchChange) {
      onSearchChange(event.target.value);
    }

    this.props.onSearch(event.target.value);
  };



  render() {
    const { classes, options, onHide, searchText } = this.props;

    return (
      <Grow appear in={true} >
        <div className={classes.main} ref={el => (this.rootRef = el)}>
          <TextField
            placeholder={'What are you looking for?'}
            className={classes.searchText}
            InputProps={{
              'aria-label': options.textLabels.toolbar.search,
            }}
            value={searchText || ''}
            onChange={this.handleTextChange}
            fullWidth={true}
            inputRef={el => (this.searchField = el)}
          />
     
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: 'CustomSearchRender' })(CustomSearchRender);
