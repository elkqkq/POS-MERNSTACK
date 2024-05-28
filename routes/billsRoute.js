const express = require('express')


const {addBillsController, getBillsController } = require ('../controllers/billsController');

const router = express.Router();

//routes


//Method-POST
router.post ('/add-bills',addBillsController);

//Method-GET
router.get ('/get-bills',getBillsController);



module.exports = router;