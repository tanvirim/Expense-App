const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {

    //userId will be provided from localstorage
    userId: {
      type: String,
      required: [true, 'userId is required'],

    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    type: {
      type:String,
      required: [true, 'Type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    reference: {
      type: String,
      required: [true, 'Reference is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;
