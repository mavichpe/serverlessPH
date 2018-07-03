import React, { Component } from 'react';
import WineListItem from './WineListItem';
import WineQuickView from './WineQuickView';
import Button from './Button';

class WineList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        quickViewItem: {},
      };
    }
    

    render() {
      return (
        <div className="wide-list">          
            <h2 className="title">Wine List</h2>
            <Button buttonTitle="I'm feeling lucky" onclick={this.showRamdomWine} modalToggle="#quick-view" buttonType="success"/>
            <div className="row" >             
                {this.props.wines.map(w =>{
                  return <WineListItem setQuickViewItem = {this.setQuickViewItem} wineData={w}/>
                })}
            </div>
            <WineQuickView wineData={this.state.quickViewItem} />
        </div>
      );
    }

    showRamdomWine = () =>{
      let randomWine =  this.props.wines[Math.floor((Math.random()*this.props.wines.length))];
      this.setState({ quickViewItem: randomWine});      
    }

    setQuickViewItem = (wideData)=>{
      this.setState({ quickViewItem: wideData});
      // this.state.quickViewItem = wideData;
    }
    
  }
  
  export default WineList;
  