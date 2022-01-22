const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorhandler");
const router = require("./routes/dictionaryRoute");
require("dotenv").config();
const app = express();
app.use(express.static(path.resolve("../build")));
app.use(express.json());
app.use(cors());

app.use("/", router);
app.use(errorHandler);
module.exports = app;
