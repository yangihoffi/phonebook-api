const express = require("express");
const app = express();

const PORT = 3002;

app.get("/hello.html", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
