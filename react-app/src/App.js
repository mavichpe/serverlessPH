import React, { Component } from 'react';
import WineList from './Components/WineList';
import logo from './logo.svg';
import Button from './Components/Button';
import AddNewWine from './Components/AddNewWine';
import { get, put } from 'axios';
import APIContants from './Utils/Constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines:[]
    };
  }
  componentDidMount = () =>{      
    this.retrieveWineList();
  }

  retrieveWineList = () =>{
    const url = APIContants.baseUrl + '/v2/wines';      
    get(url,{}).then((response) =>{
      console.log(response);
      this.setState({wines: response.data});
    }).catch(function (error) {
      console.log(error);
      alert("Error retrieving the wine list");
    })
  }

  addNewWine = (form, event) => {
    event.preventDefault();
    const url = APIContants.baseUrl + '/v1/wines';      
    return put(url, form,{}).then((response) =>{
      console.log(response);
      alert("the new Wine has been added");
      this.retrieveWineList();
    }).catch(function (error) {
      console.log(error);
      alert("The new Wine hasn't been added");
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="pull-right">
              <Button buttonType="primary" modalToggle="#add-wine" buttonTitle="Add New Wine" />
          </div>
          <div className="clearfix"/>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        <WineList wines={this.state.wines}/>
        <AddNewWine addCallback = {this.addNewWine}/>
      </div>
    );
  }
}

export default App;
