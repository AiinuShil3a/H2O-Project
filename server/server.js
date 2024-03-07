const express = require("express")
const cors = require("cors")
const router = express.Router();
const dotenv = require("dotenv");
const packgeController = require("./controller/packge.controller")
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();


const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);



app.use("/package", packgeController);

app.get("/", (req, res) => {
    res.send("<h1> Welcome to H2O Project</h1>");
  });

  const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});