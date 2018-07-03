import React, { Component } from 'react';

class Button extends Component {
    render() {
      return (
        <button className={"btn btn-default btn-" + this.props.buttonType} data-toggle={this.props.modalToggle ? "modal": ""} data-target={this.props.modalToggle || ""} onClick={this.props.onclick}>{this.props.buttonTitle}</button>
      );
    }
  }
  
  export default Button;
  