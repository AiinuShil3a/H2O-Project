const express = require("express")
const cors = require("cors")



const app = express();
// app.use(cors({ credentials: true, origin: CLIENT_URL }));
// app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1> Welcome to restful API Blog</h1>");
  });

const PORT = 6000;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});