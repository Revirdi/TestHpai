const express = require("express");
const app = express();
const port = 3080;
const cors = require("cors");
const bearerToken = require("express-bearer-token");

app.use(cors());
app.use(bearerToken());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API JALAN MZ 🚀");
});

app.listen(port, (error) => {
  if (error) return console.log({ err: error.message });
  console.log(`API berhasil running di port ${port}`);
});
