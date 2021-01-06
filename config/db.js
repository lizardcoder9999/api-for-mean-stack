const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        if (process.env.NODE_ENV === "debug") {
          console.log("Database connected");
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "debug") {
          console.log(err);
        }
      });
  }
}

module.exports = new Database();
