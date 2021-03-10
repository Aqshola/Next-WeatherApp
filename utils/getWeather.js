import axios from "axios";
import { parseDateToHour } from "./parser";

export const getCurrentData = async (city) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );

    return {
      type: "success",
      city: data.name,
      weather: {
        main: data.weather[0].main,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      info: {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      },
    };
  } catch (err) {
    return {
      type: "fail",
      ...err.response.data,
    };
  }
};

export const getForecastData = async (city) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );

    const dataParse = data.list.map((el) => {
      return {
        weather: {
          main: el.weather[0].main,
          desc: el.weather[0].description,
          icon: el.weather[0].icon,
        },
        info: {
          temp: el.main.temp,
          humidity: el.main.humidity,
          wind: el.wind.speed,
        },
        date: el.dt,
      };
    });

    return {
      type: "success",
      listData: dataParse,
      city: data.city.name,
    };
  } catch (err) {
    return {
      type: "fail",
      listData: [],

      ...err.response.data,
    };
  }
};

export const getForecastDay = (forecast) => {
  return forecast.filter((el, i) => {
    if (i % 8 === 0 && i > 0) {
      return el;
    }
  });
};

export const getForecastHours = (forecast) => {
  return forecast
    .filter((el, i) => {
      if (i < 4) {
        return el;
      }
    })
    .map((el) => {
      return {
        hours: parseDateToHour(el.date),
        ...el,
      };
    });
};

export const getCurrentDataByCoord = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getForecastDataByCoord = async (latitude, longitude) => {
  try {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
    );
  } catch (err) {
    console.log(err);
  }
};

export const getLocation = async () => {
  const nav = () => {
    if (navigator.geolocation) {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    } else {
      return {
        type: "error",
        code: "400",
        msg: "Device not support geolocation",
      };
    }
  };

  try {
    const result = await nav();

    return {
      type: "success",
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    };
  } catch (err) {
    return {
      type: "error",
      code: err.code,
      msg: err.message,
    };
  }
};
