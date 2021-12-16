const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin', adminController.getAdmin);
router.post("/admin/ajouter", adminController.postAdmin);
router.get("/adminLogin", adminController.getLoginAdmin);
router.post("/adminLogin", adminController.postLoginAdmin);
router.get("/confirmed", adminController.getConfirmed);
router.get("/confirmed/:cartId", adminController.getCartDetails);
router.post("/admin/confirmed", adminController.postConfirmed);


module.exports = router;