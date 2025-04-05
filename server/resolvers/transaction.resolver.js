import { users } from "../dummyData/data.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Query: {
    transactions: async (__, _, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser()._id;
        console.log("Fetching transactions for userId:", userId);
        const transactions = await Transaction.find({ userId: userId });
        console.log("Found transactions:", transactions);
        return transactions;
      } catch (err) {
        console.error("Error getting transactions: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.error("Error getting transaction: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    categoryStatistics: async (_, input, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");
      const userId = context.getUser()._id;
      const transactions = await Transaction.find({userId});
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
    });
    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
    }));
  }
  },
  Mutation: {
    createTransaction: async (_, {input}, context) => {
        try {
            const newTransaction = new Transaction({
                ...input,
                userId: context.getUser()._id,
            })
            await newTransaction.save();
            return newTransaction;
        } catch (err) {
            console.error("Error creating transaction: ", err);
            throw new Error(err.message || "Internal server error");
        }
    },
    updateTransaction: async (_, {input}, context) => {
        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
            return updatedTransaction;
        } catch (err) {
            console.error("Error updating transaction: ", err);
            throw new Error(err.message || "Internal server error");
        }
    },
    deleteTransaction: async (_, {transactionId}, context) => {
        try {
            const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
            return deletedTransaction;
        } catch (err) {
            console.error("Error deleting transaction: ", err);
            throw new Error(err.message || "Internal server error");
        }
    }
  },
  Transaction: {
    user: async(parent) => {
      try {
        const user = await User.findById(parent.userId);
        return user;
      } catch (err) {
        console.error("Error fetching user: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default transactionResolver;
