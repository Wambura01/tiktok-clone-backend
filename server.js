import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";

//app config
const app = express(); //instantiating app
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json()); //to parse responses as json
//setting headers for every request
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*");
  res.setHeaders("Access-Control-Allow-Headers", "*");
  next();
});

//db config
const connection_url =
  "mongodb+srv://Admin:Smartphon96@cluster0.foty3.mongodb.net/tiktok-db?retryWrites=true&w=majority";

//to connect to db
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//api endpoints
app.get("/", (req, res) => res.status(200).send("hello Wambura!"));
app.get("/v1/posts", (req, res) => res.status(200).send(Data));
app.post("/v2/posts", (req, res) => {
  //to add data to the db(adding video doc to the videos collection)
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//to retrieve data from db
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//app listeners
app.listen(port, () => console.log(`listening on localhost:${port}`));
