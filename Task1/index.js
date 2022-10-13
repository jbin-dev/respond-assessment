require("dotenv").config();
require("./utils/db");

const express = require("express");
const app = express();
const port = 3000;
const facebook = require("./providers/facebook");
const Product = require("./models/products");

app.use(express.json());

app.post("/webhook", async (req, res) => {
  let body = req.body;

  const isSuccess = await facebook.webhookHandler(body);

  if (isSuccess) {
    res.status(200).send("EVENT_RECEIVED_SUCCESFULLY");
  } else {
    res.sendStatus(404);
  }
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  const isValid = facebook.webhookVerify(mode, token, challenge);

  if (isValid) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.get("/test", async (req, res) => {
  try {
    const doc = new Product();
    doc.title = "hello";

    await doc.save();
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port : ${port}`);
});
