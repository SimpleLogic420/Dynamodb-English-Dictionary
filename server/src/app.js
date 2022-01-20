const express = require("express");
const cors = require("cors");
const router = require("./routes/dictionaryRoute");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/", router);

module.exports = app;
