const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Hello from MERN");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
