const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./graphql/resolvers/index");
const graphQlSchema = require("./graphql/schema/index");
const isAuth = require("./middleware/is-auth");
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

app.use(cookieParser());

app.use(isAuth);

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
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-n79lfqmw.rfbl6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      app.use(express.static('frontend/build'));
      app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
      });
    }
    app.listen(PORT);
    console.log("mongoose connected!!");
  })
  .catch((err) => {
    console.log("server error", err);
  });
