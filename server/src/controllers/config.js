require("dotenv").config();
const AWS = require("aws-sdk");

let awsConfig = {
  region: "eu-south-1",
  endpoint: "http://dynamodb.eu-south-1.amazonaws.com",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
