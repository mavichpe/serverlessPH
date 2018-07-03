import React, { Component } from 'react';
import WineListItemPhoto from './WineListItemPhoto';
import PriceTag from './PriceTag';

class WineQuickView extends Component {
    render() {
      return (
          <div id="quick-view" className="modal fade"  tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">{this.props.wineData.name}</h4>
                </div>
                <div className="modal-body">
                  <p><b>Category:</b>{this.props.wineData.primary_category + " | "+this.props.wineData.secondary_category}</p>
                  <p><b>Origin:</b>{this.props.wineData.origin}</p>
                  <p><b>Producer:</b>{this.props.wineData.producer_name}</p>                 
                  <p><b>Tasting notes:</b>{this.props.wineData.tasting_note}</p>
                  <p><b>Price:</b> <PriceTag priceOnCents = {this.props.wineData.regular_price_in_cents} /></p>
                  <div className="row">
                    <div className="col-xs-8 col-xs-offset-2">
                      <WineListItemPhoto wineData={this.props.wineData} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          );
    }
  }
  
  export default WineQuickView;