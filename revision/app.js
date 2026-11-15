require("dotenv").config();
const express = require("express");
const app = express();
const bookRouter = require("./routes/bookRoutes");
const mongoose = require("mongoose");

// body parser
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/book_store";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// 10 requests per minute
const totalReqAllow = 10;
const timeWindow = 1000 * 60; // 1 minute in milliseconds
const reqTracker = {}; // reqTracker[ip] = { count, timeOfReq }

const limiter = function (req, res, next) {
  const currentTime = Date.now();
  const ipAdd = req.ip;

  if (!reqTracker[ipAdd]) {
    // First request from this IP
    reqTracker[ipAdd] = { count: 1, timeOfReq: currentTime };
    return next();
  }

  const elapsedTime = currentTime - reqTracker[ipAdd].timeOfReq;

  if (elapsedTime < timeWindow) {
    // Within the time window
    if (reqTracker[ipAdd].count < totalReqAllow) {
      reqTracker[ipAdd].count += 1;
      return next();
    } else {
      // Exceeded the request limit
      return res
        .status(429)
        .send("You have reached your request limit. Please try again later.");
    }
  } else {
    // Time window has passed; reset the counter
    reqTracker[ipAdd] = { count: 1, timeOfReq: currentTime };
    return next();
  }
};
app.use(limiter);

app.use("/book", bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
