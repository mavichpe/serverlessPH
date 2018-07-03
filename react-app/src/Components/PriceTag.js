import React, { Component } from 'react';

class PriceTag extends Component {
    render() {
      return (
        <span>{this.formatPriceTag(this.props.priceOnCents)}</span>
      );
    }
    formatPriceTag = (priceOnCents) =>{
      var dollars = priceOnCents / 100;
      return dollars.toLocaleString("en-CA", {style:"currency", currency:"CAD"});
    }
  }
  
  export default PriceTag;
  