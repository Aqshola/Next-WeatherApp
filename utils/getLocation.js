import axios from "axios";
export const getLocation = async () => {
  try {
    const ip = await axios.get("https://api.ipify.org/?format=json");

    const res = await axios.get(
      `http://api.ipstack.com/${ip.data.ip}?access_key=3019e870caa0a0210b82e799f182e338`
    );

    return {
      type: "success",
      latitude: res.data.latitude,
      longitude: res.data.longitude,
      city: res.data.city,
      ip: ip.data.ip,
    };
  } catch (err) {
    return {
      type: "error",
      code: 404,
      msg: "something missing",
    };
  }
};
