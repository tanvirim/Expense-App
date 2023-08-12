const express = require("express")
const {getAllTransaction,addTransaction} = require("../controllers/transactionController")


//router object
const router = express.Router()

//routers
//POST || LOGIN

router.get('/get-transections',getAllTransaction )

//POST || REGISTER
router.post('/add-transection',addTransaction )


module.exports = router