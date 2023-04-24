// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// CONNECT TO DATABASE
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cravio.fpurwxh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to database : ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.log("ERROR : ", err);
  });

// APP SETUP
const app = express();

// MODULES
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/HTML/index.html");
});

// START SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} : http://localhost:${port}/`
  );
});
