require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

const headers = { Authorization: `Bearer ${apiKey}` };
app.get("/", async (req, res) => {
  try {
    await axios
      .get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/deliveroo/menu/`,
        { headers }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(404).json({message: "Request Not Found"})})
      
  } catch (error) {
    return res.status(500).json({message: "ERROR DB"})
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "All routes" });
  } catch (error) {
    res.status(500).json({ message: "Error DB" });
  }
});

app.listen(process.env.PORT || 3200, () => {
  console.log(`Server started `);
});
