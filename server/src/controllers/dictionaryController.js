const docClient = require("./config");

async function getByWord(req, res) {
  try {
    const word = req.params.word;
    const params = {
      TableName: "dictionary",
      KeyConditionExpression: "word = :word",
      ExpressionAttributeValues: {
        ":word": word.toUpperCase(),
      },
    };
    const response = await docClient.query(params).promise();
    return httpResponse(req, res, response);
  } catch (err) {
    console.log("error");
    res.status(400).json(err);
  }
}
async function getWordAndPos(req, res, next) {
  try {
    const { word, partOfSpeech } = req.params;
    console.log(word);
    console.log(partOfSpeech);
    const params = {
      TableName: "dictionary",
      KeyConditionExpression: "word = :word and pos = :pos",
      ExpressionAttributeValues: {
        ":word": word.toUpperCase(),
        ":pos": partOfSpeech,
      },
    };
    const response = await docClient.query(params).promise();
    if (response.Items.length === 0) {
      res
        .status(404)
        .send(
          `Could not find word ${word} with part of speech ${partOfSpeech}`
        );
      return;
    }
    res.send(response.Items);
  } catch (error) {
    next(error);
  }
}
async function getRandomWord(req, res, next) {
  try {
    const { part } = req.params;
    if (!part) return next("missing params");
    let { letter } = req.query;
    if (!letter) {
      letter = "";
    }
    const params = {
      TableName: "dictionary",
      FilterExpression: "#pos=:pos AND begins_with (#word , :letter)",
      ExpressionAttributeNames: {
        "#pos": "pos",
        "#word": "word",
      },
      ExpressionAttributeValues: {
        ":letter": letter.toUpperCase(),
        ":pos": part,
      },
      Limit: 5,
    };
    const response = await docClient.scan(params).promise();
    if (!response.Items) next("unrecognizable word");
    res.json(response.Items);
    return httpResponse(req, res, response);
  } catch (err) {
    console.log("error");
    res.status(400).json(err);
  }
}
const randNum = () => {
  return Math.ceil(Math.random() * 5);
};
function httpResponse(req, res, response) {
  console.log(response.Items);
  switch (response.Count) {
    case 1:
      res.json(response.Items[0]);
      break;
    case 0:
      res.status(404).json({ error: "Word wasn't found" });
      break;
    default:
      const poses = response.Items.map((item) => {
        return item.pos;
      });
      const resObj = {
        word: response.Items[0].word,
        partsOfSpeeches: poses,
      };
      res.json(resObj);
      break;
  }
}

module.exports = { getByWord, getWordAndPos, getRandomWord };
