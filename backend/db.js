const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://miraskural:q1w2e3r4@cluster0.dpeedha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
