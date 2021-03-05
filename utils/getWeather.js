import axios from "axios";
import { parseDateToHour } from "./parser";

export const getCurrentData = async () => {
  try {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );
  } catch (err) {
    console.log(err);
  }
};

export const getForecastData = async () => {
  try {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=jakarta&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );
  } catch (err) {
    console.log(err);
  }
};

export const getForecastDay = (forecast) => {
  return forecast.data.list.filter((el, i) => {
    if (i % 8 === 0 && i > 0) {
      return el;
    }
  });
};

export const getForecastHours = (forecast) => {
  return forecast.data.list
    .filter((el, i) => {
      if (i < 4) {
        return el;
      }
    })
    .map((el) => {
      return {
        time: parseDateToHour(el.dt_txt),
        weather: el.weather[0].main,
        temp: Math.round(el.main.temp, 0),
      };
    });
};
