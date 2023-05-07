const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.get(`/files/list`, controllers.listFiles);

router.get(`/files/data`, controllers.fileData);

module.exports = router;
