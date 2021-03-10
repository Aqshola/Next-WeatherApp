// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async (req, res) => {
  try {
    const { address } = req.query;
    const result = await axios.get(
      `http://www.geoplugin.net/json.gp?ip=${address}`
    );

    return res.status(200).json({ ...result.data });
  } catch (err) {
    return res.status(400).json({
      type: "error",
    });
  }
};
