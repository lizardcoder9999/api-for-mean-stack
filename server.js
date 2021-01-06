const express = require("express");

require("./config/db");

//Importing routes
const authRoute = require("./routes/auth");
// const testRoute = require("./routes/route.test");

const app = express();

//Json parser middleware
app.use(express.json());

//Using routes
app.use("/api/user", authRoute);
// app.use("/api/test", testRoute);

app.listen(5000, () => {
  console.log("server online");
});
