// backend's job is to accept file from frontend,
// use API key from APILayer to parse, and send
// back parsed data
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer"); // parses file uploads in express
const app = express(); // instance of express
const path = require("path");

const corsOption = { origin: ["http://localhost:5173"] };
app.use(cors(corsOption));

const upload = multer({ storage: multer.memoryStorage() }); // stores file in memory
require("dotenv").config();
const apiKey = process.env.API_KEY; // securely stores api key in .env

app.post("/parse", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(); // returns 400 if no file is uploaded
    }
    
    // make POST request to APILayer
    const response = await axios.post(
      "https://api.apilayer.com/resume_parser/upload",
      req.file.buffer, // APILayer only accepts raw file 
      {
        headers: {
          "apikey": apiKey,
          "Content-Type": "application/octet-stream",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error parsing resume:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});

app.use(express.static(path.join(__dirname, "dist"))); // for deployment to Render