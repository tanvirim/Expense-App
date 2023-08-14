const express = require("express")
const {getAllTransaction,addTransaction ,editTransaction ,deleteTransaction} = require("../controllers/transactionController")


//router object
const router = express.Router()

//get transections
router.post('/get-transections',getAllTransaction )

//add transection
router.post('/add-transection',addTransaction )

//edit transection
router.put('/edit-transection',editTransaction )

//delete transection
router.delete('/delete-transection',deleteTransaction )


module.exports = router