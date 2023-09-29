const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const headlines = [
  "Breaking News: Scientists Discover New Planet",
  "Economic Growth Continues Despite Challenges",
  "Tech Giant Unveils Latest Innovation",
  "Local Community Comes Together for Charity Event",
  "Sports Team Wins Championship in Overtime Thriller",
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
ctx.font = "70px Arial"; // Updated font size to 70px
ctx.fillStyle = "#000000";
ctx.textAlign = "center";

// Calculate the total height of the headlines including gaps
const totalHeadlinesHeight = headlines.length * (70 + 50); // Assuming a line height of 70 and a gap of 20

// Calculate the starting Y position to center vertically
const startY = (canvasHeight - totalHeadlinesHeight) / 2;

// Iterate through the headlines and draw each one with a gap
for (let i = 0; i < headlines.length; i++) {
  const headline = headlines[i];

  // Calculate the Y position for this headline
  const textY = startY + i * (70 + 50); // Assuming a line height of 70 and a gap of 20

  // Draw the text on the canvas
  ctx.fillText(headline, canvasWidth / 2, textY);
}

// Save the canvas as an image
const outputImageFileName = "centered_and_gapped_headlines_70px2.png";
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
