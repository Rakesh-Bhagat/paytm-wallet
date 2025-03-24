import express from "express";
import {authMidddleware}  from "../middleware.js";
import {Account}  from "../db.js";
import mongoose from "mongoose";

export const accountRouter = express.Router()

accountRouter.get("/balance", authMidddleware, async(req, res, next) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});


accountRouter.post("/transfer", authMidddleware, async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount , to } = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficeint balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }
    
    
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

    
})

