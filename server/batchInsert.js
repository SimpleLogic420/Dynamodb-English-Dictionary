require("dotenv").config();
const AWS = require("aws-sdk");
const { dictionary } = require("../dictionary.json");

let awsConfig = {
  region: "eu-south-1",
  endpoint: "http://dynamodb.eu-south-1.amazonaws.com",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const handler = async () => {
  let counter = 1;
  for (let item of dictionary) {
    await dynamoDb
      .put({ TableName: "dictionary", Item: item })
      .promise()
      .then(() => {
        console.log(`${counter} : ${item.word}`);
        counter++;
      });
  }
};
handler();
