const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");
const router = require("./routes/dictionaryRoute");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", router);
app.use(errorHandler);
module.exports.handler = serverless(app);
