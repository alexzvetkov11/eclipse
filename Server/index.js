const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/db");
const router = require('./routes/router.js');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});