const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const routes = require("./routes");
app.use("/movies", routes.movies);

app.use("/static/images", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, "./build")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(port, () => {
  (async () => {
    try {
      const filePath = path.resolve(__dirname, "db/movies.json");
      if (!fs.existsSync(filePath))
        await fs.promises.writeFile(filePath, "[]", "utf-8");
    } catch (e) {
      console.log(e);
    }
  })();
  console.log(`listening at ${port}`);
});
