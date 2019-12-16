const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://erhan:erhan123@node-api-jslbx.mongodb.net/node-api?retryWrites=true&w=majority",
    { useMongoClient: true }
  );
  mongoose.connection.on("open", () => {
    console.log("DB Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Connection Error : ", err);
  });
  mongoose.Promise = global.Promise;
};
