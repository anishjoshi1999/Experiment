const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const { createImageWithText } = require("./Text_To_Image");

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
app.get("/", (req, res) => {
  const headlines = [
    "1. Breaking News: Scientists Discover New Planet",
    "2. Economic Growth Continues Despite Challenges",
    "3. Tech Giant Unveils Latest Innovation",
    "4. This is a very long headline that should wrap to the next line because it exceeds 60 characters.because it exceeds 60 characters.ine because it exceeds 60 characters.because it exceeds 60 characters",
  ];
  //createImageWithText(headlines);
});
