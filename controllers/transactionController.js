const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, category } = req.body;
    const transections = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userId: req.body.userId,
      ...(type !== "all" && { type }),
      ...(category !== "all" && { category }),
    });
    res.status(200).json(transections);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const transection = new transactionModel(req.body);
    await transection.save();

    res.status(201).json({
      status: true,
      message: "transection created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findByIdAndUpdate(
      { _id: req.body.transectionId },
      req.body.payload
    );

    res.status(201).json({
      status: true,
      message: "transection Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transectionId } = req.body; // Make sure you're receiving the transectionId correctly from the frontend

    await transactionModel.findOneAndDelete({ _id: transectionId });

    res.status(200).json({
      status: true,
      message: "Transaction Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
