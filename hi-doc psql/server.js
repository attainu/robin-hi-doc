const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/dbConnection");
const app = express();
app.use(bodyParser.json());
const totalRoutes = require("./routes/_indexRoute");

db.sync();
app.use("/api/v1", totalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
