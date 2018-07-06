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
const logger = config.logger;

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
  if (!event.body) {
      logger.log().error('unable to get the event body');
      responseBody["stored"] = false ;      
      responseBody["message"] = "unable to get the event body" ;                  
      callback(null,createResponse(400,responseBody));
      return;
  }
  if (event.statusCode != 200) {
    logger.log().error('error in previos lambda');         
    callback(null,event);
    return;
  }
  // Body may be passed as string so we needs to be convert it to Json
  if(typeof event.body !== 'object'){
    event.body = JSON.parse(event.body);
  }

  let filename = event.body.generatedId+".png";
  let imageBuffer = new Buffer(event.body.image_thumb_url.replace(/^data:image\/\w+;base64,/, ""),'base64');

  const S3 = new AWS.S3();
  S3.putObject({
    Bucket: config.bucket,
    Key: filename,
    Body: imageBuffer,
    ContentType: 'image/png',
    ACL:'public-read'
  }, (error) => {
    if (error != null) {
        logger.log({ error }).error('Unable to send file to S3');
        responseBody["stored"] = false ;      
        responseBody["message"] = "unable to send file to S3" ;                  
        callback(null,createResponse(400,responseBody));
        return;
    } else {
        logger.log().info('Upload done! :'+filename);
    }
  });

  let s3ImageUrl = config.cloudFrontUrl+filename;

  // create new DynamoDB service object
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
      TableName: "wines",
      Key:{
          "id": event.body.generatedId,
      },
      UpdateExpression: "set image_thumb_url = :i",
      ExpressionAttributeValues:{
          ":i": s3ImageUrl         
      },
      ReturnValues:"UPDATED_NEW"
  };
  logger.log(params).info("Params");

  let responseBody = {};

  docClient.update(params, function(err, data) {
    if (err) {
      responseBody["stored"] = false ;      
      responseBody["message"] = "Error storing the image: "+ err ;      
      logger.log(err).error("Error");      
      callback(null,createResponse(400,responseBody));
    } else {
      responseBody["stored"] = true ;
      responseBody["message"] = "Saved" ;  
      responseBody["generatedId"] = event.body.generatedId ;
      logger.log(data).info("Success");      
      callback(null, createResponse(200,responseBody));
    }
  });
}
