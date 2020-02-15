import React, { Component } from 'react';
import Button from '../common/ButtonWaitingLoad';
export default class ButtonUpdate extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="product-management-button-update">
       <Button
                        
                        type="submit"
                       
                        color="primary"
                      
                      >
                        update
                      </Button>
      </div>
    );
  }
}
