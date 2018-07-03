import React, { Component } from 'react';
import FormInput from './FormInput';
import FileBase64  from 'react-file-base64';

class AddNewWine extends Component {
    constructor(props) {
      super(props);
      this.initialState = {
        name: '',
        primary_category:'',
        secondary_category:'',
        origin:'',
        producer_name:'',
        tasting_note:'',
        regular_price_in_cents:0,
        image_thumb_url:null     
      }
      this.state = this.initialState;
    }

    handleFormClear = () => {
      this.setState(this.initialState);
      document.getElementById("addWineForm").reset();
    }
    
    handleChange = (event) => {
      let value = event.target.type === "file" ? event.target.files[0] : event.target.value;
      this.setState({[event.target.name]: value});
    }

    getFiles = (file) => {
      this.setState({ image_thumb_url : file.base64 })
    }

    render() {
      return (
          <div id="add-wine" className="modal fade "  tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Add New Wine</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xs-12">
                    <form id="addWineForm" className="form-horizontal" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
                      <FormInput label="Name" type="text" name="name" handleChange={this.handleChange}/>    
                      <FormInput label="Primary Category" type="text" name="primary_category" handleChange={this.handleChange}/>           
                      <FormInput label="Secondary Category" type="text" name="secondary_category" handleChange={this.handleChange}/>           
                      <FormInput label="Origin" type="text" name="origin" handleChange={this.handleChange}/>           
                      <FormInput label="Producer" type="text" name="producer_name" handleChange={this.handleChange}/>                                 
                      <FormInput label="Tasting notes" type="text" name="tasting_note" handleChange={this.handleChange}/>    
                      <FormInput label="Regular Price (In Cents)" type="number" name="regular_price_in_cents" handleChange={this.handleChange}/>          
                      <div className="form-group">
                        <label for="idphoto" className="col-sm-3 control-label">{this.props.label}</label>
                        <div className="col-sm-8">
                          <FileBase64 multiple={ false } onDone={this.getFiles} />
                        </div>
                    </div>
                    </form>                    
                    </div> 
                  </div> 
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default btn-success" onClick ={this.handleSubmit}>Save</button>
                  <button type="button" className="btn btn-default btn-danger" data-dismiss="modal" onClick={this.handleFormClear}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          );
    }

    handleSubmit = (event) => {
      this.props.addCallback(this.state, event)
        .then(() => this.handleFormClear())
      // event.preventDefault();
      // const url = APIContants.baseUrl + '/v1/wines';      
      // put(url, this.state,{}).then((response) =>{
      //   console.log(response);
      //   alert("the new Wine has been added");
      //   this.handleFormClear();
      // }).catch(function (error) {
      //   console.log(error);
      //   alert("The new Wine hasn't been added");
      // })
    }
  }
  
  export default AddNewWine;