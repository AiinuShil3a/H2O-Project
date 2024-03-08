const express = require("express");
const cors = require("cors");
const router = express.Router();
const dotenv = require("dotenv");
const packgeRouter = require("./routes/package.router");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "H2O API Project",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  externalDocs: {
    description: "Download Swagger.json",
    url: "/swagger.json",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
  connectTimeoutMS: 10000, // ตั้งค่า timeout ในการเชื่อมต่อ
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const swaggerSpec = swaggerJSDoc(options);
dotenv.config();

//creat server
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect mongoDB
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);
if(mongoose.connect){
  console.log("connected");
}else{
  console.log("disonnected");
}

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.header("Content-Type", "application/swagger.json");
  res.send(swaggerSpec);
});

//
app.use("/", packgeRouter);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to H2O Project</h1>");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
