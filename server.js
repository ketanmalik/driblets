const bodyParser = require("body-parser");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./graphql/resolvers/index");
const graphQlSchema = require("./graphql/schema/index");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gmgko.mongodb.net/driblets?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log("mongoose connected!!");
  })
  .catch((err) => {
    console.log(err);
  });
