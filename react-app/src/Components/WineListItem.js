import React, { Component } from 'react';
import WineListItemPhoto from './WineListItemPhoto';
import Button from './Button';
import PriceTag from './PriceTag';

class WineListItem extends Component {
    render() {
      return (
        <div className="wide-list-item col-xs-6 col-sm-4 col-md-3">
          <div className="col-xs-4">
            <WineListItemPhoto wineData={this.props.wineData} />
          </div>
          <div className="col-xs-8 text-left">
            <h3>{this.props.wineData.name}</h3>
            <p><b>Origin:</b>{this.props.wineData.origin}</p>
            <p><b>Producer:</b>{this.props.wineData.producer_name}</p>
            <p><b>Release on:</b>{this.props.wineData.released_on}</p>
            <p><b>Price:</b> <PriceTag priceOnCents = {this.props.wineData.regular_price_in_cents} /> </p>
            <Button buttonType="primary" onclick={this.openQuickView} modalToggle="#quick-view" buttonTitle="View Product" />
          </div>
        </div>
      );
    }

    openQuickView = () =>{
      this.props.setQuickViewItem(this.props.wineData);          
    }
  }
  
  export default WineListItem;
  