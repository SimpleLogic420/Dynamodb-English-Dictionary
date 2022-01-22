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

const dynamodb = new AWS.DynamoDB.DocumentClient();
function createSingleParams(item) {
  return {
    PutRequest: {
      Item: {
        word: item.word,
        type: item.pos,
        definition: item.definitions,
      },
    },
  };
}
function createBatchParams(items) {
  return {
    RequestItems: {
      dictionary: items.map((item) => createSingleParams(item)),
    },
  };
}
async function writeBatch(batch) {
  try {
    const params = createBatchParams(batch);
    console.log(await dynamodb.batchWrite(params).promise());
  } catch (error) {
    // console.log(error);
    console.log("dupe err");
  }
}
async function run() {
  const Batch_Size = 25;
  let batch = [];
  for (let i = 28944; i < dictionary.length; i++) {
    console.log("item " + i);
    if ((i + 1) % (Batch_Size + 1) === 0) {
      await writeBatch(batch);
      console.log(`added batch ${(i + 1) / 26 + 1}/${dictionary.length / 25}`);
      batch = [];
    } else {
      batch.push(dictionary[i]);
    }
  }
}
// run();
const handler = async () => {
  let counter = 102838;
  for (let i = 102838; i < dictionary.length; i++) {
    await dynamodb
      .put({ TableName: "dictionary", Item: dictionary[i] })
      .promise()
      .then(() => {
        console.log(`${counter} : ${dictionary[i].word}`);
        counter++;
      });
  }
};
handler();

// module.exports = dynamodb;
