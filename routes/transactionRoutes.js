const express = require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//Add transaction || POST Method
router.post('/add-transaction',addTransaction);

//Get transactions
router.get('/get-transactions', getAllTransaction);

module.exports = router;
