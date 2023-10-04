require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

let token;

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/token", async (req, res) => {
  const data = await generateToken();
  res.json({ token: data.access_token });
});

async function generateToken() {
  if (token) return token;

  const response = await axios({
    url: `https://accounts.spotify.com/api/token`,
    method: `POST`,
    data: `grant_type=client_credentials`,
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
  });
  token = response.data;
  console.log(response.data);
  return token;
}

app.get("/api/search", async (req, res) => {
  const getToken = await generateToken();
  const token = getToken.access_token;

  try {
    const response = await axios({
      url: `https://api.spotify.com/v1/search?q=drake&type=artist&limit=5`,
      method: `GET`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build", "index.html"))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
