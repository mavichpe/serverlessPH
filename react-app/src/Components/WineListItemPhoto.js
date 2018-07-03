import React, { Component } from 'react';

class WineListItemPhoto extends Component {
    render() {
      return (
        <img className="img-responsive center-block" src={this.props.wineData.image_thumb_url} alt={this.props.wineData.name}/>       
      );
    }
  }
  
  export default WineListItemPhoto;
  