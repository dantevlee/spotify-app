require ("dotenv/config"); 
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;

let token;

app.use("/", express.static(path.join(__dirname, 'client/build')));

app.get("/", async (req, res) => {
  const data = await generateToken();
  res.json(data);
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
  return token;
}

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
