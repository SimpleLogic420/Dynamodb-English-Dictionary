const app = require("./app");
const serverless = require("serverless-http");
const PORT = process.env.PORT || 3001;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports.handler = serverless(app);
