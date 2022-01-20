const router = require("express").Router();
const {
  getByWord,
  getWordAndPos,
  getRandomWord,
} = require("../controllers/dictionaryController");
router.get("/", (req, res) => {
  console.log("router is the best");
  res.send("goodjob");
  res.end();
});
router.get("/part-of-speech/:part", getRandomWord);
router.get("/:word/:partOfSpeech", getWordAndPos);
router.get("/:word", getByWord);

module.exports = router;
