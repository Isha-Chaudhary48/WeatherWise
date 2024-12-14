import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export async function checkWheather(city) {
  try {
    const response = await fetch(
      `${API_URL}${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    let image = "images/clouds.png";

    if (data.weather[0].main == "Clouds") {
      image = "images/clouds.png";
    } else if (data.weather[0].main == "Humidity") {
      image = "images/humidity.png";
    } else if (data.weather[0].main == "Snow") {
      image = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      image = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      image = "images/rain.png";
    } else if (data.weather[0].main == "Drizzel") {
      image = "images/drizzel.png";
    } else if (data.weather[0].main == "Clear") {
      image = "images/clear.png";
    }

    const dataToSend = {
      temprature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      city: data.name,
      image,
    };

    return dataToSend;
  } catch (error) {
    console.log("error in function", error);
    return { error: error.message };
  }
}
