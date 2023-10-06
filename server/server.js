require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

let token;

const refreshAccessToken = async (req, res, next) => {
  if (!token) {
    await refreshAccessTokenFromSpotify();
  }
  next();
};

const refreshAccessTokenFromSpotify = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    token = response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error.message);
  }
};

app.get('/api/refreshToken', refreshAccessToken, (req, res) => {
  res.json({ token });
})

app.get(`/api/random`, refreshAccessToken, async(req, res) => {
  
  const { id } = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=us&limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting random song:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
});

app.get(`/api/search`, refreshAccessToken, async(req, res) => {

  const {searchQuery} = req.query;
  const {searchType} = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error with searching:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' })
  }
})


app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build", "index.html"))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
