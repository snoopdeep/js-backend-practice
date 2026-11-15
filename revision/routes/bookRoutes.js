const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/", bookController.createABook);
router.post('/createMany',bookController.createManyBook);
router.get('/',bookController.getBook);

module.exports=router;