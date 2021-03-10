import axios from "axios";
export const getLocation = async () => {
  try {
    const ip = await axios.get("https://api.ipify.org/?format=json");

    const res = await axios.get(
      `http://www.geoplugin.net/json.gp?ip=${ip.data.ip}`
    );

    return {
      type: "success",
      latitude: res.data.geoplugin_latitude,
      longitude: res.data.geoplugin_longitude,
      city: res.data.geoplugin_city,
      ip: ip.data.ip,
    };
  } catch (err) {
    console.log(err);
    return {
      type: "error",
      code: 404,
      msg: "something missing",
    };
  }
};
