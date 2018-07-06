// The MIT License (MIT)
//
// Copyright (c) 2016 Claudemiro
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const config = require('./config.js');
const fs = require("fs");
const logger = config.logger;
const uuidv1 = require('uuid/v1');

createResponse = (statusCode,responseBody)=>{
  return {
    "headers": {
      'Access-Control-Allow-Origin': '*',
    },
    "statusCode": statusCode,
    "body": JSON.stringify(responseBody),
  }
}


exports.handler =  function handler(event, context, callback) {
  let responseBody = {};

  if (!event.body) {
      logger.log().error('unable to get the event body');
      responseBody["stored"] = false ;      
      responseBody["message"] = "unable to get the event body" ;                  
      callback(null,createResponse(400,responseBody));
      return;
  }
  // Body is passed as string needs to be converted to Json
  // Body may be passed as string so we needs to be convert it to Json
  if(typeof event.body !== 'object'){
    event.body = JSON.parse(event.body);
  }

  // create new DynamoDB service object
  ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
  let generatedId = uuidv1();
  var params = {
    TableName: 'wines',
    Item: {
      'id' : {S:generatedId},
      "name": {S:event.body.name},
      "primary_category": {S:event.body.primary_category},
      "secondary_category": {S:event.body.secondary_category},
      "origin": {S:event.body.origin},
      "producer_name": {S:event.body.producer_name},
      "tasting_note": {S:event.body.tasting_note},
      "regular_price_in_cents": {N: "" + event.body.regular_price_in_cents},
      "image_thumb_url":{S:event.body.image_thumb_url}
    }
  };
  logger.log(params).info("Params");

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      responseBody["stored"] = false ;      
      responseBody["message"] = "Error Saving the register: "+ err ;      
      logger.log(err).error("Error");
      
      callback(null,createResponse(400,responseBody));
    } else {
      responseBody["stored"] = true ;
      responseBody["message"] = "Saved" ;      

      responseBody["generatedId"] = generatedId ;
      responseBody["image_thumb_url"] = event.body.image_thumb_url ;
      logger.log(data).info("Success");      
      callback(null, createResponse(200,responseBody));
    }
  });
  
  
}
