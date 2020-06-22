const mongoose = require("mongoose");

// database connected locally

mongoose
  .connect(process.env.DB_CONNECTION_PREMIUM, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
