const express = require("express");
const router = express.Router();
const controllers = require("./controllers");


//Get list files
router.get(`/files/list`, controllers.listFiles);

//Get detail file.
router.get(`/files/data`, controllers.fileData);

module.exports = router;