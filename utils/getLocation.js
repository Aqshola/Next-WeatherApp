import axios from "axios";
export const getLocation = async () => {
  try {
    const ip = (await axios.get("https://api.ipify.org/?format=json")).data;

    const res = (
      await axios.get(
        `https://api.ipstack.com/${ip.ip}?access_key=3019e870caa0a0210b82e799f182e338`
      )
    ).data;

    return {
      type: "success",
      latitude: res.latitude,
      longitude: res.longitude,
      city: res.city,
    };
  } catch (err) {
    return {
      type: "error",
      code: 404,
      msg: "something missing",
    };
  }
};
