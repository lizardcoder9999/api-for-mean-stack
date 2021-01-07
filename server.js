const express = require("express");
const helmet = require("helmet");

require("./config/db");

//Importing routes
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/admin");
// const testRoute = require("./routes/route.test");

const app = express();

//Json parser middleware
app.use(express.json());

//Helmet Js middleware
app.use(helmet());

//Using routes
app.use("/api/user", authRoute);
app.use("/api/admin", adminAuthRoute);
// app.use("/api/test", testRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "debug") {
    console.log("server online");
  }
});
