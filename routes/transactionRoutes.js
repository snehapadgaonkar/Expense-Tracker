const express = require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//Add transaction || POST Method
router.post('/add-transaction',addTransaction);

//Get transactions
router.post('/get-transactions', getAllTransaction);

module.exports = router;
