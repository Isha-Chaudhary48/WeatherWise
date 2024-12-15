import express from "express";
import { checkWheather } from "../components/weather.js";

const router = express.Router();

let search = null;

router.get("/", async (req, res) => {
  try {
    let data = null;

    if (search) {
      data = await checkWheather(search);
    } else {
      data = await checkWheather("Chandigarh");
    }

    if (!data) {
      return res.render("index", {
        temprature: "NIL",
        humidity: "NIL",
        wind: "NIL",
        city: "NIL",
        image: "images/clouds.png",
      });
    }
    console.log("data at router", data);
    return res.render("index", {
      temprature: data.temprature,
      humidity: data.humidity,
      wind: data.wind,
      city: data.city,
      image: data.image,
    });
  } catch (error) {
    console.log("error in fetching data at router", error);
    return null;
  }
});

router.post("/search", (req, res) => {
  const { searchCity } = req.body;
  search = searchCity;
  return res.redirect("/");
});

export default router;
