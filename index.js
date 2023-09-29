const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { createCanvas } = require("canvas");
const sharp = require("sharp");
const Image = require("./Image");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
// Connection to Database
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
// Enable body parsing for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
async function createImageWithText(headlines) {
  // Create a canvas with a 2000x2000 resolution
  const canvasWidth = 2000;
  const canvasHeight = 2000;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Set the background color
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Set the text properties with a 70px font size
  ctx.font = "70px Arial";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";

  // Set a fixed line height and spacing
  const lineHeight = 100; // Fixed line height
  const spacing = 50; // Fixed spacing between headlines

  // Calculate the starting Y position
  let currentY = 500; // Adjust this value to control the vertical position of the first headline

  for (const headline of headlines) {
    // Break the headline into multiple lines if it exceeds 60 characters
    const lines = [];
    let currentLine = "";

    for (const word of headline.split(" ")) {
      if (currentLine.length + word.length + 1 <= 60) {
        if (currentLine !== "") {
          currentLine += " ";
        }
        currentLine += word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine !== "") {
      lines.push(currentLine);
    }

    // Draw each line of the headline
    for (const line of lines) {
      ctx.fillText(line, canvasWidth / 2, currentY);
      currentY += lineHeight; // Add the fixed line height
    }

    // Add a fixed spacing between headlines
    currentY += spacing; // Add the fixed spacing
  }
  const buffer = canvas.toBuffer("image/jpeg");
  const compressedImage = await sharp(buffer)
    .jpeg({ quality: 80 }) // Adjust the quality as needed (0-100)
    .toBuffer();
  try {
    // Create a new Image document and save it to MongoDB using async/await
    const newImage = new Image({
      data: compressedImage,
      contentType: "image/jpeg",
    });

    await newImage.save();
    console.log("Image saved to MongoDB");

    //res.status(200).send("Image saved to MongoDB and file system");
  } catch (err) {
    console.error("Error saving image:", err);
    //res.status(500).send("Error saving image");
  }
}

app.get("/", (req, res) => {
  const headlines = [
    "1. Breaking News: Scientists Discover New Planet",
    "2. Economic Growth Continues Despite Challenges",
    "3. Tech Giant Unveils Latest Innovation",
    "4. This is a very long headline that should wrap to the next line because it exceeds 60 characters.because it exceeds 60 characters.ine because it exceeds 60 characters.because it exceeds 60 characters",
  ];
  createImageWithText(headlines);
  console.log("Image Created Successfully");
});
