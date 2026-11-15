const Book = require("../models/bookModel");

exports.createABook = async (req, res, next) => {
  try {
    const bookData = req.body;
    console.log(req.body);
    const result = await Book.create(bookData);
    if (result) res.status(202).json({ result });
  } catch (err) {
    res.send(err);
  }
};

exports.createManyBook = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await Book.insertMany(req.body);
    if (result) res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const {
      title,
      genre,
      sortBy = "title",
      order = "asc",
      page = 1,
      pageSize = 2,
    } = req.query;
    console.log(req.query);
    console.log(order);
    const filterObject = {};
    if (title) filterObject.title = title;
    if (genre) filterObject.genre = genre;

    const sortOrder = order === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };
    const limit = parseInt(pageSize, 10);
    const skip = (parseInt(page, 10) - 1) * limit;
    const data = await Book.find(filterObject)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.send(data);  
  } catch (err) {
    console.log(data);
  }
};
