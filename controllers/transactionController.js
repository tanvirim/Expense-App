const transactionModel = require("../models/transactionModel")


 const getAllTransaction = async(req,res)=> {
    try {
        const transections = await transactionModel.find({})
        res.status(200).json(transections)
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
        
    }

}

const addTransaction = async (req,res)=> {

    try {
        const transection = new transactionModel(req.body)
        await transection.save()

        res.status(201).json({
            status: true ,
            message: "transection created successfully",

        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
        
    }

}

module.exports = { getAllTransaction,addTransaction}