import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },  
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {timestamps: true});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;