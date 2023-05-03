// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const favicon = require("express-favicon");

dotenv.config({ path: "./config.env" });

// MIDDLEWARE
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

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
const index = fs.readFileSync(`${__dirname}/public/HTML/index.html`, "utf-8");
const raw = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const data = JSON.parse(raw);
const tempCard = fs.readFileSync(`${__dirname}/public/HTML/card.html`, "utf-8");

// MODULES
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// ROUTES
app.get("/", (req, res) => {
  const cards = data.map((el) => replaceTemplate(tempCard, el)).join("");
  const output = index.replace("{%RECIPE_CARDS%}", cards);
  res.send(output);
});

// app.get("/recipes", (req, res) => {
//   fs.readFile(`${__dirname}/data/data.json`, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500);
//       return;
//     }

//     const recipes = JSON.parse(data);
//     console.log(recipes);

//     res.json(recipes);
//   });
// });

// START SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server is listening on port ${port} : http://localhost:${port}/`
  );
});
