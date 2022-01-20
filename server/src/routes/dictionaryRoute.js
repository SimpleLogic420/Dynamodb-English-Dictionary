const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("router is the best");
  res.send("goodjob");
  res.end();
});

module.exports = router;
