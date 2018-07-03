import React, { Component } from 'react';
import WineListItem from './WineListItem';
import WineQuickView from './WineQuickView';
import Button from './Button';

import wines from '../wines.json';

class WineList extends Component {
    constructor(props) {
      super(props);
      this.state = {quickViewItem: {}};
    }
    render() {
      return (
        <div className="wide-list">          
            <h2 className="title">Wine List</h2>
            <Button buttonTitle="I'm feeling lucky" onclick={this.showRamdomWine} modalToggle="#quick-view" buttonType="success"/>
            <div className="row" >             
                {wines.map(w =>{
                  return <WineListItem setQuickViewItem = {this.setQuickViewItem} wineData={w}/>
                })}
            </div>
            <WineQuickView wineData={this.state.quickViewItem} />
        </div>
      );
    }

    showRamdomWine = () =>{
      let randomWine =  wines[Math.floor((Math.random()*wines.length))];
      this.setState({ quickViewItem: randomWine});      
    }

    setQuickViewItem = (wideData)=>{
      this.setState({ quickViewItem: wideData});
      // this.state.quickViewItem = wideData;
    }
    
  }
  
  export default WineList;
  