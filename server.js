import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import path from "path";
import router from "./router/weather.js";

import { fileURLToPath } from "url";

const app = express();

const PORT = 8000;

app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname));
app.use("/", router);

app.listen(PORT, () => {
  console.log("server started", PORT);
});
