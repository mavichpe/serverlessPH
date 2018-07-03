package com.serverless.wineph.function;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

/**
 * Lambda function that simply prints "Hello World" if the input String is not provided,
 * otherwise, print "Hello " with the provided input String.
 */
public class RetrieveWineList implements RequestStreamHandler {  
    JSONParser parser = new JSONParser();
    


	@SuppressWarnings("unchecked")
	@Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
		LambdaLogger logger = context.getLogger();

		JSONObject responseJson = new JSONObject();
		JSONObject responseBody = new JSONObject();

		try {
			logger.log("Loading Java Lambda handler of ProxyWithStream");


			AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();    

			ScanRequest scanRequest = new ScanRequest()
				    .withTableName("wines");

			ScanResult result = client.scan(scanRequest);
			List<Map<String, AttributeValue>> itemList = result.getItems();
			itemList.stream().map(this::convertoJsonObject).forEach(i -> {
			    responseBody.put(i.get("id"), i);
			});      			
			
			responseJson.put("statusCode", 200);			
		} catch (Exception e) {
			responseJson.put("statusCode", 400);
			responseBody.put("error-message", e.getMessage());
			logger.log(e.getMessage());
		}
		
		JSONObject headerJson = new JSONObject();
		headerJson.put("Access-Control-Allow-Origin", "*");
		
		responseJson.put("isBase64Encoded", false);
		responseJson.put("headers", headerJson);
		responseJson.put("body", responseBody.toString());  


		logger.log(responseJson.toJSONString());
		OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
		writer.write(responseJson.toJSONString());  
		writer.close();
		
	}
	
	@SuppressWarnings("unchecked")
	private JSONObject convertoJsonObject(Map<String, AttributeValue> dynamoItem){		
        JSONObject jsonItem = new JSONObject();
        jsonItem.put("id", dynamoItem.getOrDefault("id", new AttributeValue("0")).getS());
        jsonItem.put("name", dynamoItem.getOrDefault("name", new AttributeValue("")).getS());
        jsonItem.put("primary_category", dynamoItem.getOrDefault("primary_category", new AttributeValue("")).getS());
        jsonItem.put("secondary_category", dynamoItem.getOrDefault("secondary_category", new AttributeValue("")).getS());
        jsonItem.put("origin", dynamoItem.getOrDefault("origin", new AttributeValue("")).getS());
        jsonItem.put("producer_name", dynamoItem.getOrDefault("producer_name", new AttributeValue("")).getS());
        jsonItem.put("image_thumb_url", dynamoItem.getOrDefault("image_thumb_url", new AttributeValue("")).getS());
        jsonItem.put("regular_price_in_cents", dynamoItem.getOrDefault("regular_price_in_cents", new AttributeValue("0")).getS());
        
        return jsonItem;		
	}
}
