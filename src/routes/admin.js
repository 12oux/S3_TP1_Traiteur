const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin', adminController.getAdmin);
router.post("/admin/ajouter", adminController.postAdmin);
router.get("/adminLogin", adminController.getLoginAdmin);
router.post("/adminLogin", adminController.postLoginAdmin);
// router.get("/confirm", adminController.getConfirmed);
router.post("/admin/confirm", adminController.postConfirmed);


module.exports = router;