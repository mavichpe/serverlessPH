import React, { Component } from 'react';

class FormInput extends Component {
    handleChange = (event) => {
      this.props.handleChange( event);
    }
    render() {
      return (
        <div className="form-group">
            <label for={"id" + this.props.label} className="col-sm-3 control-label">{this.props.label}</label>
            <div className="col-sm-8">
                <input id={"id" + this.props.label} type={this.props.type} className="form-control" name={this.props.name} onChange={this.handleChange}/>
            </div>
        </div>
      );
    }
  }
  
  export default FormInput;
  