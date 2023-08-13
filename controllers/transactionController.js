const transactionModel = require("../models/transactionModel")
const moment = require("moment")

 const getAllTransaction = async(req,res)=> {
    try {
        const {frequency, selectedDate,type ,category } = req.body
        const transections = await transactionModel.find({
            ...(frequency!== "custom" ? 
            {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate()
                }
            }: 
            {
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1]
                }
                                                                                                                
            }),
            userId: req.body.userId,
            ...(type !== 'all' && {type}),
            ...(category !== "all" && {category})
            
        })
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