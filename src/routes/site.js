var express = require('express');
var router = express.Router();
var indexController = require('../controllers/site.js');

router.get("/", indexController.getHomepage);
router.get("/menu", indexController.getMenu);


module.exports = router;