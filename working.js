const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const headlines = [
  "1. Breaking News: Scientists Discover New Planet",
  "2. Economic Growth Continues Despite Challenges",
  "3. Tech Giant Unveils Latest Innovation",
  "4. This is a very long headline that should wrap to the next line because it exceeds 60 characters.because it exceeds 60 characters.ine because it exceeds 60 characters.because it exceeds 60 characters",
];

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

// Save the canvas as an image
const outputImageFileName = "consistent_line_height_headlines111.png";
const outputStream = fs.createWriteStream(outputImageFileName);
const stream = canvas.createPNGStream();

stream.pipe(outputStream);
outputStream.on("finish", () => {
  console.log(`Image saved as ${outputImageFileName}`);

  // Load the image for further use (optional)
  loadImage(outputImageFileName)
    .then((image) => {
      // You can use 'image' here for further processing if needed
      console.log("Image loaded:", image);
    })
    .catch((err) => {
      console.error("Error loading image:", err);
    });
});
