const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.isLoggedin = (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.access_token;
    if (!token) {
      return next(new AppError("User is not logged in.", 400));
    }
    // jwt.verify uses a callback to handle the verification result, so the await keyword is not needed.
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, payload) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (payload) {
        req.user = payload.user; // payload.user=> {id:userId};
      }
    });
    next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
