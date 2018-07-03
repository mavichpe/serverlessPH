import React, { Component } from 'react';
import WineList from './Components/WineList';
import logo from './logo.svg';
import Button from './Components/Button';
import AddNewWine from './Components/AddNewWine';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="pull-right">
              <Button buttonType="primary" onclick={this.addNewWine} modalToggle="#add-wine" buttonTitle="Add New Wine" />
          </div>
          <div className="clearfix"/>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        <WineList/>
        <AddNewWine/>
      </div>
    );
  }

  addNewWine = () =>{
              
  }
}

export default App;
